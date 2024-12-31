+++
title = "小程序渲染markdown和html"
date = 2024-12-31
+++

[小程序渲染markdown-mp-html](https://jin-yufeng.github.io/mp-html/#/advanced/plugin?id=markdown)

# 下载文件

[github-clone地址](https://github.com/jin-yufeng/mp-html)

# 支持markdown显示

# 支持插件

下载后tools - config.js

将markdown支持启用

[官方文档](https://jin-yufeng.github.io/mp-html/#/advanced/plugin?id=use)

# 重新打包

```bash
npm install
npm run build:weixin
```

[参考教程](https://juejin.cn/post/7140607490407792677)


# 使用

复制`dist`文件夹里面需要的包，比如我需要的是微信小程序，就复制`mp-weixin`到components就可以了。

## 注册component

在`app.json`里面注册组件

```json
"usingComponents" : {
	  "mp-weixin": "./components/mp-weixin/index"
}
```

## 组件使用

markdown属性开启markdown预览

use-anchor支持目录跳转

```wxml
<mp-weixin use-anchor markdown content="{{content}}" />
```



