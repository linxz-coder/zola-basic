+++
title = "Android的布局"
date = 2025-01-13
authors = ["小中"]
[taxonomies]
tags = ["安卓"]

+++

一般在`src`-`res`文件夹下的`activity_main.xml`

只有View和ViewGroup两种。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202501131415638.png)

# 线性布局 LinearLayout

layout_weight是权重，初始值是1，设置越大权重越大，占的面积就会越大。

gravity：重心排列方式。center为居中排列，可以设置`top|right`等属性

orientation：布局方向。有`horizontal`和`vertical`两种。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202501131425111.png)


```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/main"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    android:orientation="horizontal"
    tools:context=".MainActivity">

    <ImageView
        android:layout_width="100dp"
        android:layout_height="100dp"
        android:background="#F00" />

    <ImageView
        android:layout_width="100dp"
        android:layout_height="100dp"
        android:background="#0F0" />

    <ImageView
        android:layout_width="100dp"
        android:layout_height="100dp"
        android:background="#00F" />

</LinearLayout>
```
