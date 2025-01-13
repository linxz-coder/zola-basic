+++
title = "如何新建Android的Activity？"
date = 2025-01-13
authors = ["小中"]
[taxonomies]
tags = ["安卓"]

+++

右键-新建-Activity-Empty Activity View

# 新建一个Layout view

```xml
<androidx.appcompat.widget.LinearLayoutCompat>
```

# 新建一个文本

```xml
<TextView
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:text="你好呀，凡学子" />
```

# 如何运行自定义Activity？

运行时指定Activity

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202501131447057.png)

需要修改res文件夹下的`AndroidManifest.xml`文件。

将exported设置为true

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202501131448820.png)

