+++
title = "vue条件渲染if..else..."
date = 2025-01-08
authors = ["小中"]
[taxonomies]
tags = ["vue"]

+++

v-if, v-else-if, v-else属性控制。

注意，这几个元素之间不能插入其他元素，否则会报错。

```vue
<template>
	<view class="">
		<view v-if="num===1">老大</view>
		<view v-else-if="num===2">老二</view>
		<view v-else>老三</view>
	</view>
</template>

<script setup>
	import {ref} from 'vue';
	const num = ref(3)
</script>
```

# 与v-show的区别

v-if不满足条件，不会出现在dom界面，节省加载资源的时间；

v-show不满足条件，还是会出现，用`display:none`的方式隐藏，因此也会加载资源。

# 如果不想影响页面结构

可以用`<template>`标签包裹，和微信开发平台的`<block>`标签是一样作用的，不会在dom显示出来结构。


