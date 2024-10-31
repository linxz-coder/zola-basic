+++
title = "TypeScript介绍"
date = 2024-10-31
+++

# 什么是TypeScript
微软开发的。

TypeScript是JavaScript的一个`超集`，支持ES6标准，可以编译成纯JavaScript运行在任何浏览器上。适用于大型项目。

![ts和js的关系](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202410310955703.png)

# 为什么需要TS

JS地位变得重要，代码量变多，但是JS出生简陋，有许多困扰：

1. 不清不楚的数据类型

如果其他人给你数据，但是你不知道数据类型，可能就会错误使用：

```javascript
let welcome = 'hello'
welcome() //报错，welcome is not a function
```

2. JS不会汇报逻辑错误

比如以下代码，偶数部分的逻辑是永远不可能进入的：

```javascript
const str = Date.now() % 2 ? '奇数' : '偶数'

if (str !== '奇数'）{
	alert('hello')
} else if (str === '偶数'){
	alert('world')
}
```

3. 访问不存在属性时不会报错
4. 低级的拼写错误不会报错

# 静态类型检查

代码运行前检查，发现代码的错误或不合理之处，减少运行异常出现的概率。

简言之，`把运行时的错误前置`。

但是，这会造成TS的代码量比JS的大很多。不过`在维护方面，TS远胜于JS`。

# 如何编译TS

需要把.ts编译成.js

## 命令行编译

```
npm i typescript -g
```

安装完后，全局出现一个新命令`tsc`，即typescript compiler。

```
tsc index //.ts可以省略
```

编译后，出现一个.js文件。

## 自动化编译

初始化：

```
tsc —init
```

多了一个文件叫`tsconfig.json`。

监视项目：

```
tsc —watch
```

如果希望不出错时不编译，可以在`tsconfig.json`中解开注释：

```
"noEmitOnError": true,
```

还可以通过`webpack`进行编译。

# 类型声明

每个`变量/参数/函数返回值`都需要通过冒号来声明类型。

```typescript
let a: string = 'Hello World';
let b: number = 10;
let c: boolean = true;
let d: "hello" // 字面量类型，只能赋值为 'hello'

a = 9; // Error: Type '9' is not assignable to type 'string'.
a = false; // Error: Type 'false' is not assignable to type 'string'.
a = 'Hello'; // OK

b = 99; // OK
c = false; // OK

function count(x: number, y: number): number {
  return x + y;
}

let result = count(1, 2);
console.log(result); // 3

count(1); // Error: Expected 2 arguments, but got 1.

d = 'hell'; // Error: Type '"hell"' is not assignable to type '"hello"'.
```

# 类型推断

```typescript
// 类型推断

let d = -99; // 类型推断为 number

d = 'hello'; // 因为 d 已经被推断为 number 类型，所以这里会报错
```

# 类型总览

## JavaScript的类型总览：

1. string
2. number
3. boolean
4. null
5. undefined
6. biginit
7. symbol
8. object

备注：其中`object`包含：Array, Function, Date, Error 等......

## TypeScript的类型总览：

1. 上述所有JavaScript类型
2. 六个新类型  
  ① any  
  ② unknown    
  ③ never  
  ④ void  
  ⑤ tuple  
  ⑥ enum  
3. 两个自定义类型的方式  
  ① type  
  ② interface 

注意：
在 Javascript 中的这些内置构造函数： `Number` `String` `Boolean`，它们用于创建对应的包装对象，在`日常开发时很少使用`，在 TypeScript 中也是同理，所以在 TypeScript 中进行类型声明时，通常都是用`小写的 number、string、boolean`。

## 包装对象 vs 原始类型

string是原始类型，String是包装对象，我们通常用的是原始类型。

```typescript
// 类型总览

let str1: string; // TS官方推荐的写法
str1 = 'Hello World';
str1 = new String('hello'); // 错误。不能把一个String对象赋值给一个string类型的变量

let str2: String;
str2 = 'hello';
str2 = new String('hello'); // 正确。String对象可以赋值给String类型的变量

typeof(str1); // string
typeof(str2); // object
```

# 常用类型

## any

任意类型。放弃变量的类型检查。

可以显式声明和隐式声明：

```typescript
// 常用数据类型

let p: any; // 显式any

p = 10;
p = 'hello';
p = true;

let q; // 隐式any
q = 10;

q = 10;
q = 'hello';
q = true;
```

any的坑：any类型的值可以赋给任何数据类型
```typescript
let q; // 隐式any
q = 10;

let x: string;
x = q; // 不会报错，因为 q 是 any 类型
```

## unknown
可以理解为一个类型安全的`any`，适用于不确定数据的具体类型。

unknown和any不一样，因为不会踩any的坑，即不能赋值给任何数据类型。

```typescript
let a: unknown;

a = 99;
a = false;
a = 'hello';

let x: string;
x = a; // 报错。不能将类型“unknown”分配给类型“string”
```

如何让ts放心的把unknown类型的值赋给其他类型的变量呢？

```typescript
// 第一种：if判断
if (typeof a === 'string') {
    x = a;
}

// 第二种：类型断言的第一种写法
x = a as string;

// 第三种：类型断言的第二种写法
x = <string>a;
```

unknown也不能使用任何方法，any则相反：

```typescript
let str1: string;
str1 = 'Hello World';
str1.toUpperCase();

let str2: any;
str2 = 'Hello TypeScript';
str2.toUpperCase();

let str3: unknown;
str3 = 'Hello TypeScript';
str3.toUpperCase(); // 报错。unknown不能调用string类型的方法
```

## never

