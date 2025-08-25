+++
title = "云主机linux系统常见操作"
date = 2025-08-25
authors = ["小中"]
[taxonomies]
tags = ["linux", "云主机"]

+++

# 了解系统发行版

```bash
hostnamectl
```

或者

```bash
cat /etc/os-release
```

# 列出所有文件（包含隐藏文件）

列出主目录~的所有文件

```
ls -al ~
```

# 显示现在的日期

```
date
```

# 显示日历

```
cal
```

## 显示2024年日历

```
cal 2024
```

# 计算器

```
bc
```

`quit`离开计算器。

# 显示支持的语言

```
locale
```

## 修改语系为英文

```
export LC_ALL=en_US.UTF-8
```

可以把当前会话的语言改成英文，下次开机会恢复中文。
可以输入date，看看是否改成英文

修改为中文：

```
export LANG=zh_CN.UTF-8
export LC_ALL=zh_CN.UTF-8
```

# 翻页

```
shift+ page up/down
```
