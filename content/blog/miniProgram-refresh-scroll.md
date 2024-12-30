+++
title = "小程序API-页面处理函数"
date = 2024-12-30
+++

上拉加载和下拉刷新。

# 上拉加载（加载更多）

上拉加载是小程序中常见的一种加载方式，当用户滑动页面到底部时，会自动加载更多的内容，以便用户继续浏览

## 实现

1. 在app.json 或者 page.json 中配置距离页面底部距离：onReachBottomDistance；默认 50px

2. 在页面js 中定义 onReachBottom 事件监听用户上拉加载 

`onReachBottomDistance` 是指页面滚动到底部时的触发距离。


# 下拉刷新

下拉页面时，页面自动刷新。

## 实现：

1. 在 app.json 或者 page.json 中开启允许下拉，同时可以配置窗口、loading 样式等

2. 在页面.js 中定义 onPullDownRefresh 事件监听用户下拉刷新

## 设置下拉后弹回去

```js
    // 在下拉刷新以后，loading 效果有可能不会回弹回去
    if (this.data.numList.length === 3) {
      wx.stopPullDownRefresh()
    }
```

# 使用scroll-view实现`上拉加载`和`下拉刷新`

上拉通过`scroll-y`属性实现，下拉通过`refresher-enabled`实现。

界面代码：

```wxml

<scroll-view
  scroll-y
  class="scroll-y"

  lower-threshold="100"
  bindscrolltolower="getMore"
  enable-back-to-top

  refresher-enabled
  refresher-default-style="black"
  refresher-background="#f7f7f8"
  bindrefresherrefresh="refreshHandler"
  refresher-triggered="{{isTriggered}}"
>
  
  <view wx:for="{{ numList }}" wx:key="*this">{{ item }}</view>

</scroll-view>
```

js代码

```js

Page({

  data: {
    numList: [1, 2, 3],
    isTriggered: false
  },

  refreshHandler () {

    wx.showToast({
      title: '下拉刷新...'
    })
    
    setTimeout(() => {
      this.setData({
        numList: [1, 2, 3],
        isTriggered: false
      })
    }, 2000)

  },


  // scroll-view 上拉加载更多事件的事件处理函数
  getMore () {

    
    wx.showLoading({
      title: '数据加载中...'
    })

    setTimeout(() => {
      // 获取数组的最后一项
      const lastNum = this.data.numList[this.data.numList.length - 1]
      // 定义需要追加的元素
      const newArr = [lastNum + 1, lastNum + 2, lastNum + 3]

      this.setData({
        numList: [...this.data.numList, ...newArr]
      })

      wx.hideLoading()
    }, 1500)


  }

})


```

