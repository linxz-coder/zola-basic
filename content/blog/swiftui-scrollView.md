+++
title = "swiftUI滚动页面ScrollView基本使用"
date = 2024-12-19
+++

`ScrollView(.horizontal, showIndicators: false){}`

```swift
        //showIndicators滚动条
        ScrollView(.horizontal, showsIndicators: true) {
            HStack{
                ForEach(0..<50){ index in
                    Rectangle()
                        .fill(.blue)
                        .frame(width: 300, height: 300)
                }

            }
        }
```

# NetFlix效果

这里用到懒加载`LazyVStack`，就可以边scroll，边加载数据。避免数据量过大造成崩溃。

```swift
import SwiftUI

struct ScrollViewBootcamp: View {
    var body: some View {
        ScrollView{
            LazyVStack{
                ForEach(0..<10){ index in
                    ScrollView(.horizontal, showsIndicators: false) {
                        HStack{
                            ForEach(0..<20){ index in
                                RoundedRectangle(cornerRadius: 25)
                                    .fill(.white)
                                    .frame(width: 200, height: 150)
                                    .shadow(radius: 10)
                                    .padding()
                            }
                        }
                    }
                }
            }
        }
    }
}

#Preview {
    ScrollViewBootcamp()
}

```
