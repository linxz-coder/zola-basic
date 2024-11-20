+++
title = "AJAX基础知识"
date = 2024-09-27
authors = ["小中"]
+++

# 什么是AJAX
AJAX，即Asynchronous JavaScript and XML。

简单说就是：异步js与xml。

# AJAX不是什么？
不是新的语言，还是用js。只是把现有标准组合在一起的方式。

# AJAX可以干什么？
`无刷新获取数据`：可以在不刷新页面的情况下发送http请求，得到http响应。

`无刷新更新页面`：根据用户事件来更新部分内容。

# AJAX的缺点
1. 没有浏览历史，不能后退
2. 有跨域问题（需要同源）
3. SEO不友好（爬虫是爬不到的）

# AJAX应用示例
1. 注册页面时，检测用户名不可用。
2. 搜索时出现的下拉框和关键字。
3. 鼠标悬停出现二级分类。比如京东购物界面。如果不悬停，不会向服务端发送请求。
这叫`懒加载`：用则加载，不用则不加载.
4. 新闻网站页面滚到底，重新生成新的内容（比如今日头条）。

# AJAX的使用方法
原生方式xhr, jQuery，axios方式、内置fetch方式。
无论是哪些方式，都是对原生方式xhr的封装，为了让请求更简单和易用。
- axios兼容promise风格，更现代化。
- fetch不是第三方库，可以直接使用，方便。


## xhr原生方式
```JavaScript
// 获取button元素
var btn = document.querySelector('button');
// 绑定事件
btn.onclick = function(){
    // 创建xhr对象
    var xhr = new XMLHttpRequest();
    // 初始化：设置请求方法和url
    xhr.open('GET', 'http://127.0.0.1:8000/server?a=100&b=200&c=300', true);
    // 发送请求
    xhr.send();
    // 事件绑定，处理服务端返回结果
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300){ // readystate: 1未初始化 2已经发送 3正在接收 4完成; status: 200+都是成功
            // 1.响应行
            console.log(xhr.status); //状态码
            console.log(xhr.statusText); //状态文本
            // 2.响应头
            console.log(xhr.getAllResponseHeaders());
            // 3.响应体
            console.log(xhr.response);
            // 获取服务端返回的数据
            var data = xhr.responseText; //responseText将响应体变成Text格式
            // 获取result元素
            var result = document.querySelector('#result');
            // 将数据显示到result元素中
            result.innerHTML = data;
        }
    }
}
```

### xhr + Promise
注意,简单的代码，Promise封装会加大代码的复杂度，但是在`无限回调`（回调地狱）的情形下很好用，能把代码组织得更好。

```html
// 实例化promise对象，参数是一个函数，函数有两个参数，一个是成功的回调，一个是失败的回调
const p = new Promise((resolve, reject) => {
    // 异步操作
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.apiopen.top/api/sentences'); //api地址：https://api.apiopen.top/swagger/index.html#/%E5%BC%80%E6%94%BE%E6%8E%A5%E5%8F%A3/get_api_sentences
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                resolve(xhr.responseText);
            } else {
                reject('失败');
            }
        }
    }
});

// then方法，参数是两个函数，第一个是成功的回调，第二个是失败的回调
p.then((value) => {
    console.log(value);
}, (reason) => {
    console.log(reason);
});
```

## axios方式
我总结在[axios基础知识](@/blog/axios_basic.md)。


## fetch方式

注意，用fetch的时候，因为用了`await`方法，函数名必须加上`async`。

因为老版的浏览器不支持`fetch`，因此工作中一般不用，用以上三种`xhr`的方法居多。jQuery被逐渐淘汰，而原生xhr太难用，实际上用`axios`最多。

```JavaScript
try {
    const response = await fetch(`http://localhost:3000/api1/search/users2?q=${KeyWord}`)
    const data = await response.json()
    // console.log(data);
    PubSub.publish('communication', {isLoading:false, users:data.items})
} catch (error) {
    console.log('请求出错了', error);
    PubSub.publish('communication', {isLoading:false, err:error.message})
}
```

可以参考[fetch的使用方法](https://segmentfault.com/a/1190000003810652)。


# async 和 await 方式介绍
这是`ES8`的新特性。也是一种异步编程的解决方案。

async函数的返回值是promise对象。

promise对象的结果由async函数执行的返回值决定。

## async代码示例
```JavaScript
async function fn() {
// 关于promise对象的返回结果：
// 返回的结果只要不是promise对象，都是成功的结果，即Promise状态是resolve/fufilled状态
// 返回的结果是promise对象，才会根据promise对象的状态来决定
    return '成功';
// 返回结果也可以抛出异常，Promise状态是rejected
// throw '失败';
}


const result = fn();
console.log(result);

result.then((value) => {
    console.log(value);
}).catch((reason) => {
    console.log(reason);
});
```

## await表达式

1. await 必须写在 async 函数里。

2. await 右边表达式一般为 Promise 对象

3. await 返回的是 promise 成功的值。

4. await 的 promise 失败了，会抛出异常，需要通过try...catch捕获处理。

### async + await + try catch

```JavaScript
const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve('成功');
        reject('失败');
    }, 1000);
});

// await 要放在 async 函数中
async function main(){
    try{
        let result = await p;
        console.log(result);
    }catch(e){
        console.log(e);
    }
}

// 调用 async 函数
main();
```


