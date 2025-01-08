+++
title = "vue监听事件event"
date = 2025-01-08
authors = ["小中"]
[taxonomies]
tags = ["vue"]

+++

指令为`v-on:click="handler"`，简写为`@click="handler"`

如果是uni-app小程序，除了`@click`，还可以写成`@tap="handler"`更直观。

代码：

```vue
<template>
	<view @click="onClick"></view>
</template>

<script setup>
function onClick(){
	console.log("click!");
}
</script>
```

有什么事件可以用？事件映射表

```json
// 事件映射表，左侧为 WEB 事件，右侧为 ``uni-app`` 对应事件
	{
		click: 'tap',
		touchstart: 'touchstart',
		touchmove: 'touchmove',
		touchcancel: 'touchcancel',
		touchend: 'touchend',
		tap: 'tap',
		longtap: 'longtap', //推荐使用longpress代替
		input: 'input',
		change: 'change',
		submit: 'submit',
		blur: 'blur',
		focus: 'focus',
		reset: 'reset',
		confirm: 'confirm',
		columnchange: 'columnchange',
		linechange: 'linechange',
		error: 'error',
		scrolltoupper: 'scrolltoupper',
		scrolltolower: 'scrolltolower',
		scroll: 'scroll'
	}

```

# 开关switch元素

根据switch的值改变其他元素的值。

```vue
<template>
	<switch checked @change="onChange" />
	<button type="primary" :loading="isLoading">按钮</button>
</template>

<script setup>
import {ref} from 'vue';

const isLoading = ref(false)

function onChange(e){
	isLoading.value = e.detail.value
}
</script>
```
