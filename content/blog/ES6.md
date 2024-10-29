+++
title = "ES6的新特性"
date = 2024-10-24
+++

前端要会ES6，那么什么是传说中的`ES6`。

视频教程推荐[尚硅谷的教程](https://www.youtube.com/watch?v=aG1QPO4DTB8&list=PLmOn9nNkQxJFlj86lvBSpC2UsNw-pdmdq&index=2)。另推荐阮一峰的[ECMAScript 入门](https://es6.ruanyifeng.com/#docs/intro)，一本开源书。

以下是我的总结：

# 目录
[ES是什么](#what-is-es)

[为什么要学习 ES6](#why-es6)

[let变量特性](#let)

[cosnt常量特性](#const)

[ES6解构赋值](#deconstruct)

[ES6模版字符串](#template-string)

[ES6简化对象写法](#object-simple) 

[ES6箭头函数](#arrow-function)

[ES6允许参数的初始值](#default-argument)

[ES6 rest参数，即省略号 - 参数转数组](#rest)

[ES6扩展运算符 - 数组转参数](#spread-operator)



# ES是什么{#what-is-es}
ES是ECMAScript的简称，ECMAScript是脚本语言的规范。而我们所使用的JavaScript是ECMAScript的一种实现。

ECMAScript 是由 Ecma 国际通过ECMA-262 标准化的脚本程序设计语言。

# 为什么要学习 ES6？{#why-es6}

ES6 的版本变动内容最多，具有里程碑意义。

如果发生了兼容问题，babel可以把ES6编译成ES5，解决部分落后浏览器不兼容的问题。

# let变量特性{#let}
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

# cosnt常量特性{#const}

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

# ES6解构赋值{#deconstruct}

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

# ES6模版字符串{#template-string}

ES6模版字符串``

用\``框起来的，和''以及""是一样的，类型都是字符串。

特点：
1. 可以直接出现换行符
```javascript
let str = `<ul>
<li>沈腾</li>
<li>玛丽</li>
</ul>`
```

2. 实现变量的拼接
```javascript
let lovest = ‘魏翔’;
let out = `${lovest}是我心目中最搞笑的演员。`
```

# ES6简化对象写法{#object-simple}
允许大括号里面，直接写入变量和函数。不用写冒号。

```javascript
let name = ‘尚硅谷’;
let change = function(){console.log(‘我们可以改变你!”)}

const school = {name, change, improve({console.log(“improve”)}}

//正确写法应该是name: name, change:change, improve:function(){}， 只要key和value相同，就可以简写。 冒号和function也可以省略。
```

# ES6箭头函数{#arrow-function}
什么是箭头函数的形式？
```javascript
let fn = () =>{}
```

箭头函数与传统函数function()的区别：

1. this是静态的，始终指向函数声明时所在作用域下的this的值。传统函数的this是动态的，谁调用我，我就指向谁。

```javascript
function getName(){console.log(this.name)}

let getName2 =  () => {console.log(this.name)}

//设置window对象的name属性
window.name = “尚硅谷”;
const school = {name: “ATGUIGU”}

//直接调用
getName();
getName2();
//以上结果都一样，都是“尚硅谷”。

//call方法调用：call方法是可以改变this指向的值的
getName.call(school); //ATGUIGU
getName2.call(school); //尚硅谷
```

2. 不能作为构造函数去实例化对象

```javascript
let Person = (name, age) => {this.name = name; this.age = age;}

let me = new Person(‘xiao’, 30);
console.log(me); //报错，Person不是一个构造器constructor
```

3. 不能使用arguments变量

```javascript
let fn = () => {console.log(arguments)};
fn(1,2,3); //报错
```

4. 箭头函数的简写
- 省略小括号，当形参有且只有一个。
```javascript
let add = n => {return n+n};
```

- 省略花括号，当代码体只有一条语句的时候。此时’return’必须省略。而且语句的执行结果就是函数的返回值。
```javascript
let pow = n => n*n;
```

## 案例-返回数组的偶数项

```javascript
const arr = [1,6,9,10,100,25]

//传统做法:
const result = arr.filter(function(item){
	if(item%2===0){
		return true;
	}else{
		return false	
}
})

//箭头函数做法
cosnt result = arr.filter(item => item % 2 === 0);
//只要是偶数的值，就返回。
```

## 箭头函数不适合与this有关的回调
比如（点击）事件回调，对象的方法

```javascript
{name: ‘atguigu’,
getName: function(){
	this.name}}

//这个this是值当前对象的this，而不是外层函数的this。
//箭头函数的this指的是创建时的this，即外层函数的this。
//不适合，不是不能
```

# ES6允许参数的初始值{#default-argument}
1. 形参初始值
```javascript
//具有默认值的参数，一般位置靠后。
function add(a,b,c=10){
	return a+b+c
}

result = add(1,2) //这里不用传入c
console.log(result);
```

2. 与解构赋值结合
```javascript
function connect({host,username,password}){
	console.log(host);
	console.log(username);
	console.log(password);
	console.log(port)
}

connect({
	host: ‘localhost’,
	username: ‘root’,
	password: ‘root’,
	port: 3306
})
```

# ES6 rest参数，即省略号 - 参数转数组{#rest}
1. 可以快速获取arguments，而且是数组的形式

```javascript
function date(…args){
	console.log(args); //因为结果是数组，可以用数组方法比如filter some every map
}

date(‘阿娇’,’柏芝’, ‘思慧’)
```

2. rest参数必须放到参数最后

```javascript
function fn(a,b,…args){
console.log(a);
console.log(b);
console.log(args);
}

fn(1,2,3,4,5,6)
```

# ES6扩展运算符 - 数组转参数{#spread-operator}

将[数组]转换为逗号分隔的[参数序列]。

```javascript
//声明一个数组
const tfboys = [‘易烊千玺’, ‘王源’, ‘王俊凯’];

//声明一个函数
function chunwan(){
	console.log(arguments);
}

chunwan(…tfboys); //等同于chunwan(‘易烊千玺,’王源’,’王俊凯’)，1个数组元素变3个参数。
```

## 扩展运算符的运用
1. 数组的合并

```javascript
const kuaizi = [‘王太利’,’肖央’]：
const fenghuang = [‘曾毅’,’玲花’];

//传统方法
//const zuixuanxiaopingguo = kuaizi.concat(fenghuang)

//扩展运算符方法
const zuixuanxiaopingguo = […kuaizi, …fenghuang]

console.log(zuixuanxiaopingguo)
```

2. 数组的克隆

```javascript
const sanzhihua = [‘E’, ‘G’, ‘M’]
const sanyecao = […sanzhihua];
```

3. 将伪数组转化为真正的数组。

```javascript
const divs = document.querySelectorAll(‘div’)
const divArr = […divs];
```
