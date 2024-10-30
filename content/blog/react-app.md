+++
title = "如何开始一个react项目"
date = 2024-10-18

+++

官方推荐以框架开始，比如`nextjs`。但是，为了学习，我这里介绍的是纯血`react`开场。

# 为什么要用react?
简单来说，就是大家都用呗。

复杂来讲，为什么大家用呢？因为react对前端页面渲染相对于传统JS更高效。利用了`虚拟DOM技术+diffing算法`，传统JS用的是`真实DOM`技术。

真实DOM的缺点是：不能复用之前的数据，每一次都是刷新重新来。

![real-DOM](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202410231111766.png)

虚拟DOM：复用了原来的DOM，只需要渲染改变的那个数据。

![virtual-DOM](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202410231112734.png)

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
### 传统方式
兄弟给父传递，参照【子传父】，再由父传递给另一个兄弟，参照【父传子】。

### PubSub工具
任意两个组件的沟通，都可以借助[PubSub工具](https://github.com/mroderick/PubSubJS)。

### 安装

```bash
yarn add pubsub-js
```

### 使用

接收数据方`订阅Subscribe`，发送数据方`发布Publish`即可。

假设\<List>组件是接收方，\<Search>组件是发送方。

我们先看\<List/>组件：

```javascript
import PubSub from 'pubsub-js'

state = {// 初始化状态
users:[], //users初始值为数组
isFirst:true, //是否为第一次打开页面
isLoading:false, //标识是否处于加载中
err:'' //存储请求相关的错误信息
}

componentDidMount() {
// _表示不使用这个参数，这个参数是msg，现在只是占位。
this.token = PubSub.subscribe('communication', (_,stateObj)=>{
   console.log('List组件收到数据了', stateObj);
    this.setState(stateObj)
})
}

componentWillUnmount() {
PubSub.unsubscribe(this.token)
}
```

基本思路：
1. 组件加载时，订阅组件，取好订阅的名称，比如`communication`，确定接收到的数据，比如`stateObje`，setState改变状态。
2. 组件卸载时，删除订阅。
3. 格式是`PubSub('name',data)`。
4. 数据state放在订阅方。

再看\<Search/>组件：

```javascript
import PubSub from 'pubsub-js'

// 发送请求前通知List更新状态
PubSub.publish('communication', {isFirst:false, isLoading:true})

/* 发送api请求，比如axios */
// 发送请求前通知List更新状态
PubSub.publish('communication', {isFirst:false, isLoading:true})
// 发送网络请求
axios.get(`http://localhost:3000/api1/search/users?q=${KeyWord}`).then(
  response => {
    // 请求成功后通知List更新状态
    PubSub.publish('communication', {isLoading:false, users:response.data.items})
  },
  error => {
    console.log('失败了', error)
    // 请求失败后通知List更新状态
    PubSub.publish('communication', {isLoading:false, err:error.message})
  }
)
```

格式是`PubSub.publish('name', data)`。

# react实现路由route页面切换

思路：

- 明确导航区和展示区。

- 导航区的a标签改为Link标签；展示区Route标签进行路径的匹配。

- 最外层套一层BrowserRouter就行。

注意：
1. 路由组件比如\<About />要放在`pages`文件夹，而不是`components`文件夹

2. 如果需要点击高亮，不用Link标签，用NavLink标签。

## 安装react-router-dom库
安装方法可以见[react-router-dom官方文档](https://reactrouter.com/en/main/router-components/browser-router)，用`yarn`安装：

```bash
yarn add react-router-dom
```

## 使用react-router-dom

### 在最外层包一层\<BrowserRouter>
打开`index.js`，包在最外层：

```javascript
// 引入react-router-dom库
import { BrowserRouter } from 'react-router-dom';


// 渲染App组件到页面
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode> {/* StrictMode检查React代码不合理的地方 */}
      <App />
    </React.StrictMode>
  </BrowserRouter>
);
```

### 在父组件中使用routes

```javascript
import { Link, Route, Routes } from 'react-router-dom'

{/* 在React中靠路由链接实现切换组件 */}
{/* 编写路由链接 */}
<Link className="list-group-item" to="/about">About</Link>
<Link className="list-group-item" to="/home">Home</Link>

{/* 注册路由 */}
<Routes>
    <Route path="/about" element={<About />} />
    <Route path="/home" element={<Home />} />
</Routes>
```

这样就可以实现多页面的切换了。

### 高亮标签
使用NavLink标签，示例代码：

```javascript
import { NavLink, Route, Routes } from 'react-router-dom'

<NavLink className={({isActive}) => 'list-group-item' + (isActive ?' atguigu' : '')} to="/about">About</NavLink> 
<NavLink className={({isActive}) => 'list-group-item' + (isActive ?' atguigu' : '')} to="/home">Home</NavLink>
```

### BrowserRouter和HashRouter

两者都可以用。HashRouter的路径会带井号#。比如localhost:3000/#About

区别是井号#后面的值是哈希值，是不会作为资源发送给服务器的。一般用BrowserRouter就可以。

# 如何测试react的上线效果？
我们用`serve`这个库就行。

全局安装：

```javascript
npm i serve -g
```

生成build文件：

```javascript
npm run build
```

在项目路径下使用serve命令：

```javascript
serve build
```

这样，就能在本地3000或者5000端口来模拟服务器运行网站的效果了。
