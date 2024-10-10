+++
title = "前端面试题-['1', '2', '3'].map(parseInt) 的结果？"
date = 2020-09-03
+++

[‘1’, ‘2’, ‘3’].map(parseInt)的结果是？

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/js-map1.png)

# 直觉答题思路

我是一名前端，map( )和parseInt( )再熟悉不过了。

map( )是新建一个数列，parseInt( )是将字符串转换成数字。

因此[‘1’, ‘2’, ‘3’].map(parseInt)的结果就是：

[1, 2, 3] （配上一脸自信）

答案马上出来——错！运用你的逻辑！

# parseInt，我对你的理解不够深

咦，为啥？

翻开[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt)，parseInt是有两个参数（arguements）的，所以一般用到parseInt的时候，应该是parseInt (item, radix)。

为什么我们平时用parseInt就直接忽略了第二个参数radix，比如我们要转换‘’100‘’，直接就输入parseInt(“100”)，结果就是100。

# 万恶的radix

噔噔！我们又翻开[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt)，如果我们没有指定radix的值，JavaScript会假定以下情况：

> 1.如果输入的 string以 “0x”或 “0x”（一个0，后面是小写或大写的X）开头，那么radix被假定为16，字符串的其余部分被当做十六进制数去解析。

> 2.如果输入的 string以 “0”（0）开头， radix被假定为8（八进制）或10（十进制）。具体选择哪一个radix取决于实现。ECMAScript 5 澄清了应该使用 10 (十进制)，但不是所有的浏览器都支持。因此，在使用 parseInt 时，一定要指定一个 radix。

> 3.如果输入的 string 以任何其他值开头， radix 是 10 (十进制)。

因此，在我们一般没有输入radix值的情况下，一般情况下就是返回十进制的数字，通常就是我们想要的结果。

且慢，这不就对了吗？[‘1’, ‘2’, ‘3’].map(parseInt)中，我们并没有赋值给第二个参数radix啊，map方法形成了新的数列，所以按照十进制结果就是1、2、3呀！

# 万恶的第二个赋值

问题就在“我们并没有赋值给第二个参数”，我们很容易遗忘了，其实数列自带两个参数，一个是字符串（string），一个是索引（index），我们在创造新的数列的同时，悄悄地把索引（index）赋值给了parseInt。

# 逻辑解题

我们看一下逻辑性解题思路：

[‘1’, ‘2’, ‘3’].map(parseInt) 的分步计算——

parseInt(‘1’, 0) -> 1

因为Array的index = 0, 返回十进制的1

parseInt(‘2’, 1) -> NaN

因为Array的index = 1, 返回一进制的2，因为一进制（eg. 1111）里面没有2，则返回NaN

parseInt(‘3’, 2) -> NaN

因为Array的index = 2, 返回二进制的3，因为二进制(eg. 101011)里面没有3，则返回NaN

因此，原题的结果应该是

`[1, NaN, NaN]`

# 再一个例子

我们再看一个例子

[‘10’, ‘10’, ‘10’].map(parseInt) 的分步计算——

parseInt(‘10’, 0) -> 10

因为Array的index = 0, 返回十进制的10

parseInt(‘10’, 1) -> NaN

因为Array的index = 1, 返回一进制的10，因为一进制（eg. 111）里面没有10，则返回NaN

parseInt(‘10’, 2) -> 2

因为Array的index = 2, 返回二进制的’10’，因为二进制转（十进制）数字(‘10’ = 0x2^0+1×2^1= 2)，则返回2

因此，结果就是`[10, NaN, 2]`

所以，只要不指定第二个参数radix，JavaScript就会寻找可能替代的第二个元素，偷偷给我们加上去。因此，上面引用的MDN文件中，有一句话请大家一定要记住——在使用 parseInt 时，`一定要指定一个 radix`！！！

# 拓展阅读

我们如何解决以上的问题，即如何让数列中的数字等于字符串的数字？

## 方法一：指定输入的参数

如：
```javascript
[‘1’, ‘2’, ‘3’].map( str => parseInt(str) );
```

## 方法二：使用Number函数，避开parseInt函数
```javascript
[‘1’, ‘2’, ‘3’].map(Number);
```

## 方法三：方法一变形
```javascript
function returnInt(element) {

  return parseInt(element, 10);

}

[‘1’, ‘2’, ‘3’].map(returnInt);
```

注意：方法二可能输出小数点或者其他非正常数字的情况，比如2.33333333或10e+20，因此还是推荐方法一和三，方法一毕竟是ES6方法，懒人必备，推荐！！

## 参考链接

[Array + parseInt()的MDN解释](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map#%E4%BD%BF%E7%94%A8%E6%8A%80%E5%B7%A7%E6%A1%88%E4%BE%8B)

[parseInt()的MDN解释](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt)

[Github 上对本题的讨论](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/4)

[进制转换工具](https://tool.oschina.net/hexconvert)

## 图片来源
[pixabay](https://pixabay.com/vectors/frontend-development-web-technology-4342425/)