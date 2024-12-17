+++
title = "swiftUI怎么print"
date = 2024-12-16
+++

在view下面，输入`let _ = print()`

```swift
var body: some View {
        let _ = print(Realm.Configuration.defaultConfiguration.fileURL)
}
```

[参考链接](https://stackoverflow.com/questions/73878378/why-i-cannot-use-print-statement-in-my-swiftui-view)
