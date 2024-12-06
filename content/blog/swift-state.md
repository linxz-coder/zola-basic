+++
title = "SwiftUI变量state设置步骤"
date = 2024-12-06
+++

# state标注

改变后需要重新渲染的变量使用@state标注，如果是object则用@StateObject。

```swift
@State var showingSettings = false
@StateObject var viewModel = ContentViewModel()
```

# class添加ObservableObject的protocol

```swift
class ContentViewModel: ObservableObject {
}
```

# 需要暴露的变量，使用@Published

```swift
class ContentViewModel: ObservableObject {
	@Published var title = ""
}
```

