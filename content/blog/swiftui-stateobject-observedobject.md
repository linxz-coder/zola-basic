+++
title = "SwiftUI如何使用StateObject和ObservedObject"
date = 2024-12-20
+++

# 数据端 - ViewModel

1. 使用ObservableObject的protocol
2. 使用@Publish标注变量

```swift
class FruitViewModel: ObservableObject{
    //Publish与State一样
    @Published var fruitArray: [FruitModel] = []
    @Published var isLoading: Bool = false
}
```

# UI端 - ContentView

1. 主视图使用@StateObject，可以不必多次渲染数据。
2. 子视图使用@ObservedObject，方便实时更新数据。

主视图：

```swift
@StateObject var fruitViewModel: FruitViewModel = FruitViewModel()
```

子视图：

```swift
@ObservedObject var fruitViewModel: FruitViewModel
```
