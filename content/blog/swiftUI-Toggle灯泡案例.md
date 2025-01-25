+++
title = "swiftUI-Toggle灯泡案例"
date = 2025-01-25
authors = ["小中"]
[taxonomies]
tags = ["swiftUI"]

+++

通过开关Toggle灯泡

主要是Toggle中会用到binding值`$isOn`

```swift
struct ToggleView: View {
    @State private var isOn: Bool = false
    
    var body: some View {
        
        let _ = Self._printChanges()
        
        VStack {
            Image(systemName: isOn ? "lightbulb.fill" : "lightbulb")
                .font(.system(size: 62))
                .foregroundStyle(.yellow)
            Toggle(isOn: $isOn) {
                EmptyView() //空白占位符
            }
        }.frame(maxWidth: .infinity, maxHeight: .infinity)
    }
}
```
