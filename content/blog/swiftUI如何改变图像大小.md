+++
title = "swiftUI如何改变图像大小"
date = 2025-01-25
authors = ["小中"]
[taxonomies]
tags = ["swiftUI"]

+++

```swift
Image()
	.resizable()
	.aspectRatio(contentMode: .fit)
	//.frame(width: 100, height: 100)
```

# 如何异步展示图像

```swift
AsyncImage()
```
