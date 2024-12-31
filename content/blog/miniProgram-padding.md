+++
title = "小程序正确加左右边距的做法"
date = 2024-12-31
+++

padding是不够的，需要用border-box

```css
page{
  padding: 50rpx;
  box-sizing: border-box;
}
```

