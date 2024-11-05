+++
title = "Rust如何调用函数？"
date = 2024-11-05
+++


- 使用std库里面的io库里面的stdin()函数并调用。
- 使用.read_line方法
- &mut guess 指引用的是可变的guess地址，也可以是不可变的&guess。注意，引用符号是不能去掉的，否则无法再使用guess变量。这在`rust所有权`里面会详细介绍。

```rust
use std :: io
io::stdin()           // 1. 调用 io 库的 stdin() 函数,获取标准输入句柄
    .read_line(&mut guess)    // 2. 调用句柄的 read_line 方法来读取一行输入
    .expect("Failed to read line");    // 3. 处理可能的错误
```

# rust里面两个冒号是啥意思？

```rust
use std::io;
```

调用std库里面的io库。

两个冒号指的是“父子关系”。
