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

# copy对象

使用.copy方法，同时可以修改属性

```kt
val blueRoseVase = Vase(color = "Blue", design = "Rose")
val redRoseVase = blueRoseVase.copy(color = "Red")

data class Vase(val color: String, val design: String)
```

# 继承class

## 父class需要加上open关键字

`open class BaseClass{}`

如果需要在后面override函数，也需要加上open关键字

`open fun thingsToOverride(){}`

### 示例

```kt
override fun role(){
	super.role() //继承所有
	//其他代码
}
```

## 继承class需要加上括号

`class Secondary: BaseClass(){}`

## interface 接口

一样是继承的概念，主要解决`多重继承`的问题。

但是父亲不需要`open`关键字

定义

```kt
interface Archer{
	fun archer(){
		println("Archer skills from Sir Secondary")
	}
}
```

使用

```kt
class Offsprint: Secondary(), Archer{
}
```

# 参考资料

[udemy-eu-function-and-class](https://tutorials.eu/basic-kotlin-syntax-functions-objects-and-classes-in-kotlin-day-3-android-14-masterclass/)

