+++
title = "Kotlin的let关键字"
date = 2025-01-16
authors = ["小中"]
[taxonomies]
tags = ["kotlin", "安全解包"]

+++

用于`安全解包`

因为变量可能是null

let允许在安全范围内处理变量，相当于iOS里面的安全解包。

```kt
val name: String? = "Ella"
name?.let{
	println(it.toUpperCase())
}
```
