+++
title = "swiftUI怎么print"
date = 2024-12-16
+++

# 在view里声明变量

输入`let _ = print()`

```swift
var body: some View {
        let _ = print(Realm.Configuration.defaultConfiguration.fileURL)
}
```

# 在Button下面直接print

```swift
Button {
    print("Button tapped")
} label: {
    Image(systemName: "plus")
}
```

[参考链接](https://stackoverflow.com/questions/73878378/why-i-cannot-use-print-statement-in-my-swiftui-view)
