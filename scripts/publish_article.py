#!/usr/bin/env python3
"""Turn a plain-text article into a tagged Zola post and optionally publish it."""

from __future__ import annotations

import argparse
import datetime as dt
import html
import json
import re
import shlex
import subprocess
import sys
import tempfile
import time
import urllib.parse
from pathlib import Path


TAG_RULES = (
    ("游戏", ("游戏", "玩家", "RPG", "Boss", "刺客信条", "黑魂", "血源", "艾尔登法环", "刷怪")),
    ("成长", ("成长", "进化", "变强", "修正", "升级", "练习")),
    ("工作", ("工作", "职场", "任务", "交付", "项目")),
    ("认知", ("认知", "思维", "判断", "理解", "策略", "模型")),
    ("学习", ("学习", "知识", "记忆", "教育", "读书")),
    ("人工智能", ("人工智能", "AI", "大模型", "ChatGPT", "智能体", "agent")),
    ("编程", ("编程", "代码", "开发", "程序", "软件")),
    ("商业", ("商业", "公司", "企业", "市场", "消费")),
    ("投资", ("投资", "融资", "资本", "股票", "基金")),
    ("生活", ("生活", "日常", "家庭", "健康", "旅行")),
)


class PublishError(RuntimeError):
    """A user-actionable publishing failure."""


def run(
    command: list[str],
    *,
    cwd: Path,
    check: bool = True,
    show: bool = True,
) -> subprocess.CompletedProcess[str]:
    if show:
        print(f"$ {shlex.join(command)}")
    result = subprocess.run(
        command,
        cwd=cwd,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
    )
    if result.stdout and (show or result.returncode != 0):
        print(result.stdout.rstrip())
    if check and result.returncode != 0:
        raise PublishError(
            f"Command failed with exit code {result.returncode}: {shlex.join(command)}"
        )
    return result


def git(command: list[str], *, cwd: Path, check: bool = True, show: bool = True):
    return run(
        ["git", "-c", "http.proxy=", "-c", "https.proxy=", *command],
        cwd=cwd,
        check=check,
        show=show,
    )


def read_source(source: str) -> str:
    if source == "-":
        body = sys.stdin.read()
    else:
        source_path = Path(source).expanduser().resolve()
        if not source_path.is_file():
            raise PublishError(f"Article source does not exist: {source_path}")
        body = source_path.read_text(encoding="utf-8")

    body = body.replace("\r\n", "\n").replace("\r", "\n").strip()
    if not body:
        raise PublishError("Article body is empty.")
    if body.startswith("+++"):
        raise PublishError("Pass plain article text, not an article that already has Zola front matter.")
    return body


def clean_heading(body: str) -> tuple[str | None, str]:
    lines = body.splitlines()
    if lines and re.match(r"^#\s+\S", lines[0]):
        return lines[0][2:].strip(), "\n".join(lines[1:]).strip()
    return None, body


def infer_title(body: str) -> str:
    heading, _ = clean_heading(body)
    if heading:
        return heading

    candidates = [
        value.strip(" \t\n“”\"'「」『』")
        for value in re.split(r"(?<=[。！？!?])\s*|\n+", body)
        if value.strip()
    ]
    scored: list[tuple[float, str]] = []
    total = max(len(candidates), 1)

    for index, candidate in enumerate(candidates):
        candidate = candidate.rstrip("。！？!?")
        length = len(candidate)
        if length < 6 or length > 48:
            continue

        score = index / total * 3
        if 10 <= length <= 30:
            score += 4
        if candidate.startswith("真正"):
            score += 8
        if "不是" in candidate and "而是" in candidate:
            score += 10
        if "问题" in candidate and ("在于" in candidate or "不在" in candidate):
            score += 3
        if candidate.startswith(("最近", "今天", "比如", "当然")):
            score -= 3
        scored.append((score, candidate))

    if not scored:
        first_line = next(line.strip() for line in body.splitlines() if line.strip())
        return first_line[:36].rstrip("，。！？；： ")

    title = max(scored, key=lambda item: item[0])[1]
    if title.startswith("真正") and "应该不是" in title and "而是" in title:
        title = title.replace("应该不是", "不是", 1)
    return title


def infer_tags(body: str, limit: int = 4) -> list[str]:
    lower_body = body.lower()
    selected: list[str] = []
    for tag, keywords in TAG_RULES:
        if any(keyword.lower() in lower_body for keyword in keywords):
            selected.append(tag)
        if len(selected) == limit:
            break
    return selected or ["随笔"]


def parse_tags(raw_tags: str | None, body: str) -> list[str]:
    if not raw_tags:
        return infer_tags(body)
    tags = [tag.strip() for tag in re.split(r"[,，]", raw_tags) if tag.strip()]
    if not tags:
        raise PublishError("--tags was provided but no non-empty tag was found.")
    return list(dict.fromkeys(tags))


def parse_date(raw_date: str) -> str:
    try:
        return dt.date.fromisoformat(raw_date).isoformat()
    except ValueError as exc:
        raise PublishError(f"Date must use YYYY-MM-DD: {raw_date}") from exc


