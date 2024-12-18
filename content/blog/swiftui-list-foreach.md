+++
title = "SwiftUI的ForEach的基本使用"
date = 2024-12-18
+++

语法：

`ForEach(次数）{index in sth}` 或 `ForEach(数组, id）{item in sth}`

`0..<10`指重复10次，index从0到9

```swift
 ForEach(0..<10) { index in
                Text("Hi: \(index)")
            }
```

# 需要用到index的情况。

```swift
 ForEach(data.indices) { index in
                Text("\(data[index]): \(index)")
            }
```

# 需要用到id的情况

什么情况需要用id呢？比如需要删除元素的情况。

## 自己准备id

```swift

struct Item: Identifiable{
    var id = UUID()
    var title = ""
    var done = false
}

let items = [
        Item(title: "item1",done: false),
        Item(title: "item2",done:true),
        Item(title: "item3",done:false)
    ]

ForEach(items) { item in
	Text("\(item.title): \(item.id)")
}
```

##  结构体本身含有id

比如realm

```swift
import RealmSwift

class Item: Object, Identifiable{
    @Persisted var title: String = ""
    @Persisted var done: Bool = false
}

ForEach(items, id: \.self) { item in
	Text("\(item.title): \(item.done ? "Done" : "Not Done")")
}
```
