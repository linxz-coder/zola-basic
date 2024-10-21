+++
title = "Promise从入门到精通"
date = 2024-10-21
+++

# Promise是什么？

是ES6引入的异步编程的新解决方案。

旧解决方案是`回调函数`。

从语法来说，是一个构造函数。

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

# 视频教程
点击观看[Promise从入门到精通]教程(https://www.youtube.com/watch?v=FtXEUgiPUiM&list=PLmOn9nNkQxJF-I5BK-wNUnsBkuLXUumhr&index=4)。

