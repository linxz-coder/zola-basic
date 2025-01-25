+++
title = "swiftUI的List使用"
date = 2025-01-25
authors = ["小中"]
[taxonomies]
tags = ["swiftUI"]

+++

```swift

let names = ["Alex", "John", "Mary", "Steven"]

List(names, id: \.self){ name in
            Text(name)
}
```

# 如何创造分栏效果？

```swift
#Preview {
    NavigationView {
        ListView()
        Text("Detail")
    }
}
```

# 图片和文字并排效果

```swift
 List(names, id: \.self){ name in
            HStack {
                Image(name)
                    .resizable()
                    .frame(width: 100, height: 100)
                 Text(name)
            }
```
