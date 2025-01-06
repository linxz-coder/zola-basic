+++
title = "uni-app小程序预览图片功能"
date = 2025-01-06
authors = ["小中"]
[taxonomies]
tags = ["uni-app"]

+++

在uni-app使用`uni.previewImage`，如果只开发小程序，可以用`wx.previewImage`。

```vue
<template>
<swiper indicator-dots circular autoplay>
	<swiper-item v-for="item in pictures" :key="item.id">
		<image @tap="onPreviewImage(item.url)" :src="item.url"></image>
	</swiper-item>
</swiper>
</template>

<script>
	data(){
		return{
			pictures: [
				{ id: '1', url: 'https://xxxx'},
				...
			]
		}
	}

	methods: {
		onPreviewImage(url){
			uni.previewImage({
				urls: this.pictures.map(v=>v.url),
				current: url
			})
		}
	}
</script>

```
