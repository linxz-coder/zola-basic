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


# 函数格式
fn 开头，入口函数是`main函数`。

## 如何传参数

```rust
fn another_function(x: i32){
	println!("The value of x is: {x}");
}
```

## 语句和表达式。
语句没有返回值。函数定义、定义变量都是语句。

表达式有返回值。函数调用时一个表达式。

这是一个表达式：
```rust
{
	let x = 3;
	x +1
}
```

值得注意的是，x+1后面没有分号，如果有，就会变成语句。现在的返回值是4。

## 具有返回值的函数
格式如下，需要通过->制定返回值的类型，可以在函数写return或者不写。

函数默认的返回值不是undefined，是最后一个表达式的值。
```rust
fn five() -> i32 {
    5
}
```

注意，如果最后是`5;`，则认为它是语句，而不是表达式。默认没有返回值，这点要切记。
