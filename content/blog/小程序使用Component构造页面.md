+++
title = "小程序使用Component构造页面"
date = 2025-01-03
authors = ["小中"]
[taxonomies]
tags = ["小程序"]

+++

小程序页面也可以视为自定义组件，因此，可以用Component方法进行创建，以实现复杂逻辑的开发。

# 为什么要用Component？

因为功能更多，比如数据监听`Observers`，或者通过插件的方式让Component拥有计算属性。

# 怎么使用？

将页面.js文件的Page({})，改成Component({})即可。



# 注意事项：

1. 要求.json 文件中必须包含 usingComponents 字段

2. 里面的配置项需要和 Component 中的配置项保持一致

3. 页面中 Page 方法有一些钩子函数、事件监听方法，这些钩子函数、事件监听方法必须放在 methods 对象中 

4. 组件的属性 properties 也可以接受页面的参数，在 onLoad 钩子函数中可以通过 this.data 进行获取。

[视频教程](https://www.bilibili.com/video/BV1LF4m1E7kB?t=739.1&p=72)

