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

## 在package.json里面添加proxy

在package.json文件添加以下代码：

```bash
"proxy": "http://localhost:5000"
```

修改前端代码改向3000端口请求：

```bash
 axios.get('http://localhost:3000/students').then(
      // 成功的回调
      response => {console.log('成功了', response.data)},
      // 失败的回调
      error => {console.log('失败了', error)}
    )
```

这个方法通过直接重定向3000请求到5000，解决跨域请求的问题。但是只能用一个服务器，如果有多个跨域服务器请求，就用以下`setupProxy`的方式。

## setupProxy

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
```

说明：所有访问3000/api1的都会重定向到5000端口上，因此避免了跨域问题。

这个办法是通过`同源`策略来保证访问到服务器，可参考[官方文档](https://create-react-app.dev/docs/proxying-api-requests-in-development/)，跨域方法还可以在服务端设置CORS，可查看[跨域和同源介绍](@/blog/cors.md)。

# 如何确定state/useState放在哪里？
1. 如果数据只在某个组件用，就放到自身的state里面。
2. 如果数据是共用的，就放到父组件的state里面。官方称此为`状态提升`。

比如下图中的数据state，是子组件components中`Search`和`List`共用的，就放到父组件App里面。

![react-state](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202410190715180.png)

## 方法function放在哪里？
状态state在哪里，方法就在哪里。

# 组件间通信
## 父传子
通过props传递。
## 子传父
通过props传递，要求父提前给子传递一个函数。
## 兄弟组件传递
兄弟给父传递，参照【子传父】，再由父传递给另一个兄弟，参照【父传子】。