never用来限制函数的返回值，让函数不返回任何值。注意：一般函数至少会返回undefined，除非抛出错误。

```typescript
function demo(): never{
    throw new Error('程序运行异常！'); // 函数会抛出异常，不会有返回值；正常函数至少会返回undefined
}
```

## void

和`never`类似，也是用于函数的返回值。区别是void可以接受`undefined`。

```typescript
// void可以接受的“空”值：undefined

function logMessage(msg:string): void {
    console.log(msg);
}

function logMessage2(msg:string): void {
    console.log(msg);
    return;
}

function logMessage3(msg:string): void {
    console.log(msg);
    return undefined;
}
```

## object

### 小object和大Object一般不用

因为太宽泛了。

```typescript
// object 类型

let a: object; //a能存储的类型是【非原始类型】
let b: Object; //b能存储的类型是可以调用到Object上所有方法的类型


// a能存储的类型
a = {};
a = {name: 'lison'};
a = function () {};
a = new String('aaa');
class Person {}
a = new Person();

// a不能存储的类型
a = 1;
a = 'aaa';
a = true;
a = undefined;
a = null;

// b能存储的类型
b = {};
b = {name: 'lison'};
b = function () {};
b = new String('aaa');
b = new Person();
b = 1;
b = 'aaa';
b = true;

// b不能存储的类型
b = undefined;
b = null;
```

### 怎么声明对象？
```typescript
let person: {name: string, age?: number}; //?代表age属性是可选的

person = {name: 'Jack', age: 32};
```

### 声明对象追加属性
```typescript
let person: {
    name: string
    age?: number //?代表age属性是可选的
    [key: string]: any //含义：除了name和age属性外，还可以有其他任意属性，属性名是字符串类型，属性值是任意类型
}; 

person = {name: 'Jack', age: 32, gender: '男', height: 180};
```

### 声明函数类型

```typescript
let count: (a: number, b: number) => number;

count = (a, b) => {
    return a + b;
}
```

### 声明数组类型
```typescript
let arr: string[]; //第一种方式
let arr2: Array<string>; //第二种方式，泛型方式

arr = ['a', 'b', 'c'];
arr2 = ['a', 'b', 'c'];
```

## tuple
元组(tuple)是一种特殊的数组类型，它限定了数组的长度和每个元素的类型。

```typescript
// tuple是一种特殊的数组，它限定了数组的长度和每个元素的类型
let arr1: [string, number];
let arr2: [string, boolean?];
let arr3: [number, ...string[]]; //含义：你可以有任意多个string类型的元素，但是第一个元素必顼是number类型

arr1 = ['Hello', 10];
arr2 = ['Hello'];
arr3 = [10, 'Hello', 'World'];
```

## enum
枚举(enum)可以定义`一组命名常量`，作用是增强代码的可读性，让代码更好维护。

### 数字枚举

```typescript
enum Direction {
    Up,
    Down,
    Left,
    Right
}

console.log(Direction); // Direction是一个对象 { '0': 'Up', '1': 'Down', '2': 'Left', '3': 'Right', Up: 0, Down: 1, Left: 2, Right: 3 }
console.log(Direction.Up); // 0
console.log(Direction.Down); // 1
console.log(Direction.Left); // 2
console.log(Direction.Right); // 3

console.log(Direction[0]); // Up
console.log(Direction[1]); // Down
console.log(Direction[2]); // Left
console.log(Direction[3]); // Right

function walk(data:Direction){
    if (data === Direction.Up){ //避免直接使用字符串，避免写错
        console.log("向【上】走");
    } else if (data === Direction.Down){
        console.log("向【下】走");
    } else if (data === Direction.Left){
        console.log("向【左】走");
    } else if (data === Direction.Right){
        console.log("向【右】走");
    } else {
        console.log("未知");
    }
}

walk(Direction.Up); // 向【上】走
```

### 字符串枚举

```typescript
enum Direction {
    Up = "up",
    Down = "down",
    Left = "left",
    Right = "right"
}
```

### 常量枚举

把枚举包在一个常量const中。

作用：ts编译成js后，只输出使用的枚举属性，比如Up，其他属性不输出，简化js代码。

```typescript
const enum Direction {
    Up,
    Down,
    Left,
    Right
}

console.log(Direction.Up);
```

## type
能为任意多种数据类型创建别名。

### 联合类型（“或”）

```typescript
type Status = number | string;
type Gender = "男" | "女";

function printStatus(status: Status): void {
  console.log(status);
}

printStatus(200); // 200


function printGender(gender: Gender): void  {
  console.log(gender);
}

printGender("不男不女"); // 报错
```

### 交叉类型（“并且”）

```typescript
// 面积
type Area = {
    width: number;
    height: number;
}

// 地址
type Address = {
    city: string;
    country: string;
    room: number;
}

type House = Area & Address;

const house: House = {
    width: 100,
    height: 200,
    city: 'Beijing',
    country: 'China',
    room: 505
}
```

### 一种例外情况
type定义的函数，返回void的定义是无效的。

```typescript
type LogFunc = () => void;

const f1: LogFunc = () => {
    // return undefined;
    return 999; // 没有报错，因为没做限制；如果做限制，箭头函数默认返回值可能不是undefined，会报错，就不能使用箭头函数。
}
```

可查看[TypeScript视频教学](https://www.youtube.com/watch?v=pBUouUw7A7M)具体了解情况，TypeScript官网上也有详细的案例解析。













## 参考资料
[禹神：三小时快速上手TypeScript](https://www.youtube.com/watch?v=Chu1IBKm_oE)




