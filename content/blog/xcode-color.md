+++
title = "xcode自定义颜色的方法"
date = 2024-11-22
+++

# colorLiteral 

这种写法最方便，可以调出xcode的调色盘，自己选颜色，不用输入RGB数值。

```swift
let color = #colorLiteral(red: 1, green: 0, blue: 0, alpha: 1)
```

# UIcolor.red / UIcolor()

另外两种写法：

```swift
// 视图背景色
view.backgroundColor = .red  // 使用系统预设颜色，省略.前面的UIColor
view.backgroundColor = UIColor(red: 1.0, green: 0, blue: 0, alpha: 1.0) // RGB值设置

