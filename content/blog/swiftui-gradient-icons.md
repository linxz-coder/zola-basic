+++
title = "SwiftUI图标和渐变"
date = 2024-12-24
+++

# swiftui如何使用渐变gradient

```swift
RoundedRectangle(cornerRadius: 25)
            .fill(
                LinearGradient(gradient: Gradient(colors: [Color.teal, Color.blue]), startPoint: .topLeading, endPoint: .trailing)
}
```

# swiftui如何使用icons

改变大小的三种方法：.font(.largeTitle), .font(.system(size:100)), .resizable().scaledToFit().frame()

```swift
//MARK: - 大小
// .font(.largeTitle)
    
// .font(.system(size: 100))
    
    .resizable()
//  .aspectRatio(contentMode: .fit)
    .scaledToFit()
    .frame(width: 300, height: 300)
    
//MARK: - 颜色
    .foregroundStyle(.green)
    }
```

## 使用原彩色icon

```swift
.symbolRenderingMode(.multicolor)
```
