+++
title = "JavaScript的数组方法"
date = 2024-11-02
+++

# 目录
- [map()](#map)
- [forEach()](#foreach)
- [filter()](#filter)
- [find()](#find)
- [shift()](#shift)
- [slice()](#slice)
- [splice()](#splice)
- [参考](#reference)

# 是否改变原数组

## 改变原数组的方法

- shift 删除数组第一个元素，返回该元素的值。
- splice 添加或替换数组元素，返回新数组。
- slice 剪切或复制数组，返回新数组。

## 不改变原数组的方法

- map 创建新数组，由函数返回值组成。
- forEach 让数组各元素调用函数，返回undefined.
- filter 创建新数组，由符合条件（函数）组成。
- find 找到符合条件（函数）的第一个值，返回改值。


# map(){#map}

Array.prototype.map()

map()`创建一个新数组`，由原来数组每个元素调用一次函数的`返回值`组成。

注意，如果使用if条件判断，若元素套入函数没有返回值，`JavaScript默认的返回值为undefine`。

因此，涉及条件判断最好使用`filter`，否则会出现意想不到的结果。

## map案例：让所有元素乘以2

```JavaScript
const array1 = [1, 4, 9, 16];

// Pass a function to map
const map1 = array1.map((x) => x * 2);

console.log(map1);
// Expected output: Array [2, 8, 18, 32]
```

# forEach(){#foreach}

与map功能基本一致，都是让数组每个元素调用函数，区别是没有返回值，实际返回值应该是undefined。

## forEach() 和 map() 使用的场景：

1. forEach() 适合的场景：

```JavaScript
const users = ['Alice', 'Bob', 'Charlie'];
users.forEach(user => {
    sendEmail(user); // 发送邮件这种操作不需要返回值
});
```

2. map()适合的场景：

```JavaScript
const users = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 }
];
const userNames = users.map(user => user.name);
// userNames = ['Alice', 'Bob']
```

简单来说：

- 如果你只需要执行操作而不需要新数组，用 forEach()

- 如果你需要基于原数组创建新数组，用 map()

# slice(){#slice}

剪切数组/复制数组，返回一个新数组，

参数有两个：start和end，包含从start，但不包含end的新数组。

如果不输入参数，有`复制一个一模一样的新数组`的功能。

## 剪切数组举例

```JavaScript
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(animals.slice(2));
// Expected output: Array ["camel", "duck", "elephant"]

console.log(animals.slice(2, 4));
// Expected output: Array ["camel", "duck"]

console.log(animals.slice(1, 5));
// Expected output: Array ["bison", "camel", "duck", "elephant"]

console.log(animals.slice(-2));
// Expected output: Array ["duck", "elephant"]

console.log(animals.slice(2, -1));
// Expected output: Array ["camel", "duck"]
```

## 复制数组举例

```JavaScript
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(animals.slice());
// Expected output: Array ["ant", "bison", "camel", "duck", "elephant"]
```

# splice(){#splice}

给数组添加元素或替换元素。改变原数组。

三个参数。

第一个参数指需要改变的index，第二个参数指需要删除的元素个数，0指不需要删除，第三个参数指替换的新值。

## 添加数组元素举例
```JavaScript
const months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');
// Inserts at index 1
console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "June"]
```

## 替换数组元素举例
```JavaScript
months.splice(4, 1, 'May');
// Replaces 1 element at index 4
console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "May"]
```

# find(){#find}

找到符合条件的第一个元素。

注意，想要找到所有符合条件（函数）的值，可以用`filter`方法。

## find用法举例

```JavaScript
const array1 = [5, 12, 8, 130, 44];

const found = array1.find((element) => element > 10);

console.log(found);
// Expected output: 12
```

# filter(){#filter}

作用是过滤。

若元素在给定的函数中，返回true结，则返回元素；如元素在给定函数中，返回false，则不返回元素。

所有返回元素组成一个新数组。

## filter案例：我要所有大于10的元素

```JavaScript
function isBigEnough(value) {
  return value >= 10;
}

const filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
// filtered is [12, 130, 44]
```

# shift(){#shift}

用法：改变原数组长度。

返回值：从数组中删除第一个元素，并返回该元素的值。

## 改变原数组长度举例
```JavaScript
const array1 = [1, 2, 3];

const firstElement = array1.shift();

console.log(array1);
// Expected output: Array [2, 3]

console.log(firstElement);
// Expected output: 1
```


# 参考{#reference}
[MDN Array知识](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
