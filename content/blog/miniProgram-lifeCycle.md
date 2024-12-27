+++
title = "小程序的生命周期"
date = 2024-12-27
+++

# 生命周期图

## 冷启动和热启动

冷启动： 刚打开

热启动： 之前打开过

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202412261626702.png)

## 前台和后台

进入后台的方式： 关闭小程序、home键、锁屏

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202412261627888.png)

## 挂起

后台5秒后会挂起，停止线程。但如何播放音乐、后台使用地理位置，可以在后台继续运行，不会挂起。

## 销毁

后台30分钟后销毁，或者占用系统资源过多，也会被销毁。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202412261631955.png)

# 生命周期概念

分为`应用生命周期`, `页面生命周期`，`组件生命周期`。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202412261805960.png)

# 应用生命周期

启动 -> 运行 -> 销毁 的过程。

## 应用生命周期函数

在app.js的App()方法定义。

App()方法必须在app.js内调用，用来注册小程序。

`onLaunch`, `onShow`, `onHide`三个函数组成。

注意：onLaunch只会在开始时启动，只启动一次，即冷启动触发。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202412261811349.png)

# 页面生命周期

页面加载 -> 运行 -> 销毁 的过程。

## 页面生命周期函数

在Page()方法定义。

页面跳转时，即使用navigator标签，open-type属性为navigate方法会去onHide，保留页面； redirect方法会去onUnload，删除页面。

onLoad和onReady，每个页面只会出现一次。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202412261821565.png)

# 生命周期两个细节

1. tabBar 页面之间相互切换，页面不会被销毁

2. 点击左上角，返回上一个页面，会销毁当前页面
