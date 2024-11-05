+++
title = "rust语言介绍"
date = 2024-11-04
+++

# rust是什么

rust是新时代的C语言。

rust的安全方案主要针对的是C语言的不足。
![rust-c](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411041727335.png)

rust是”面向过程”的编程语言，和C语言一样。

Rust 是 WASI（WebAssembly System Interface）推广和普及的背后推手。

# rust从哪里来？

任何一门语言的诞生，都是解决一个编程问题。

2006年，Graydon Hoare开发出来rust。

兼顾安全、性能、广泛特性

rust含义: trust robust

## rust设计哲学
![rust-philosophy](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411041725478.png)

# 安装rust

## 安装rustup:
```bash
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
```

## 安装c语言编译器：
```bash
xcode-select --install
```
注意，mac上通常已经安装过编译器了。

## 测试是否安装成功：
```bash
rustup
```

更新一下
```bash
rustup update
```

## 查看本地文档
```bash
rustup doc
```

# 编写并运行Rust程序

# 编写
新建文件名：main.rs

```rust
fn main() {
    println!("Hello, world!");
}
```

# 编译

```rust
$ rustc main.rs
$ ./main
Hello, world!
```

# 参考资料
1. rust书籍推荐 - 《rust编程之道》
2. [rust视频教程-极客时间](https://www.youtube.com/watch?v=iO0TE1RHL-k&list=PLbhBvxP8oc-bA8YB3rPwnIAVGZpP57jBv&index=2)
3. [Rust程序设计语言中文版](https://kaisery.github.io/trpl-zh-cn/)
