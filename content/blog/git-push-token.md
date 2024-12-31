+++
title = "因为错误提交token导致不能git push"
date = 2024-12-31
+++

# 将文件从历史提交中删除

查看config.js是否在历史提交中存在

```bash
git log --all --full-history -- config.js
```

将文件从历史提交中删除

```bash
git filter-branch --force --index-filter "git rm --cached --ignore-unmatch config.js" --prune-empty --tag-name-filter cat -- --all
```

如果有必要，重新验证一下：

```bash
git add .
git status
```

看看文件是否存在。不存在，直接push就好了。


# rebase介绍

`rebase`即变基，可以重新修改当次commit。

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


完成commit。如果之前没有commit历史，直接跳到这一步即可。

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

# github 紧急恢复

如果rebase操作一通，有可能会失去一些文件。

最好方法是提前保存，如果忘记，试试以下恢复的办法：

```bash
git fsck --lost-found
```
