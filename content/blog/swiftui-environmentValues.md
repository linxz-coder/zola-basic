+++
title = "SwiftUI的环境变量EnvironmentValues"
date = 2024-12-19
+++

`用于共享系统提供的变量，修改系统配置如黑夜模式、退出页面等`

@Environment：适用于访问系统提供的、或父视图通过 .environment() 提供的环境值，通常是一些比较简单的数据（如颜色模式、语言环境等），它不需要显式的对象创建，而是自动获取。


# dismiss()代码示例

用于立即退出当前编辑页面

```swift
@Environment(\.dismiss) private var dismiss

 .navigationBarItems(
                leading: Button("取消") {
                    dismiss()
                }
```

[dismiss-environmentValues官方参考网址](https://developer.apple.com/documentation/swiftui/environmentvalues/dismiss)

# 与@EnvironmentObject的区别

@EnvironmentObject：适用于传递和共享自定义的、复杂的对象状态，通常是一些全局的、跨越多个视图共享的状态。你需要显式地注入对象并使用它。

## 用法

@EnvironmentObject 更适合于共享复杂的应用状态，而 @Environment 主要用于系统环境信息和较轻量级的共享数据。


