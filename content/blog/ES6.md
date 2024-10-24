+++
title = "ES6的新特性"
date = 2024-10-24
+++

前端要会ES6，那么什么是传说中的`ES6`。

我看了一下[尚硅谷的教程](https://www.youtube.com/watch?v=aG1QPO4DTB8&list=PLmOn9nNkQxJFlj86lvBSpC2UsNw-pdmdq&index=2)。

# ES
ES是ECMAScript的简称，ECMAScript是脚本语言的规范。而我们所使用的JavaScript是ECMAScript的一种实现。

ECMAScript 是由 Ecma 国际通过ECMA-262 标准化的脚本程序设计语言。

# 为什么要学习 ES6？

ES6 的版本变动内容最多，具有里程碑意义。

如果发生了兼容问题，babel可以把ES6编译成ES5，解决部分落后浏览器不兼容的问题。

# let变量特性
1. 变量不能重复声明
```javascript
let star = ‘罗志祥’
let star = ‘小猪’
//不被允许
```

2. 块级作用域
```javascript
//if else while for
// {
// let girl = ‘周扬青’
// }
console.log(girl) //undefined
```

3. 不允许变量申明前使用
```javascript
console.log(song)
let song = ‘恋爱达人’
//不允许使用
```

# cosnt常量特性

1. 必须有初始值
```javascript
const A; //失败
```

2. 一般常量用大写
```javascript
const A = 100;
```

3. 常量的值不能更改

4. 块级作用域

5. 对于数组和对象的元素修改，不算对常量的修改，不会报错。
```javascript
const TEAM = [‘UZI’, ‘MXLG’, ‘MING’];
TEAM.push(‘MEIKO’)
//因为常量对应的引用地址（指针）没变，因此不会报错。
```

# ES6解构赋值

```javascript
//数组结构
const F4 = [‘小沈阳’, ‘刘能’, ‘赵四’, ‘宋小宝’];
let [xiao, liu, zhao, song] = F4;
console.log(xiao);
console.log(liu);
console.log(zhao);
console.log(song);

//对象结构
const zhao = {
	name: ‘赵本山’，
	age: 18,
	xiaopin: function(){console.log(‘我可以演小品’};
}

let {name, age, xiaopin} = zhao
cosole.log(name);
cosole.log(age);
console.log(xiaopin);

xiaopin(); //如果不解构赋值，要zhao.xiaopin()触发
```
