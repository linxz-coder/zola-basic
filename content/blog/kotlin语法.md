+++
title = "kotlin语法"
date = 2025-01-14
authors = ["小中"]
[taxonomies]
tags = ["安卓", "kotlin"]

+++

[Kotlin playground](https://play.kotlinlang.org/#eyJ2ZXJzaW9uIjoiMi4xLjAiLCJwbGF0Zm9ybSI6ImphdmEiLCJhcmdzIjoiIiwibm9uZU1hcmtlcnMiOnRydWUsInRoZW1lIjoiaWRlYSIsImNvZGUiOiIvKipcbiAqIFlvdSBjYW4gZWRpdCwgcnVuLCBhbmQgc2hhcmUgdGhpcyBjb2RlLlxuICogcGxheS5rb3RsaW5sYW5nLm9yZ1xuICovXG5mdW4gbWFpbigpIHtcbiAgICBwcmludGxuKFwiSGVsbG8sIHdvcmxkISEhXCIpXG59In0=)


[kotlin文档](https://kotlinlang.org/docs/home.html)

[udemy-eu-基本教程](https://tutorials.eu/exploring-basic-kotlin-syntax-and-structure-day-2-android-14-masterclass/)

# 基本数据类型

[官方指引](https://kotlinlang.org/docs/basic-types.html)

## number (signed or unsigened)

Byte 

Short

Int

Long

如果没有指定类型，默认是从`Int`类型开始推断，所以可能是Int或者Long

### signed 有符号的

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202501141000568.png)

### unsigned 无符号的

UByte

UShort

UInt

ULong

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202501141114494.png)

声明时后面加个`u`即可

`val age = 35u`

## val和var

val定义不变的变量，比如js里面的const，var是会变的变量

```kt
package online.linxz.kotlinbasics

fun main() {

    val age = 35

    var newAge = 33

    newAge = 32

    println("My age is $age")
}

```

## float和double

类型推断，默认是存储空间更大的`double`，可以通过以下声明改变：

当需要简单声明`float`的时候，最后加个`f`就可以。

```kt
val eFloat = 2.73344f
val someFloat: Float = 2.3444f //这个复杂方法也可以
```

## char和string

char单引号，string双引号

### 需要输入特殊符号

借助`unicode`，[unicode列表](https://en.wikipedia.org/wiki/List_of_Unicode_characters)

只需要在4位unicode代码前面就是`\u`即可使用

\代表转义字符，如果需要打出\，需要输入两个\\

```kt
val mychar = '\u00A9'
```

### string的方法

比如str.lowercase(), .uppercase()

# 条件判断

|| 和 && 运算符是`惰性工作`的，这意味着：

如果第一个操作数是真实的，|| 运算符不会评估第二个操作数。

如果第一个操作数是假的，&& 运算符不会评估第二个操作数。

# 获取用户输入readln()

```kt
fun main() {
    println("Please enter your age")
    val enteredValue = readln()
    val age = enteredValue.toInt()
    println("your age is $age")
}
```

## when赋值

类似于switch的功能。

### 变量有多个值

```kt
computerChoice = when (randomNumber) {
    1 -> {
        "Rock"
    }
    2 -> {
        "Paper"
    }
    else -> {
        "Scissors"
    }
}
```

### 多种情况判断

```kt
val winner = when {
    playerChoice == computerChoice -> "Tie"
    playerChoice == "Rock" && computerChoice == "Scissors" -> "You win!"
    playerChoice == "Scissors" && computerChoice == "Paper" -> "You win!"
    playerChoice == "Paper" && computerChoice == "Rock" -> "You win!"
    else -> "You Lose! Try again."
}
```

