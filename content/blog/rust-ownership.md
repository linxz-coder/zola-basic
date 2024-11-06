+++
title = "什么是Rust的所有权？"
date = 2024-11-06
+++

# Rust所有权 ownership

作用：
Rust不用内存回收，时刻都知道内存给谁用。

# 对比其他语言：
Java有`垃圾回收`机制，程序运行时不断寻找不再使用的内存。

C语言中，程序员要亲自分配和释放内存。

Rust通过所有权系统管理内存，编译器在编译时会根据一系列的规则进行检查。如果违反了任何这些规则，程序都不能编译。在运行时，所有权系统的任何功能都不会减慢程序。

# 栈stack和堆heap知识回顾

- 栈：后进先出。
- 堆：堆想要使用内存，需要开辟内存；栈不需要，因为栈的内存是提前开辟好的。堆需要单独分配，用完需要释放。

入栈比在堆上分配内存要快。

我们听说过`stackoverflow`，但是不存在`heapoverflow`。因为堆内存分配，只会出现系统内存不够用。

访问堆上的数据比访问栈上的数据慢，因为必须通过指针来访问。

## 所有权管理的是堆数据

跟踪哪部分代码正在使用堆上的哪些数据，最大限度的减少堆上的重复数据的数量，以及清理堆上不再使用的数据确保不会耗尽空间，这些问题正是所有权系统要处理的。

# 所有权规则

1. Rust 中的每一个值都有一个 所有者（owner）。
2. 值在任一时刻有且只有一个所有者。
3. 当所有者（变量）离开作用域，这个值将被丢弃。

解释：内存的生命周期和所有者有关。如果所有者结束了生命周期，内存使用的生命周期也结束。

C和C++内存和指针的使用是分裂的，所以出现“野指针”的现象（内存被回收了，但是指针空了），甚至“内存泄露”（出现了一块被使用的内存，但是没有任何指针指向它）。

# 作用域
代码仅在大括号里面有用。
```rust
{
    let c = "hello"
}
```

# 所有权和string数据类型

Rust会在作用域结束自动释放内存：

```rust
    {
        let s = String::from("hello"); // 从此处起，s 是有效的

        // 使用 s
    }                                  // 此作用域已结束，
                                       // s 不再有效
```

Rust永远不会进行`深拷贝`，因此不会浪费内存空间或出现内存泄露的问题。

```rust
let s1 = String::from("hello");
    let s2 = s1; // s1 is moved to s2
    println!("{}, world!", s1); //报错，s1已经不在了
```

如果确实需要拷贝，可以使用`let s2=s1.clone();`。


# 所有权和函数

当字符串的变量s变成takes_ownership()函数的参数时，它的生命周期就会消失。

```rust
fn main() {
    let s = String::from("hello");  // s 进入作用域

    takes_ownership(s);             // s 的值移动到函数里 ...
                                    // ... 所以到这里不再有效

    let x = 5;                      // x 进入作用域

    makes_copy(x);                  // x 应该移动函数里，
                                    // 但 i32 是 Copy 的，
                                    // 所以在后面可继续使用 x

} // 这里，x 先移出了作用域，然后是 s。但因为 s 的值已被移走，
  // 没有特殊之处

fn takes_ownership(some_string: String) { // some_string 进入作用域
    println!("{some_string}");
} // 这里，some_string 移出作用域并调用 `drop` 方法。
  // 占用的内存被释放

fn makes_copy(some_integer: i32) { // some_integer 进入作用域
    println!("{some_integer}");
} // 这里，some_integer 移出作用域。没有特殊之处
```

## 参考资料
[Rust所有权知识](https://kaisery.github.io/trpl-zh-cn/ch04-01-what-is-ownership.html)
