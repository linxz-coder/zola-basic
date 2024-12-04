+++
title = "git知识"
date = 2024-12-03
+++

# 流程实例

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202412031744824.png)


# .git哪里去了

查看隐藏文件夹

```bash
ls -a
``` 

# 术语

staging area 暂存区

# 知道还没跟踪的内容

```bash
git status
```

# 追踪每次commit

```bash
git log
```

结果示例：

```bash
commit 74f0838dc51567bbc9ac125440ef94ea0cc69faf (HEAD -> main)
Author: linxz-coder <234692261@qq.com>
Date:   Tue Dec 3 17:38:05 2024 +0800

    test

commit 9794ef9593fde4415e980aac1f08c1cbd853006c (origin/main)
Author: linxz-coder <234692261@qq.com>
Date:   Tue Dec 3 17:25:29 2024 +0800

    mac

commit 7afaf22f676785789a259b7aaa69c839bb3b932b
Author: linxz-coder <234692261@qq.com>
Date:   Tue Dec 3 14:02:50 2024 +0800

    first commit
```

注意：commit后面是一段hash，是一个唯一标识码。


# 查看没提交前的改变

```bash
git diff <文件路径>
```

# 回滚版本

```bash
git checkout <文件路径>
```

# 连接远端仓库

```bash
git remote add origin <仓库地址>
```

# 将push的动作连接到远端仓库

```bash
git push -u origin main
```

注意，origin就是远端仓库的别名，你也可以叫其他名字，但是传统上就是origin

# 在gihub上查看提交的commits

Insights-Network

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202412040947844.png)

# git push在干什么？

建立本地仓库和远端仓库的联系

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202412040951350.png)

# .gitignore需要的设置

将暂存区的所有文件删除

```bash
git rm --cached -r .

git add .

git status 
```

查看暂存区文件，确认没有不想上传的文件才执行commit操作。

## .gitignore语法

```
.DS_Store
secrets.txt

# 使用井号注释

# 可以使用通配符
*.txt

```

## 快速添加.gitignore

```bash
touch .gitignore
open .gitignore
```

## .gitignore模版

[github-gitignore仓库](https://github.com/github/gitignore)


# 分支branch的概念

当你想要添加新功能，但不想影响现有的软件，可以先放入branch，等测试妥当后，直接merge就可以。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202412041012005.png)

# git branch命令

```bash
git branch <分支名称>
```

查看branch 

```bash
git branch
```

转移到branch上

```bash
git checkout branchName
```

# merge分支

先回到main分支

```bash
git checkout main
```

merge命令

```bash
git merge branchName
```

打开merge信息窗口，可以写入一些信息。:wq

或者不写任何信息，直接:q!退出。

如果在网页端，merge需要使用`pull request`命令。

[网页端merge教程](https://www.bilibili.com/video/BV12F4113794?spm_id_from=333.788.player.switch&vd_source=52e547e5d9000389c9906e8cf67193c7&p=154)

# Fork 分支

作用：如果你想要更改原项目的代码，用Fork

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202412041046705.png)

clone到本地，本地修改后可以提交pull request

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202412041047059.png)

要pull request，需要登录github界面，点击pull request。

[pull request教程](https://www.bilibili.com/video/BV12F4113794?spm_id_from=333.788.videopod.episodes&vd_source=52e547e5d9000389c9906e8cf67193c7&p=156)
