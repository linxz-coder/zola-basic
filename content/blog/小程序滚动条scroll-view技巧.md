+++
title = "小程序滚动条scroll-view技巧"
date = 2025-01-01
authors = ["小中"]
[taxonomies]
tags = ["小程序"]
+++

# 解决页面底端不能显示问题

滑到底部，页面会回弹。需要给底部设置空白区域。比如：

```wxml
<scroll-view scroll-y enable-back-to-top class="scroll-container">

<block wx:for="{{articleNames}}" wx:key="index">
  <view 
    class="list-item" 
    bindtap="onArticleClick" 
    data-index="{{index}}" 
  >
    <text>{{index + 1}}. {{item}}</text>
  </view>
</block>

<view style="height: 500rpx"></view> <!-- 设置底部空白，方便滚动到底部点击 -->

</scroll-view>
```

# 点击顶部回到最上方属性

enable-back-to-top属性。可以参考官方的[scroll-view知识](https://developers.weixin.qq.com/miniprogram/dev/component/scroll-view.html)