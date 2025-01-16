+++
title = "什么是Kotlin的it参数"
date = 2025-01-16
authors = ["小中"]
[taxonomies]
tags = ["kotlin"]

+++

在 Kotlin 中，it 是一个隐式参数，用于单一参数的 Lambda 表达式中。当你在 Lambda 表达式中没有显式声明参数名时，Kotlin 会自动将该参数命名为 it。

比如：

```kt
val list = listOf(1, 2, 3, 4)
val doubled = list.map { it * 2 }
println(doubled)  // 输出: [2, 4, 6, 8]
```

在这个例子中，map 函数接受一个 Lambda 表达式，Lambda 表达式的参数是 it，它表示列表中的每个元素。在没有显式命名参数的情况下，Kotlin 自动为该参数命名为 it。
