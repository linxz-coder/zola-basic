+++
title = "各编程语言的基本数据类型"
date = 2024-11-08
+++

# 基本数据类型和引用数据类型

## 基本数据类型（Primitive）

基本数据类型是最基础的数据单位，存储的是具体的值。常见的基本数据类型包括：int, float, char, boolean等。

基本数据类型直接存储在内存栈中，操作它们时直接访问数据的值，通常在栈上分配内存，效率较高。

## 引用数据类型（Reference)

引用数据类型存储的是数据的引用（或地址），而不是数据本身。引用数据类型的例子包括：Array, Class, Interface, String（某些语言是基本数据类型）等。

引用数据类型在内存中存储的是对象的地址，实际数据存储在堆内存中。引用数据类型允许更多的灵活性和复杂的数据结构，但访问和操作时需要额外的内存操作（例如指针引用）。

# Java数据类型

![java-dataType](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/Java%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B.png)

Java有8种基本数据类型:byte, short, char, int, long, float, double, boolean

## 整型
`byte` `short` `int` `long`

byte(1 byte) short(2 bytes) int(4 bytes) long(8 bytes)
￼
一般都用`int`，如果int搞不定了，采用long.

声明long类型时，需要l或者L作为后缀
```java
long l1 = 123123123L
```

## 浮点型
float(4 byte) double(8 byte)

定义float类型时，需要f或者F作为后缀

定义浮点类型时，一般都用`double`，因为精度更高。
￼
浮点类型float、double的数据不适合在不容许舍入误差的金融计算领域。如果需要精确数字计算或保留指定位数的精度，需要使用BigDecimal类。

## char字符型

占用2个字节。

三种形式：

* 形式1：使用单引号(' ')括起来的单个字符。 例如：char c1 = 'a'; char c2 = '中'; char c3 = '9';
* 形式2：直接使用 Unicode值来表示字符型常量：‘\uXXXX’。其中，XXXX代表一个十六进制整数。 例如：\u0023 表示 '#'。
* 形式3：Java中还允许使用转义字符‘\’来将其后的字符转变为特殊字符型常量。 例如：char c3 = '\n'; // '\n'表示换行符
* 隐藏形式4： char c4 = 97，实际输出是'a'，这是ASCII码的值。

## boolean类型

占用4个字节。因为true会看成1，false看成0，和int类型一样。

只有true和false

## 基本数据类型计算
可以做运算的是7种类型，不包含boolean类型

## 运算规则
### 自动类型提升（自动实现）
容量小的变量与容量大的变量运算时，容量小的自动提升成容量大的数据类型。

byte、short、char —> int —> long —> float —> double

特别的：byte、short、char类型之间的变量做运算，结果是int类型。

注意：容量大小并非指占用内存空间的大小，而是指表示数据范围的大小。

比如，浮点型float(4 bytes）表示的数据范围比整型long(8 bytes)大。

### 强制类型转换（手动实现）

常用场景：将容量大的变量转换成容量小的。

注意：可能有精度丢失的问题。

```java
double d1 = 12;
int i1 = (int)d1;
System.out.println(i1)
```


# JavaScript基本数据类型

1.	Number - 数字类型，包含整数和浮点数。
2.	BigInt - 大整数类型，用于表示超过Number范围的整数。
3.	String - 字符串类型。
4.	Boolean - 布尔类型，只有true和false两个值。
5.	Undefined - 未定义类型，当变量声明但未赋值时，值为undefined。
6.	Null - 空值类型，表示空对象引用。
7.	Symbol - 符号类型，用于创建唯一的标识符。
8.  Object - 非基本数据类型，是引用类型，存储复杂的数据结构

# Python基本数据类型

1. int - 正数
2. float - 浮点数
3. boolean - 布尔值
4. str - 字符串
5. NoneType - 空值 `empty_value = None`
6. complex - 复数，格式为a+bj，其中a和b是实数，j是虚数单位。

## 其他Python常用数据类型
- 列表（list）：用于存储多个元素的有序集合。
```python
my_list = [1, 2, 3]
```

- 元组(tuple)：与列表类似，但元素不可修改
```python
my_tuple = (1, 2, 3)
```

- 集合(set)：用于存储不重复的无须元素集合
```python
my_set = {1, 2, 3}
```

- 字典(dict)：用于存储键值对的数据结构
```python
my_dict = {'name': 'Alice', 'age': 30}
```

# Rust的基本数据类型
1. 整型。

用于存储整数，分为有符号和无符号两种，每种类型根据大小有不同的位数（8、16、32、64、128位），还有isize和usize两种根据平台大小自动调整的整型。

```rust
let a: i32 = 42;  // 有符号32位整数
let b: u64 = 123; // 无符号64位整数
```

2. 浮点型。

用于存储带小数的数字，有f32和f64两种精度。

```rust
let x: f32 = 3.14;  // 32位浮点数
let y: f64 = 2.718; // 64位浮点数（默认类型）
```

3. 布尔型

用于表示逻辑值，只有true和false两个值。

```rust
let is_active: bool = true;
```

4. 字符型（Character)

用于表示单个字符，支持Unicode字符，用char表示，占4个字节。

```rust
let letter: char = 'A';
let emoji: char = '😊';
```

5. 单元类型（Unit Type)

用作空值类似物，表示空的返回值，使用()表示。

```rust
let unit: () = ();
```

6. 数组

用于存储固定长度的同种类型数据。数组的长度是固定的，一旦定义不可更改。

```rust
let numbers: [i32; 3] = [1, 2, 3];
```

7. 元组(Tuple)

用于存储多种类型的固定长度数据结构。

```rust
let person: (i32, &str, bool) = (30, "Alice", true);
```


