+++
title = "如何用git pull命令？"
date = 2024-10-02
+++

git pull命令用于从远程仓库拉取最新的代码到本地仓库。使用方法如下：

```bash
# 拉取远程仓库的最新代码
git pull
```

# 如果本地和远端都有更新，用stash（暂存）
```bash
# 暂存本地修改
git pull --autostash
```

然后，在直接`git push`提交就可以将本地修改推送到远程仓库。
