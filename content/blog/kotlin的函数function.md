+++
title = "kotlin的函数function"
date = 2025-01-14
authors = ["小中"]
[taxonomies]
tags = ["安卓", "kotlin"]

+++

# 基本写法

```kt
fun makeCoffee(sugarCount: Int){
	printLn("Coffee with $sugarCount spoons of sugar")
}
```

# 带返回值的函数

带冒号:

```kt
fun add(num1: Int, num2:Int):Int{
	val result = num1 + num2
	return result
}
```