def toml_string(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def description_from(body: str) -> str:
    paragraph = next(
        (part.strip() for part in re.split(r"\n\s*\n", body) if part.strip()),
        body.strip(),
    )
    paragraph = re.sub(r"[#*_`>\[\]]", "", paragraph)
    return paragraph[:120].rstrip("，。；： ") + ("…" if len(paragraph) > 120 else "")


def safe_filename(value: str) -> str:
    value = re.sub(r"[\x00-\x1f/\\:]", "-", value)
    value = re.sub(r"\s+", " ", value).strip(" .")
    if not value:
        raise PublishError("The inferred filename is empty; provide --slug.")
    return value[:100].rstrip()


def render_article(
    *,
    title: str,
    date: str,
    author: str,
    tags: list[str],
    description: str,
    body: str,
) -> str:
    tag_list = ", ".join(toml_string(tag) for tag in tags)
    return (
        "+++\n"
        f"title = {toml_string(title)}\n"
        f"date = {date}\n"
        f"authors = [{toml_string(author)}]\n"
        f"description = {toml_string(description)}\n"
        "[taxonomies]\n"
        f"tags = [{tag_list}]\n"
        "+++\n\n"
        f"{body.strip()}\n"
    )


def find_repo(explicit_repo: str | None) -> Path:
    candidates = []
    if explicit_repo:
        candidates.append(Path(explicit_repo).expanduser().resolve())
    candidates.extend((Path.cwd().resolve(), Path(__file__).resolve().parents[1]))
    for candidate in candidates:
        if (candidate / "config.toml").is_file() and (candidate / ".git").is_dir():
            return candidate
    raise PublishError("Could not find a Zola Git repository. Pass it with --repo.")


def ensure_remote_is_current(repo: Path) -> str:
    branch = git(["branch", "--show-current"], cwd=repo, show=False).stdout.strip()
    if not branch:
        raise PublishError("Publishing from a detached Git HEAD is not supported.")

    git(["fetch", "origin", branch], cwd=repo)
    remote_ref = f"origin/{branch}"
    counts = git(
        ["rev-list", "--left-right", "--count", f"HEAD...{remote_ref}"],
        cwd=repo,
        show=False,
    ).stdout.split()
    ahead, behind = (int(value) for value in counts)

    if ahead and behind:
        raise PublishError(
            f"Local {branch} and {remote_ref} have diverged. Reconcile them before publishing."
        )
    if ahead:
        raise PublishError(
            f"Local {branch} already has {ahead} unpushed commit(s). Push or review them first."
        )
    if behind:
        git(["pull", "--ff-only", "origin", branch], cwd=repo)
    return branch


def build_site(repo: Path, title: str) -> tuple[str, str]:
    config = (repo / "config.toml").read_text(encoding="utf-8")
    base_match = re.search(r'(?m)^\s*base_url\s*=\s*"([^"]+)"', config)
    if not base_match:
        raise PublishError("config.toml does not declare base_url.")
    base_url = base_match.group(1).rstrip("/")

    with tempfile.TemporaryDirectory(prefix="zola-blog-build-") as output_dir:
        output = Path(output_dir) / "site"
        run(["zola", "build", "--output-dir", str(output)], cwd=repo)

        escaped_title = html.escape(title, quote=False)
        title_pattern = re.compile(
            rf'<h1 class="title">\s*{re.escape(escaped_title)}\s*</h1>'
        )
        matches = []
        blog_dir = output / "blog"
        if blog_dir.is_dir():
            for page in blog_dir.rglob("index.html"):
                if title_pattern.search(page.read_text(encoding="utf-8", errors="replace")):
                    matches.append(page)
        if len(matches) != 1:
            raise PublishError(
                f"Expected exactly one built page for {title!r}, found {len(matches)}."
            )
        relative_dir = matches[0].parent.relative_to(output).as_posix()
        return base_url, f"{base_url}/{relative_dir}/"


def parse_github_remote(repo: Path) -> tuple[str, str]:
    remote = git(["remote", "get-url", "origin"], cwd=repo, show=False).stdout.strip()
    match = re.match(
        r"(?:https://github\.com/|git@github\.com:)([^/]+)/([^/]+?)(?:\.git)?$",
        remote,
    )
    if not match:
        raise PublishError(f"Unsupported GitHub origin URL: {remote}")
    return match.group(1), match.group(2)


def fetch_url(url: str) -> tuple[bool, str]:
    result = run(
        [
            "curl",
            "--fail",
            "--silent",
            "--show-error",
            "--location",
            "--connect-timeout",
            "15",
            "--max-time",
            "30",
            url,
        ],
        cwd=Path.cwd(),
        check=False,
        show=False,
    )
    return result.returncode == 0, result.stdout


def wait_for_content(url: str, marker: str, timeout: int, label: str) -> None:
    deadline = time.monotonic() + timeout
    last_status = "not requested"
    while True:
        ok, response = fetch_url(url)
        if ok and marker in response:
            print(f"[OK] {label}: {url}")
            return
        last_status = "HTTP error" if not ok else "content marker missing"
        if time.monotonic() >= deadline:
            raise PublishError(f"{label} verification timed out ({last_status}): {url}")
        remaining = int(deadline - time.monotonic())
        print(f"[WAIT] {label} not ready; retrying ({remaining}s remaining)")
        time.sleep(min(10, max(remaining, 1)))


def publish(
    *,
    repo: Path,
    target: Path,
    title: str,
    live_url: str,
    branch: str,
    verify_timeout: int,
) -> tuple[str, str]:
    relative_target = target.relative_to(repo).as_posix()

    git(["add", "--", relative_target], cwd=repo)
    staged = git(
        ["diff", "--cached", "--quiet", "--", relative_target],
        cwd=repo,
        check=False,
        show=False,
    )
    if staged.returncode == 0:
        print("[INFO] Article is unchanged; skipping commit and push.")
    else:
        git(
            ["commit", "--only", "-m", f"Publish article: {title}", "--", relative_target],
            cwd=repo,
        )
        git(["push", "origin", branch], cwd=repo)

    local_head = git(["rev-parse", "HEAD"], cwd=repo, show=False).stdout.strip()
    remote_head = git(
        ["ls-remote", "origin", f"refs/heads/{branch}"],
        cwd=repo,
        show=False,
    ).stdout.split()[0]
    if local_head != remote_head:
        raise PublishError(
            f"Remote branch verification failed: local={local_head}, remote={remote_head}"
        )
    print(f"[OK] Remote commit: {remote_head}")

    owner, repository = parse_github_remote(repo)
    quoted_path = urllib.parse.quote(relative_target, safe="/")
    raw_url = (
        f"https://raw.githubusercontent.com/{owner}/{repository}/"
        f"{urllib.parse.quote(branch, safe='')}/{quoted_path}"
    )
    wait_for_content(raw_url, title, min(verify_timeout, 120), "GitHub raw")
    wait_for_content(live_url, title, verify_timeout, "Live site")
    return remote_head, raw_url


def make_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description=(
            "Create a tagged Zola article from plain text. The default is a safe preview; "
            "use --write for local creation or --publish for the full GitHub/live workflow."
        )
    )
    parser.add_argument("source", help="Plain-text/Markdown file, or - to read stdin")
    parser.add_argument("--repo", help="Zola repository root (auto-detected by default)")
    parser.add_argument("--title", help="Override the automatically inferred title")
    parser.add_argument("--tags", help="Comma-separated tags; inferred when omitted")
    parser.add_argument("--date", default=dt.date.today().isoformat(), help="YYYY-MM-DD")
    parser.add_argument("--author", default="小中")
    parser.add_argument("--slug", help="Filename/slug override without .md")
    parser.add_argument("--write", action="store_true", help="Write and build locally")
    parser.add_argument(
        "--publish",
        action="store_true",
        help="Write, build, commit only the article, push, and verify GitHub/live content",
    )
    parser.add_argument(
        "--overwrite",
        action="store_true",
        help="Allow replacing an existing article file",
    )
    parser.add_argument(
        "--verify-timeout",
        type=int,
        default=300,
        help="Seconds to wait for Cloudflare Pages (default: 300)",
    )
    return parser


