+++
title = "uni-app组件知识"
date = 2025-01-07
authors = ["小中"]
[taxonomies]
tags = ["uni-app"]

+++

# 标签（组件）

view标签和text标签区别。

text标签可以选中文字（增加`selectable`属性），但是view不支持选中文字。

# scroll-view

scroll-x 允许横向滚动

scroll-y 允许纵向滚动

## 元素同一行显示，不换行

```css
.scrollView{
	white-space: nowrap; /*不换行*/
	.box{
		display: inline-block /*同一行显示，block指分行显示*/
	}
}

## 使用scss

```vue
<style lang="scss">
</style>
```

# swiper

横向轮播图效果

```vue
<swiper>
	<swiper-item></swiper-item>
</swiper>
```

## 占用屏幕所有宽度

```css
swiper{
	width: 100vw; /*高度是vh*/
}
```
