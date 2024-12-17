+++
title = "如何在swiftUI上完成checkbox？"
date = 2024-12-16
+++

如何在swiftUI上完成checkbox？

# 实现方式

需要用Toggle标签来包裹，比如：

```swift
List(data.indices, id: \.self) { index in
    Toggle(data[index].title, isOn: $data[index].done)
         .toggleStyle(CheckboxToggleStyle())
         .frame(height: 60)  // 设置每行高度为 60
}
```

# 样式

## 自定义样式 - 右侧打勾

```swift
import SwiftUI

struct CheckboxToggleStyle: ToggleStyle {
    @State private var isPressed = false  // 添加状态来跟踪点击
    
    func makeBody(configuration: Configuration) -> some View {
        HStack {
            configuration.label
            Spacer()
            
            if configuration.isOn {
                Image(systemName: "checkmark")
                    .foregroundColor(.green)
                    .font(.system(size: 20))
            }
        }
        .frame(height: 60)
        .background(isPressed ? Color.gray.opacity(0.2) : Color.clear)  // 点击时显示灰色背景
        .onTapGesture {
            // 点击时的动画效果
            withAnimation(.easeInOut(duration: 0.1)) {
                isPressed = true
                
                // 0.1秒后恢复
                DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) {
                    withAnimation {
                        isPressed = false
                    }
                }
                
                configuration.isOn.toggle()
            }
        }
    }
}
```

## switch样式 - 经典toggle样式

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202412161536870.png)


## button样式 - 按钮样式

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202412161534416.png)

# 参考

[官方文档](https://developer.apple.com/documentation/swiftui/togglestyle)

[民间参考](https://www.appcoda.com/swiftui-checkbox/)

