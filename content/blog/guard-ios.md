+++
title = "guard在ios-optional里面的用法"
date = 2024-12-02
+++

guard 主要解决的是 if let 产生的 `多重嵌套`的问题。

guard let 和 if let 都是处理optional的方法。

两者区别是：

guard 作用范围不只是 if 内的范围，下面的代码都可以用。

比如：

```swift
guard let filename = titleInput.text, !filename.isEmpty else { return }
```

上面代码的意思是，如果titleInput.text有值，且不为空时，才继续执行代码，否则直接跳出程序。

filename可以继续在下面的代码中当做参数使用。

以上代码也可以用`if let`实现，不过if let容易产生多重循环。

if let示例

```swift
let newUser = User()

func showGreeting(){
    if let nickname = newUser.nickname{
        // do something
    }
}
```

guard 示例

```swift

let newUser = User()

func showGreeting(){
    guard let nickname = newUser.nickname else {return}
    // do something
}
```
