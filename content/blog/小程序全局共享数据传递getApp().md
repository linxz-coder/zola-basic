+++
title = "小程序全局共享数据传递getApp()"
date = 2025-01-03
authors = ["小中"]
[taxonomies]
tags = ["小程序"]

+++

需要用`getApp()`方法

在app.js里面定义

```js
App({
	// 全局共享数据
	globalData: {
		token: ''
	},
	
	// 全局共享方法
	setToken(token){
		this.globalData.token = token
	}
})
```

页面.js使用token:

```js
cosnt appInstance = getApp()

Page({
	login(){
		appInstance.setToken('adfgefwefw')
	}
})
```

验证一下token是否变化：

到新页面.js上：

```js
cosnt appInstance = getApp()

Page({
	onLoad(){
		console.log(appInstance.globalData.token)
	}
})
```
