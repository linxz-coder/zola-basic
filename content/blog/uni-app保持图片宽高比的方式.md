+++
title = "uni-app保持图片宽高比的方式"
date = 2025-01-07
authors = ["小中"]
[taxonomies]
tags = ["uni-app"]

+++

主要是`mode`属性控制，可查看[官方文档](https://zh.uniapp.dcloud.io/component/image.html)

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202501071146245.png)

一般用`aspectFit`（会留白）和`aspectFill`（常用，不留白）


```vue
<image mode="aspectFill" />
```
