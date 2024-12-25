+++
title = "小程序常用的组件"
date = 2024-12-25
+++

# view 组件

相当于div使用

# swiper 和 swiper-item 组件

swiper：滑块视图容器，其中只能放置 swiper-item 组件

swiper-item：只可放置在swiper 组件中，宽高自动设置为100%，代表 swiper 中的每一项

## 自动播放

```wxml
<swiper autoplay> //autoplay="true"也可以
```

规定播放时长-2秒 interval

```wxml
<swiper autoplay interval="2000">
```

底下小圆点 indicator-dots

```wxml
<swiper autoplay interval="2000" indicator-dots>

```


# image 组件

## image组件属性

src属性：图片资源

mode属性： 图片裁剪、缩放

> 缩放：aspectFit（完整展示图片，可能留白）, aspectFill（裁剪长边，不留白）

> 裁剪: top left, top...


show-menu-by-longpress: 长按图片显示菜单

> 长按菜单：转发、收藏、保存等功能


lazy-load: 图片懒加载


## 使用要点

默认宽度320px，高度240px

就算不设置src属性，也是占据宽和高


# text 组件

text组件只能嵌套text组件。

功能：

1. user-select：文本是否可选，用于长按选择文本。

2. space：显示连续空格

# navigator 组件

## 属性

1. url：当前小程序内的跳转链接

2. open-type：跳转方式

- navigate：保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面 
- redirect： 关闭当前页面，跳转到应用内的某个页面。但不能跳转到 tabbar 页面 
- switchTab：跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
- relaunch：关闭所有页面，打开到应用内的某个页面
-  navigateBack：关闭当前页面，返回上一页面或多级页面

## 注意事项：

1. 路径后可以带参数。参数与路径之间使用？分隔，参数键与参数值用=相连，不同参数用&分隔例如：list？id=10&name=hua，在 `onLoad（options）生命周期函数`中获取传递的参数

2. open-type=“switchTab”时不支持传参

# scroll-view 组件

scroll-x 允许横向滚动

scroll-y 允许纵向滚动

# 字体图标

素材地址：[阿里巴巴矢量图标库](https://www.iconfont.cn/)



