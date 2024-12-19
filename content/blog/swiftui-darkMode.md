+++
title = "SwiftUI如何调试暗夜模式Dark Mode？"
date = 2024-12-19
+++

# 查看暗夜模式

手机下的小按钮 - ColorScheme

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202412191525492.png)

# SwiftUI如何开启明暗两个模式预览？

写两个Preview代码即可

```swift
#Preview {
    DarkModeBootCamp()
        .preferredColorScheme(.dark)
}

#Preview {
    DarkModeBootCamp()
        .preferredColorScheme(.light)
}
```

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202412191547709.png)

# 处理暗夜模式的三种颜色方案

## PRIMARY颜色属性

`.primary` 

默认情况下，在白色背景下是黑色，在黑色背景下是白色

`.secondary`

一直是灰色

[颜色层次的知识](https://medium.com/@mark.moeykens/how-to-use-hierarchical-styles-in-swiftui-with-colors-2578f3f94a18)

## 添加ColorSet

Assets - 右键添加ColorSet - 打开inspectors窗口 - 选择白天暗夜的颜色 

颜色会全局自适应。

## 使用EnviromentValue - colorScheme

```swift
@Environment(\.colorScheme) private var colorScheme

Text("This color is locally adaptive!")
                        .foregroundStyle(colorScheme == .light ? .green : .yellow)
```

## 代码参考：

```swift
import SwiftUI

struct DarkModeBootCamp: View {
    
    @Environment(\.colorScheme) private var colorScheme
    
    var body: some View {
        NavigationView{
            ScrollView{
                VStack(spacing:20){
                    Text("This text is PRIMARY")
                        .foregroundStyle(.primary)
                    Text("This text is SECONDARY")
                        .foregroundStyle(.secondary)
                    Text("This text is BLACK")
                        .foregroundStyle(.black)
                    Text("This text is WHITE")
                        .foregroundStyle(.white)
                    Text("This color is globally adaptive!")
                        .foregroundStyle(.adaptive)
                    Text("This color is locally adaptive!")
                        .foregroundStyle(colorScheme == .light ? .green : .yellow)
                }
            }
            .navigationTitle("Dark Mode Bootcamp")
        }
    }
}

#Preview {
    DarkModeBootCamp()
        .preferredColorScheme(.dark)
}

#Preview {
    DarkModeBootCamp()
        .preferredColorScheme(.light)
}

```

