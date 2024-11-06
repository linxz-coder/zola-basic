+++
title = "Rust如何声明变量"
date = 2024-11-05
+++

创建新字符串示例：

```rust
let mut guess = String :: new();
```

* mut是一个关键字，表示变量是可以赋值的，即mutable（可变的）
* 这是一个String类型，从String库里new一个实例出来。

如果要创建带内容的字符串：

```rust
let s1 = String::from("hello");
```

# mut关键字

rust变量默认不可变，除非加上mut

```rust
// rust变量默认是不可变的
    let x = 5;
    println!("The value of x is: {}", x);
    // x = 6; // error: cannot assign twice to immutable variable `x`

    // 使用mut关键字定义可变变量
    let mut y = 4;
    println!("The value of y is: {}", y);
    y = 5; //注意这里没有let
    println!("The value of y+1 is: {}", y+1);
```

# 常量const

```rust
 // rust常量
 const MAX_POINTS: u32 = 100000; //常量必须注明类型，如u32；常量名约定大写，用下划线分隔单词；不能使用mut关键字
println!("The value of MAX_POINTS is: {}", MAX_POINTS);
```

# shadowing 

允许用let关键字改变变量，分配新的内存。

传统做法：声明变量即分配内存，之后变量必须要保持同类型（比如整型），因为如果换成其他类型，内存分配大小会不符合。

rust做法：每次使用let关键字重新声明变量x时，实际上创建了一个新的变量，并不是在原有的内存地址上直接修改值。这样会更加灵活。

```rust
let x = 5;
let x = x + 1; // 覆盖原来的x，产生一个新的绑定
let x = "Hello"; // 再次覆盖x，类型可以不同
println!("The value of x is: {}", x);
```
