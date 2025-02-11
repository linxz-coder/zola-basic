+++
title = "SwiftUI设计可折叠(伸缩)的Section"
date = 2025-02-11
authors = ["小中"]
[taxonomies]
tags = ["swiftUI"]

+++

如果侧边栏信息过多，可以选择用`可折叠菜单`, 主要参数是`isExpanded`

```swift
Section(isExpanded: $isExpanded){
	Text("Item 1")
	Text("Item 2")
	Text("Item 3")
}
```

或者用`DisclosureGroup`

```swift
DisclosureGroup("DisclosureGroup"){
	Text("Item 1")
	Text("Item 2")
	Text("Item 3")
}
```
