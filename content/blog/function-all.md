+++
title = "如何定义函数-多编程语言"
date = 2024-11-08
+++

# Java函数

定义一个返回int值的函数：

```java
public class Example{
    public int add(int a, int b){
        return a + b;
    }
}

public static void main(String[] args){
    Example example = new Example();
    int result = example.add(5,3);
    System.out.println("结果是："+result);
}
```

# Rust函数

定义一个返回int值的函数：

```rust
fn add(a: i32, b: i32) -> i32{
    a + b
}

fn main(){
    let result = add(5,3);
    println!("结果是：{}", result);
}
```

# python函数

```python
def add(a,b):
    return a + b

result = add(5,3)
print("5+3的结果是：", result)
```

# JavaScript函数

```JavaScript
function add(a,b){
    return a + b;
}

let result = add(5,3);
console.log("5+3的结果是：", result);
```

JavaScript还有箭头函数`()=>{}`的形式。

# swift函数

```swift
func greeting2(whoToGreet: String){
    print("Hello \(whoToGreet)")
    
}

greeting2(whoToGreet: "Linxz")

```

# 为什么Java和Rust的代码更复杂？

## 编译型和解释性语言

Java和Rust属于编译型语言，需要把它编译成机器代码，所以需要严格检查编写时的类型和内存管理，更多工作交给代码本身。

Python和JavaScript属于解释型语言，不用直接编译成机器代码，可以在运行时编译和进行内存管理，所以写起来比较简单，更多工具交给解释器。
