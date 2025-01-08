+++
title = "vue列表渲染vue-for"
date = 2025-01-08
authors = ["小中"]
[taxonomies]
tags = ["vue"]
+++

# 数组用法 - template标签内

```vue
<view v-for="(item,index) in 10" :key="index">v-for用法</view>
```

# 对象用法- template标签内

```vue
<view v-for="item in nba" :key="item.id">v-for对象用法</view)
```

# 列表用法

```vue
<ul>
	<template v-for="item in items">
		<li>{{ item.msg }}</li>
	</template>
</ul>
```

# 为什么key要用id?

删除数组后元素会错位。

[视频讲解](https://www.bilibili.com/video/BV1Yg4y127Fp?t=576.2&p=19)