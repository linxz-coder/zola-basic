+++
title = "如何改变menu里面图标SystemImage的颜色？- SwiftUI"
date = 2025-02-11
authors = ["小中"]
[taxonomies]
tags = ["swiftUI"]

+++

# 背景

今天我在做一个Mac App，里面涉及一个`右键点击`的菜单。

因为涉及二级菜单，所以我在`contextMenu`里面加了一层`Menu`

```swift
.contextMenu{
	Menu {
		ForEach(categories) { category in
			Button{
				// do something
			} label: {
				HStack {
                                Image(systemName: "folder.fill")
                                Text(category.title)
                            }
			}
			.labelStyle(.titleAndIcon)
		}
	} label: {
		     HStack {
                    Image(systemName: "folder")
                    Text("Move to...")
                }	
	}
	.labelStyle(.titleAndIcon)
}
```

# 问题

我需要修改文件夹，即` Image(systemName: "folder.fill")`的颜色，根据AI的指示，使用.foregroundStyle或者.tint，或者.background都不行。

# 解决方案

最终，我在StackOverflow找到了[参考答案](https://stackoverflow.com/questions/75259468/how-to-change-color-of-image-within-swiftui-picker-menu-item)

**写两个color就行** ，系统会自动取第一个。

不确定这个是否是SwiftUI的BUG，竟然这么奇怪。

示例代码：

`.foregroundStyle(.blue, .red)`

如果不是`systemImage`的话，需要用到`.renderingMode(.template)`，[Medium的参考答案](https://medium.com/@randomdinodev/changing-the-image-icon-color-in-a-label-d6ad1df4202f)
