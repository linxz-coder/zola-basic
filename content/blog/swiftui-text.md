+++
title = "SwiftUI的文字设计"
date = 2024-12-21
+++

包括所有的文字设计，包括加粗、下划线、对齐等。

```swift
import SwiftUI

struct TextBootcamp: View {
    var body: some View {
        Text("Hello, World!This is a good place to stay. Welcome you. Here is good.")
            //加粗的两种方式
            .font(.title)
            .bold()
        
            //下划线
            .underline(color: .red)
        
            //斜体
            .italic()
        
            //删除线
            .strikethrough(color: .green)
        
            //对齐方式
            .multilineTextAlignment(.leading)
        
            //自定义字体和大小
            .font(.system(size: 24, weight: .bold, design: .monospaced))
        
            //颜色
            .foregroundStyle(.gray)
        
            //文本框
            .frame(width: 200, height: 100, alignment: .leading)
            //文本框的字体自适应
            .minimumScaleFactor(0.2)
    }
}

#Preview {
    TextBootcamp()
}
```
