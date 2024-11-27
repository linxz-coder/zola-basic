+++
title = "ios-设置标题UI元素"
date = 2024-11-27
+++

设置Logout button

# 添加元素bar button
改成名字-Logout

# 隐藏左上角Back按钮

在viewDidLoad里面增加：

```swift
navigationItem.hidesBackButton = true
```

# 增加上面中间的title

在viewDidLoad里面增加：

```swift
title = "⚡️FlashChat"
```
