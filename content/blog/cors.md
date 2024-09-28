+++
title = "什么是同源和跨域请求CORS"
date = 2024-09-29
+++

# 同源
Same-Origin Policy，最早是Netscape公司提出，是浏览器的安全策略。

同源： `协议`、`域名`、`端口号`必须完全相同。

所以，localhost:3000 和 localhost:3001 是不同源的。

# 跨域

违背同源策略就是`跨域`。

ajax是默认遵循同源策略的，即跨域就没法发送请求。

# 解决跨域问题
一般有两种方法：第一种是服务端设置`CORS`，第二种是使用`JSONP`。

## CORS
官方推荐。

CORS是Cross-Origin Resource Sharing的缩写，跨域资源共享。

这是官方解决方案。不需要客户端操作，完全服务器来做。方法是新增一组HTTP头，允许服务器声明哪些源站可以通过浏览器有权限访问哪些资源。

比如：
```javascript
response.setHeader('Access-Control-Allow-Origin', '*'); 
```

这些HTTP响应头有多个选择，可以参考[MDN-CORS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS)。

## JSONP
不推荐。

JSONP是JSON with Padding的缩写，非官方解决方案，程序员自己开发出来的，只支持GET请求。

它利用script标签来实现跨域。因为script标签生来就可以跨域，没有条件。

实现起来比较麻烦，需要客户端声明函数，服务器端返回这个函数调用，最后客户端执行这个函数。

具体实现方法可以看我的[github仓库](https://github.com/linxz-coder/AJAX-tutorial/tree/main/%E8%B7%A8%E5%9F%9F/JSONP)。