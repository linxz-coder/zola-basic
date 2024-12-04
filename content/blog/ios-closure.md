+++
title = "ios-closure闭包函数介绍"
date = 2024-11-25
+++

closure： 匿名函数或没有名称的函数。
用处：让代码变得简洁（但不易懂）。

格式：

不需要`func+name`，花括号{}提前，中间加入一个`in`即可。

```swift
{(n1: Int, n2: Int) -> Int in
   return n1 + n2
}
```

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411251615380.png)


示例代码：

```swift
func calculator (n1: Int, n2: Int, operation:(Int, Int) -> Int) -> Int {
    return operation(n1,n2)
}

func add (no1: Int, no2: Int) -> Int{
    return no1 + no2
}


//使用正常function
calculator(n1: 2, n2: 3, operation: add)

//使用closure
//calculator(n1: 2, n2: 3, operation: {(no1: Int, no2: Int) -> Int in
//    return no1 * no2
//})


//closure简易版
//利用类型推断，不用输入Int
//返回值、return可以去掉，也是自动推断
// $0代表第一个参数，$1代表第二个参数
// 可以省略operation:
let result = calculator(n1: 2, n2: 3) { $0 * $1 }
print(result)


//应用
let array = [6,2,3,9,4,1]

/*
 要求：
 给每个元素都+1，可以用for loop这个复杂方法，也可以用closure
 */

let addOne = array.map() {$0 + 1}
print(addOne)

//将所有元素转换为String

let newArray = array.map {"\($0)"}
print(newArray)

```

# 一个函数作为参数的闭包closure

如果只有一个参数，参数还是一个function，function后面不带括号：

```swift
alert.addTextField { (alertTextField) in
            alertTextField.placeholder = "Create New Item"
            textField = alertTextField
}
```
