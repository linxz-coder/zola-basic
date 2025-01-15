+++
title = "Kotlin的Elvis Operator"
date = 2025-01-15
authors = ["小中"]
[taxonomies]
tags = ["kotlin", "安卓"]

+++

?:是Elvis Operator

作用：结果是null，返回默认值

```kt
val inputValueDouble = inputValue.toDoubleOrNull() ?: 0.0
```
