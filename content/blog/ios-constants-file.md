+++
title = "ios如何创建contants file"
date = 2024-11-27
+++

用处：减少程序员自己输入String的次数，减少错误。

在主目录创建Constants.swift或者K.swift文件：

在let前面加上static方法。

```swift
struct Constants{
    static let registerSegue = "RegisterToChat"
    static let loginSegue = "LoginToChat"
}

```

现在就可以使用Constants.xx的形式了，会有提示，不容易出错。

## 拓展：static的作用

利用static，可以直接使用class或者struct里面的property，不需要实例化，即MyClass = SomeClass()之后再使用它的属性，大大地方便了使用。

注意， **static也可以用在func的前面** 。
