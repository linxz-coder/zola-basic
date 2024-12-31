+++
title = "小程序自定义组件"
date = 2024-12-31
+++

# 创建和注册组件

## 组件分类

公共组件：将页面内的功能模块抽取成自定义组件，以便在不同的页面中重复使用

页面组件：将复杂的页面拆分成多个低耦合的模块，有助于代码维护


## 一个组件一个文件夹

如果是公共组件，建议放在项目根目录的 components 文件夹中

如果是页面组件，建议放在对应页面的目录下

建议：一个组件一个文件夹

## 新建公共组件

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202412301030795.png)

创建完还需要注册，才能使用组件。

## 组件注册

全局注册：在 app.json 文件中配置 usingComponents 进行注册，注册后可以在任意页面使用

局部注册：在页面的 json 文件中配置 usingComponents进行注册，注册后只能在当前页面使用

例子：

### 注册

```json
"usingComponents": {
	"custom-checkbox": "../../components/custom-checkbox/custom-checkbox"
}
```

### 使用

```wxml
<custom-checkbox />
```

## 组件的数据和方法

需要在`组件.js`中的`Component`方法中定义。

### 定义数据

```js
Component({
	data: {
		isChecked: false
	}
})
```

### 定义方法

```js
Component({
	methods: {
		updateChecked(){
			this.setData({
				isChecked: !this.data.isChecked
			})
		}
	}
})
```

## 组件的属性

Properties属性


```js
Component({
	properties: {
		//label: String //简写方式
		label: {
			type: String,
			value: ''      //初始值
		}
	}
})
```

### 获取属性

```js
console.log(this.properties.label)
```


