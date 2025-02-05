+++
title = "swiftUI里面EnviromentObject的用法"
date = 2025-01-25
authors = ["小中"]
[taxonomies]
tags = ["swiftUI"]

+++

用途：跨视图(View）传递变量并实时渲染

# 先设置一个Settings的class

```swift
class Settings: ObservableObject{
    @Published var counter: Int = 0
}
```

# 使用该变量

```swift
 @EnvironmentObject var settings: Settings

            Text("\(settings.counter)")
                .font(.largeTitle)
```

# 预览视图使用EnviromentObject

```swift
#Preview {
    CounterView().environmentObject(Settings())
}
```

# 主App使用EnviromentObject

```swift
import SwiftUI

@main
struct learnSwiftUIApp: App {
    
    var body: some Scene {
        WindowGroup {
            CounterView().environmentObject(Settings())
        }
    }
}
```

# 完整代码示例

```swift


import SwiftUI

class Settings: ObservableObject{
    @Published var counter: Int = 0
}

struct CounterView: View {
    
    @EnvironmentObject var settings: Settings
    
    var body: some View {
        
        VStack {
            Text("\(settings.counter)")
                .font(.largeTitle)
            
            Button("Increment") {
                settings.counter += 1
            }
            
            AnotherCounterView()
        }.frame(maxWidth: .infinity, maxHeight: .infinity)
    }
}

#Preview {
    CounterView().environmentObject(Settings())
}
```
