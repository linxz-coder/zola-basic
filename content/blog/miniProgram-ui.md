+++
title = "微信小程序ui库"
date = 2024-12-31
+++

# weui

[github仓库地址](https://github.com/Tencent/weui/blob/master/README_cn.md)

[效果预览](https://github.com/Tencent/weui/wiki)

# vant weapp

有赞团队的开源ui组件库

[使用视频教程](https://www.bilibili.com/video/BV1LF4m1E7kB?t=652.9&p=78)

[项目地址](https://vant-ui.github.io/vant-weapp/#/home)

需要在app.json中删掉`style:v2`的配置项。即不使用微信最新的ui样式。

在app.json引入组件

```json
"usingComponents": {
  "van-image": "@vant/weapp/image/index"
}
```

直接使用标签即可，可以参考[教程](https://vant-ui.github.io/vant-weapp/#/image)

```json
<van-image width="100" height="100" src="https://img.yzcdn.cn/vant/cat.jpeg" />
```

## 修改样式

### 要加!important

```css
.van-button--primary {
  font-size: 50rpx !important;
  background-color: lightgreen !important;
}
```

### 自定义组件中修改样式

需要接触样式隔离，设置成shared

```js
Component({
	options: {
		styleIsolation: ''
	}
})
```

### 可以直接用外部样式类

```wxml
<van-button custom-class="custom-class">
```

自己在wxss文件再定义.custom-class就可以了，记得加!important

### 批量修改组件样式 - 使用css变量

app.wxss定义

```css
page{
	--color: lightgreen;
}
```

使用变量

```css
background-color: var(--color) !important
```
