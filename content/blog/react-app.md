+++
title = "如何开始一个react项目"
date = 2024-10-18
+++

官方推荐以框架开始，比如`nextjs`。但是，为了学习，我这里介绍的是纯血`react`开场。

# 使用npm或者yarn开始

## yarn安装
推荐yarn，因为经过测试，速度比较快：
```bash
yarn create react-app your-app-name
```

## npm安装
推荐npx来安装，比较快：
```bash
npx create-react-app your-app-name
```

如果失败了，可以换成国内源，但我测试下来，并没有帮助。老老实实用`yarn`就好了。

# react项目结构
最重要的是`public`和`src`文件夹。一个典型的react项目：

![react-structure](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202410182328992.png)

## public负责所有网站静态资源
包含网站页签图标favicon、主页面index.html、所有css文件、图片等

## src负责主要代码
包含App.jsx(也可以是.js或.ts或.tsx), App.css,index.css, index.js(入口文件）,components等文件

# react怎么访问跨域的服务器？
跨域指不同源，比如3000端口访问5000端口的服务器。

方法：

新建文件`setupProxy.js`（注意：名称不能变）在`src`文件夹下，添加以下代码：

```bash
const {createProxyMiddleware} = require("http-proxy-middleware");

module.exports = function(app){
    app.use(
      '/api1',
      createProxyMiddleware({
        target:'http://localhost:5000',
        changeOrigin:true,
      })
    );
}

说明：所有访问3000/api1的都会重定向到5000端口上，因此避免了跨域问题。

这个办法是通过`同源`策略来保证访问到服务器，跨域方法还可以在服务端设置CORS，可查看[跨域和同源介绍](@/blog/cors.md)。
