+++
title = "SwiftUI的提示框alert"
date = 2024-12-23
+++

# alert的基本用法

## 基本样式：标题+描述+默认OK按钮

```swift
Button{
.alert("title", isPresented: $showAlert){
} message: {
	Text("This is the alert message")
}
```

## 扩展样式：自定义按钮

```swift
.alert("Some Alert", isPresented: $showAlert) {
    Button("Cancel", role: .cancel){
    }
    Button("Delete", role: .destructive) {
        backgroundColor = .red
    }
} message: {
    Text("What do you want?")
    }
```

