+++
title = "SwiftUI的基础形状和颜色"
date = 2024-12-22
+++

# 颜色

```swift
struct ColorsBootcamp: View {
    var body: some View {
        RoundedRectangle(cornerRadius: 25)
            .frame(width: 300, height: 200)
//            .foregroundStyle(.primary)
        //MARK: - UIColor => Color from UIKit
//            .foregroundStyle(Color(uiColor: .secondarySystemBackground))
        //MARK: - 自定义颜色
            .foregroundStyle(.custom)
        //MARK: - 阴影
            .shadow(radius: 10)
            .shadow(color: .custom.opacity(0.3) ,radius: 10, x: -20, y: -20)
    }
}
```

# 形状

```swift
struct ShapesBootcamp: View {
    var body: some View {
        //MARK: - 圆形
        //        Circle()
        //填充
        //            .fill(.red)
        //            .foregroundStyle(.blue)
        
        //描边
        //            .stroke()
        //            .stroke(Color.red, lineWidth: 20)
        
        //半圆
        //            .trim(from: 0.5, to: 1)
        
        //MARK: - 椭圆形
//        Ellipse()
//            .frame(width: 200, height: 100)
        
        //MARK: - 胶囊形状
//        Capsule(style: .circular)
//            .frame(width: 200, height: 100)
        
        //MARK: - 矩形
//        Rectangle()
        
        //MARK: - 圆角矩形（文本框）
        RoundedRectangle(cornerRadius: 10)
            .frame(width: 300, height: 200)
    }
}
```
