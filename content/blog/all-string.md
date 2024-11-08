+++
title = "各编程语言的字符串String"
date = 2024-11-08
+++

# Rust的String

Rust没有专门的字符串基本类型，但 **字符串切片(&str)和字符串(String)** 在Rust中广泛使用：

## 静态方式

字符串切片（&str）：不可变的字符串类型，通常用于存储静态或引用字符串。

```rust 
let greeting: &str = "Hello, Rust!";
```

## 动态方式

字符串（String）：可变的字符串类型，用于动态生成和修改的字符串内容。

```rust
let mut name = String::from("Rustacean");
name.push_str("!");
```

# Python和JavaScript的String
这两个编程语言，String都是一种基本数据类型，没有啥讨论的，用就是了。

# Java的String

## 不可变性
Java中，String对象是不可变的，利用`concat`方法或者+运算符进行连接。

### concat方法
```java
String greeting = "Hello";
greeting.concat(", world!"); // 尝试添加", world!"，但不会改变greeting
System.out.println(greeting); // 输出仍然是 "Hello"
```

### +运算符
```java
String first = "Hello";
String second = "World";
String greeting = first + " " + second; // 生成新的字符串对象
```

## 字符串常量池

如果创建了相同的字符串字面量，Java不会在堆内存中创建新的对象，而是直接引用常量池中的现有对象，从而提高内存效率。

```java
String a = "Hello";
String b = "Hello";
System.out.println(a == b); // 输出 true，因为a和b指向同一个常量池对象
```

## 字符串比较

字符串在Java中可以用equals()方法或==操作符来比较。如果比较地址，就用==操作符；如果比较值，用equals()方法：

```java
String a = new String("Hello");
String b = new String("Hello");
System.out.println(a == b); // 输出 false，不同对象
System.out.println(a.equals(b)); // 输出 true，内容相同
```

## 字符串+变量

Java提供String.format()方法来格式化字符串，与printf相似。

```java
String name = "Alice";
int age = 30;
String formatted = String.format("Name: %s, Age: %d", name, age);
```

## 字符串分割

split(String regex)方法可以按指定的正则表达式将字符串拆分成数组。

```java
String sentence = "Hello,World,Java";
String[] words = sentence.split(",");
```

