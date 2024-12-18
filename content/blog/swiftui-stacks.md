+++
title = "SwiftUI的Stacks应用"
date = 2024-12-18
+++

# 种类

 Vstacks -> Vertical
 Hstacks -> Horizontal
 Zstacks -> zIndex (back to front)

# Zstacks要点

## 顺序：最下面的是在最前面。

```swift
        ZStack{
            Rectangle()
                .fill(.red)
                .frame(width: 150, height:150)
            Rectangle()
                .fill(.green)
                .frame(width: 130, height:130)
            Rectangle()
                .fill(.orange)
                .frame(width: 100, height:100)
        }
```

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202412181415204.png)

## ZStack可以替代背景.background()

```swift
ZStack{
	Circle()
		.frame(width: 100, height: 100)

	Text("1")
		.foregroundColor(.white)
}
```

与下列代码一致：

```swift
Text("1")
	.foregroundColor(.white)
	.background(
		Circle()
			.frame(width: 100, height: 100)
	)
```

# 对齐方式和间距

spacing是间距，alignment是对齐方式，有.center, .leading（左对齐）, .trailing（右对齐）；

如果是HStack，对齐方式是.top, .bottom, .center。

如果是ZStack，没有spacing，对齐方式是top, bottom, center, topleading(左上角）等。

```swift
VStack(alignment: .center, spacing: 0)
```
