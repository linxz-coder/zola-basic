+++
title = "Promise从入门到精通"
date = 2024-10-21
+++

# Promise是什么？

是ES6引入的异步编程的新解决方案。

旧解决方案是`回调函数`。

从语法来说，是一个`构造函数`，可以`用来实例化对象`。

从功能来说，Promise对象可以封装一个异步操作，获取成功或失败的结果。

# Promise好处
Promise支持链式调用，解决`回调地狱`问题。还可以指定多个回调函数。

# 异步编程举例
- fs文件操作
- 数据库操作
- AJAX网络请求
- 定时器setTimeOut

# 回调函数方式

```javascript
require(‘fs’).readFile(‘./index.html’, (err.data)=>{})
```

容易造成`回调地狱`：代码不断套娃，套多个回调任务。特点是不利于阅读、不利于错误处理。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202410212347439.png)

# Promise代码示例

```javascript
 // Promise
// resolve 成功的回调函数, reject 失败的回调函数
let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        // 获取从1-100的一个随机数
        let n = rand(1, 100);
        // 判断是否中奖
        if(n <= 30){
            resolve(); //将promise状态设置为成功
        }else{
            reject(); //将promise状态设置为失败
        }
    }, 1000);
});

// then方法
p.then(() => {
    alert('恭喜恭喜，奖品为 10万 RMB');
}, ()=>{
    alert('很遗憾，未中奖');
});
```

## then方法的链式回调
说明：Promise.prototype.then()通常是跟着一个异步任务，异步任务后面也可以跟异步任务。这样就是解决`回调地狱`的问题。

```javascript
// then方法的链式回调
p.then((value) => {
    console.log(value);
    return '第一个then的返回值';
}).then((value) => {
    console.log(value);
    return '第二个then的返回值';
}).then((value) => {
    console.log(value);
});
```

## catch方法
指定失败状态返回的值。

```javascript
const p = new Promise((resolve, reject) => {
   setTimeout(() => {
        //设置p对象的状态为失败，并设置失败的值
       reject('失败');
   }, 1000);
});

//catch方法，参数是一个函数，函数的参数是失败的值
p.then((value) => {
    console.log(value);
}).catch((reason) => {
    console.warn(reason);
});
```

# 视频教程
1. [尚硅谷-Promise从入门到精通教程](https://www.youtube.com/watch?v=FtXEUgiPUiM&list=PLmOn9nNkQxJF-I5BK-wNUnsBkuLXUumhr&index=4)。

2. [尚硅谷-ES6 Promise部分教材](https://www.youtube.com/watch?v=XVf_o9sPKfM&list=PLmOn9nNkQxJFlj86lvBSpC2UsNw-pdmdq&index=28)
