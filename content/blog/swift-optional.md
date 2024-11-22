+++
title = "swift的optional语法"
date = 2024-11-22
+++

# 处理Optional的五种方式

1.强制解包 Force Unwrapping	

`optional!`

2. Check for nil value	

`if optional ! = nil { option!}`

3. Optional Binding		

`if let safeOptional = optioanal{safeOptional}`

4. Nil Coalescing Operator	

`optional ?? defalutValue`

5. Optional Chaining	

`optional?.property / optioanl?.method`

示例代码：

```swift
let myOptional: String?

myOptional = nil

// 1. Force UnWrapping - nil值会在运行中崩溃
//let text: String = myOptional! //myOptional是nil，所以即使debug模式没错误，也会crash at runtime

// 2. check for nil value - 赋值时要加感叹号
if myOptional != nil{
    let text: String = myOptional!
    let text2: String = myOptional! //缺点：每一次都要加感叹号!
} else {
    print("myOptional was found to be nil")
}

//3. Optional Binding - 赋值时不用加感叹号
if let safeOtional = myOptional{
    let text: String = safeOtional
    let text2: String = safeOtional
    print(safeOtional)
} else {
    print("myOptional was found to be nil")
}

//4. Nil Coalescing Operator - 提供默认值
let text: String = myOptional ?? "I am the default value"
print(text)

//5. Optional Chaining - 处理optional是struct或者class的情况
struct MyOptional2{
    var property = 123
    func method(){
        print("I am the struct method.")
    }
}

let myoptional2: MyOptional2?

myoptional2 = MyOptional2()

print(myoptional2?.property) //如果不是nil，才往下执行
```
