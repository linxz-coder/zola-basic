+++
title = "swiftUI如何swipe删除item？"
date = 2024-12-17
+++

普通数据模式下（不需要删除数据库数据），可以参考[网页](https://www.hackingwithswift.com/quick-start/swiftui/how-to-let-users-delete-rows-from-a-list)用`editActions`的方法。

# 普通删除模式

```swift
struct ContentView: View {
    @State private var users = ["Glenn", "Malcolm", "Nicola", "Terri"]

    var body: some View {
        NavigationStack {
            List($users, id: \.self, editActions: .delete) { $user in
                Text(user)
            }
        }
    }
}

```

# realm数据库删除模式

使用`swipeActions`，模式是`.destructive`进行删除。

以下以realm数据库举例。

```swift
Toggle()
.swipeActions(edge: .trailing, allowsFullSwipe: true) {
    Button(role: .destructive) {
          if let thawedItem = item.thaw() {
                 try? thawedItem.realm?.write {
                       thawedItem.realm?.delete(thawedItem)
                 }
           }
       } label: {
             Label("删除", systemImage: "trash")
     }
}
```
