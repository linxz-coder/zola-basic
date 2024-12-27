+++
title = "小程序的路由与通信"
date = 2024-12-27
+++

页面跳转有两种方式：

1. 声明式导航：navigator 组件

2. 编程式导航：使用小程序提供的API

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202412271709217.png)

注意：除switchTab外，都可以通过url传参，在目标页面里面通过生命周期onLoad(options)里的options属性接收参数。

页面参数可以通过右下角按钮查看。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202412271724631.png)

# 所有跳转API示例

```js
Page({


  navigateTo() {

    // 保留当前页面，跳转到应用中其他页面，不能跳转到 tabBar 页面
    wx.navigateTo({
      url: '/pages/list/list?id=1&name=tom'
      // url: '/pages/cate/cate'
    })

  },

  redirectTo() {

    // 关闭(销毁)当前页面，跳转到应用中其他页面，不能跳转到 tabBar 页面
    wx.redirectTo({
      url: '/pages/list/list?id=1&name=tom'
      // url: '/pages/cate/cate'
    })

  },

  switchTab() {

    // 跳转到 tabBar 页面，不能跳转到 非 tabBar 页面，路径后面不能传递参数
    wx.switchTab({
      // url: '/pages/list/list'
      url: '/pages/cate/cate'
    })

  },

  reLaunch() {

    // 关闭所有的页面，然后跳转到应用中某一个页面
    wx.reLaunch({
      url: '/pages/list/list?id=1&name=tom'
      // url: '/pages/cate/cate?id=1&name=tom'
    })

  },

  navigateBack() {

    // 关闭当前页面，返回上一页或者返回多级页面
    // 默认返回上一页
    wx.navigateBack({
      delta: 1
    })

  },


})

```
