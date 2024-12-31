+++
title = "因为错误提交token导致不能git push"
date = 2024-12-31
+++

解决方案是`rebase`，重新修改当次commit。

[参考链接](https://docs.github.com/en/code-security/secret-scanning/working-with-secret-scanning-and-push-protection/working-with-push-protection-from-the-command-line#removing-a-secret-introduced-by-an-earlier-commit-on-your-branch)

查看是哪个commit出问题

```bash
git log
```

复制id,比如03d69e5d3


rebase变基：改变这次commit

```bash
git rebase -i <COMMIT-ID>~1
```

注意，加上~1

将第一个pick改成edit

```bash
edit 8728dbe67 my second commit message
pick 03d69e5d3 my third commit message
pick 8053f7b27 my fourth commit message
```

:wq保存。

删除你的token文件，或者加上.gitignore

重新保存

```bash
git add .
```

查看status

```bash
git status
```

看看是否有红字部分，即conflict的部分。

删除所有conflict的文件

```bash
git rm $(git ls-files -u | cut -f2 | sort -u)
```

完成commit

```bash
git commit --amend
```

结束变基

```bash
git rebase --continue
```

push代码

```bash
git push
```

