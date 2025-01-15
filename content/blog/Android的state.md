+++
title = "Android的state"
date = 2025-01-15
authors = ["小中"]
[taxonomies]
tags = ["安卓"]

+++

# 声明状态

remember 方法 和 mutableStateOf() 方法

# 改变变量

使用.value

```kt
val direction = remember { mutableStateOf("North") }

Button( onClick = {
	direction.value = "East"
})
{
	Text("Sail East")
}
```

## by - 不需要.value的写法

注意这里是`var`，因为变量外围没有其他包裹。

```kt
var direction by remember { mutableStateOf("North") }

Button( onClick = {
	direction = "East"
})
{
	Text("Sail East")
}
```

# 参考

[Udemy课程资料](https://tutorials.eu/mastering-state-management-and-essential-kotlin-syntax-day-6-android-14-masterclass/)

