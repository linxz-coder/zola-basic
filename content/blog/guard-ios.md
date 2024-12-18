+++
title = "guard在ios-optional里面的用法"
date = 2024-12-02
+++

# guard let与if let的区别


guard let 和 if let 都是处理optional的方法。

两者区别是：

1. 从用法上说，guard 主要解决的是 if let 产生的 `多重嵌套`的问题。

2. 从语法上说，if let {} else {} 是一个条件判断，50/50的含义；而guard let else {} 是一个错误判断，告诉其他程序员else后面是错误，要小心。

3. if let 可以return，guard let 必须return

4. guard 规定的变量作用范围不只是 if 内的范围，scope外的代码都可以用。

比如：

```swift
guard let filename = titleInput.text, !filename.isEmpty else { return }
```

上面代码的意思是，如果titleInput.text有值，且不为空时，才继续执行代码，否则直接跳出程序。

`filename`可以继续在下面的代码中当做参数使用。

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

# 参考网址

[stackoverflow-iflet-guardlet](https://stackoverflow.com/questions/32256834/swift-guard-let-vs-if-let)
