+++
title = "Kotlin的Class"
date = 2025-01-14
authors = ["小中"]
[taxonomies]
tags = ["安卓", "kotlin"]

+++

# parameter 和 properties的区别

```kt
class Dog(val name: String) {
	//do something
}
```

如果加了val，则可以在实例对象中调用；如果不加，则是parameter，不能调用

注意，如果想要在实例中更改properties，要用`var`。

```kt
val daizy = Dog("Daisy")
println(daizy.name)
```

# 默认参数值

可以在定义参数时给默认值`val age: Int = 0`

# data class

如果只在当前的文件中使用，则使用`data class`

```kt
data class CoffeeDetails(
    val sugarCount: Int,
    val name: String,
    val size: String,
    val creamAmount: Int
)
```

# 参考资料

[udemy-eu-function-and-class](https://tutorials.eu/basic-kotlin-syntax-functions-objects-and-classes-in-kotlin-day-3-android-14-masterclass/)

