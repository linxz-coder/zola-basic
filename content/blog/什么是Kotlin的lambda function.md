+++
title = "什么是Kotlin的lambda function"
date = 2025-01-16
authors = ["小中"]
[taxonomies]
tags = ["kotlin"]

+++

`onEditClick: () -> Unit`作为函数参数。内置的OnClick其实也是一个lambda function

指没有参数，也没有任何返回值（即Unit）。需要的时候，可以在function内部调用`onEditClick`，并修改它的值。

# 一个简洁的lambda函数例子

函数解释：接收Int为参数，返回Int，把数字乘以2

```kt
val doubleNumber: (Int) -> Int = { it * 2 }

doubleNumber(5)
```

