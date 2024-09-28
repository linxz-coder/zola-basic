+++
title = "如何用node.js搭建一个简单的服务器且自动重启刷新-nodemon"
date = 2024-09-28
+++

我们会用到Express框架，它是基于nodejs平台的web框架，可以用来架设服务器。

注意，先要安装node.js，安装方法可以参考官网。我一般用homebrew安装，命令如下：

```bash
brew install node
```

## 安装express
```bash
npm i -g express
```

## 创建一个npm项目
```bash
npm init -yes
```

这样，会生成一个package.json文件，里面包含了项目的基本信息。

## 编写server.js
```javascript
// 引入express
const express = require('express');

// 创建express实例
const app = express();

// 创建路由规则
// request是对请求报文的封装
// response是对响应报文的封装
app.get('/', (request, response) => {
    // 设置响应
    response.send('Hello Express');
})

// 监听端口启动服务
app.listen(8000, () => {
    console.log('服务已启动，8000端口监听中');
    }
)
```

## 启动服务器
```bash
node server.js
```
## 实时刷新服务器
在使用服务器的过程中，我还有`实时刷新`的需求，这样可以在修改代码后，不用重启服务器，就可以看到效果。这时候，我们可以使用[nodemon](https://github.com/remy/nodemon)，它可以监视文件的变化，自动重启服务器。

## 安装nodemon
```bash
npm install -g nodemon
```

## 用nodemon启动服务器
```bash
nodemon server.js
```

这样，server.js文件一旦发生变化，不用你手动重启服务器，nodemon会自动帮你重启。

