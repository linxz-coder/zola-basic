+++
title = "苹果电脑Mac无法识别移动硬盘（磁盘）怎么办？"
date = 2025-04-18
authors = ["小中"]
[taxonomies]
tags = ["mac", "磁盘", "硬盘"]

+++

# 方法1：搜索“磁盘工具”，进行装载/挂载
![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202504180939777.png)

# 方法2：使用命令行
参考[文章](https://zhuanlan.zhihu.com/p/346106923)

1. 查看电脑是否能识别

```bash
diskutil list
```

如果无法识别，直接进行下一步。

2. 查看所有磁盘检查进程

```bash
ps aux | grep fsck
```

3. 强制杀掉所有磁盘检查进程

```bash
sudo pkill -f fsck
```

接着搜索`磁盘工具`，点击`急救`即可。


# 其他方法

```bash
sudo diskutil mount /dev/disk2s2
```

注意/dev/disk2s2对应的是diskutil list的结果。参考[文章](https://blog.csdn.net/WinstonLau/article/details/86250047)