def main() -> int:
    args = make_parser().parse_args()
    try:
        repo = find_repo(args.repo)
        body = read_source(args.source)
        heading, body_without_heading = clean_heading(body)
        title = (args.title or heading or infer_title(body)).strip()
        date = parse_date(args.date)
        tags = parse_tags(args.tags, body_without_heading)
        description = description_from(body_without_heading)
        filename = safe_filename(args.slug or title) + ".md"
        target = repo / "content" / "blog" / filename
        rendered = render_article(
            title=title,
            date=date,
            author=args.author,
            tags=tags,
            description=description,
            body=body_without_heading,
        )

        print("[PREVIEW]")
        print(f"Repository: {repo}")
        print(f"Target:     {target.relative_to(repo)}")
        print(f"Title:      {title}")
        print(f"Date:       {date}")
        print(f"Author:     {args.author}")
        print(f"Tags:       {', '.join(tags)}")
        print(f"Description: {description}")

        if not (args.write or args.publish):
            print("[INFO] Preview only. Add --write or --publish to continue.")
            return 0

        branch = ensure_remote_is_current(repo) if args.publish else None

        if target.exists() and not args.overwrite:
            existing = target.read_text(encoding="utf-8")
            if existing != rendered:
                raise PublishError(
                    f"Target already exists: {target}. Use --overwrite only after reviewing it."
                )
        else:
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_text(rendered, encoding="utf-8")
            print(f"[OK] Wrote {target}")

        _, live_url = build_site(repo, title)
        print(f"[OK] Zola page: {live_url}")

        if not args.publish:
            print("[INFO] Local write/build complete; nothing was committed or pushed.")
            return 0

        commit, raw_url = publish(
            repo=repo,
            target=target,
            title=title,
            live_url=live_url,
            branch=branch,
            verify_timeout=max(args.verify_timeout, 1),
        )
        print("[DONE]")
        print(f"Commit: {commit}")
        print(f"Raw:    {raw_url}")
        print(f"Live:   {live_url}")
        return 0
    except PublishError as exc:
        print(f"[ERROR] {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
