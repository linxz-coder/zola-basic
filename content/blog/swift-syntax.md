+++
title = "swift语法介绍"
date = 2024-11-13
+++

# swift基本语法

![swift-cheatsheet](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411131554901.png)

# swift的数组

## 如何定义数组

```swift
let diceImages = [
    UIImage(named: "DiceOne"),
    UIImage(named: "DiceTwo"),
    UIImage(named: "DiceThree"),
    UIImage(named: "DiceFour"),
    UIImage(named: "DiceFive"),
    UIImage(named: "DiceSix")
]
```

注意，`var`指可变的变量，`let`指不变的变量，类似const

# swift如何生成一个随机数

## 方法一：Int.random()

```swift
Int.random(in: 0...5)
```

范围：从0到5的随机整数


## 方法二： Array.randomElement()

```swift
 let diceImages = [
            UIImage(named: "DiceOne")!, //!代表非空
            UIImage(named: "DiceTwo")!,
            UIImage(named: "DiceThree")!,
            UIImage(named: "DiceFour")!,
            UIImage(named: "DiceFive")!,
            UIImage(named: "DiceSix")!
  ]
        
        diceImageView1.image = diceImages.randomElement()
```

注意，因为数组元素是UIImage，系统会进行安全检查，认为这里可能是空值。即`UIImage?`，加上一个Optional的条件。

加上感叹号意思是`强制解包`，否则会报错。

告诉编译器， **我确定这里有值** ，这样，执行randomElement()才不会报错。

# 如何在swift的print里面插入变量？

## 利用反斜杠

```swift
pritn(“Text \(2+3) Text”)
```

示例代码：

```swift
var a = 4
print("The result of 2 + 2 = \(2+2)")
print("The result of 2 + 2 = \(a)”)
```
