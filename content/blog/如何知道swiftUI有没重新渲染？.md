+++
title = "如何知道swiftUI有没重新渲染？"
date = 2025-01-25
authors = ["小中"]
[taxonomies]
tags = ["swiftUI"]

+++

` let _ =  Self._printChanges`

注意，需要`运行`才能在控制台看到是否渲染，预览时看不到信息。

```swift
import SwiftUI

struct CounterView: View {
    
    @State private var counter: Int = 0
    
    var body: some View {
        
        let _ = Self._printChanges()
        
        VStack {
            Text("\(counter)")
                .font(.largeTitle)
            
            Button("Increment") {
                counter += 1
            }
        }.frame(maxWidth: .infinity, maxHeight: .infinity)
    }
}
```
