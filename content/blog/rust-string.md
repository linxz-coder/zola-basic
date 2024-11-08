+++
title = "Rust的字符串String"
date = 2024-11-08
+++

Rust没有专门的字符串基本类型，但 **字符串切片(&str)和字符串(String)** 在Rust中广泛使用：

# 静态方式

字符串切片（&str）：不可变的字符串类型，通常用于存储静态或引用字符串。

```rust 
let greeting: &str = "Hello, Rust!";
```

# 动态方式

字符串（String）：可变的字符串类型，用于动态生成和修改的字符串内容。

```rust
let mut name = String::from("Rustacean");
name.push_str("!");
```
