+++
title = "swiftUI的文本框TextField的最小实现"
date = 2024-12-11
+++

@State var 定义的是Binding\<String>，即双向连接，方便在视图之间共享和同步数据。使用时需要带$符号。

可以理解成React里面的`useState`。

```swift
struct ContentView: View {
    @State var text = ""
    
    var body: some View {
            TextField("Title", text:$text)
                .font(.largeTitle)
                .multilineTextAlignment(.center) // 文本内容居中
    }
}
```
