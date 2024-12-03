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
