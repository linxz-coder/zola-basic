+++
title = "JavaScript的数组方法"
date = 2024-11-02
+++

# 目录
- [map()](#map)
- [forEach()](#foreach)
- [filter()](#filter)
- [参考](#reference)

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


# 参考{#reference}
[MDN Array知识](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
