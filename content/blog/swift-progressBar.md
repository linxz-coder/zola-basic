+++
title = "swift如何设置进度条progressBar"
date = 2024-11-21
+++

利用`progress`属性。它的数据类型是`Float`

记住，要把分母和分子都设成`Float`类型，计算结果才对。不然会先计算成Int类型，再取Float值，造成结果错误。

```swift
progressBar.progress = Float(questionNumber) / Float(quiz.count)
```
