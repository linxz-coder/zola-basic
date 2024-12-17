+++
title = "swiftUI如何使用realm?"
date = 2024-12-17
+++

[swiftUI-realm教程](https://bugfender.com/blog/realm-swift/)

# 展示项目

## 定义细项的结构

用@Persisted关键字确定项目需要保存。

```swift
import RealmSwift

class Item: Object, Identifiable{
    @Persisted var title: String = ""
    @Persisted var done: Bool = false
}
```

## 展示界面

用@ObservedResults()关键字确定项目是动态修改的。

```swift
@ObservedResults(Item.self) var items
```

用List来展示数据

```swift
List{
	ForEach(items, id: \.selft) { item in
		Text(item.title)
	}
}
```

# 添加项目

通过`realm.write`和`realm.add`实现

```swift
NavigationView{}
.navigationBarItems(
	trailing: Button("添加"){
		let realm = try! Realm()
		try! reaml.write{
			let newItem = Item()
			newItem.title = title
			newItem.done = false
			realm.add(newItem)
		}
	}
)
```

完整代码参考：

```swift
import SwiftUI
import RealmSwift

struct AddItemView: View {
    @Binding var isPresented: Bool
    @State private var title = ""
    
    var body: some View {
        NavigationView {
            Form {
                TextField("项目名称", text: $title)
            }
            .navigationTitle("添加新项目")
            .navigationBarItems(
                leading: Button("取消") {
                    isPresented = false
                },
                trailing: Button("添加") {
                    let realm = try! Realm()
                    try! realm.write {
                        let newItem = Item()
                        newItem.title = title
                        newItem.done = false
                        realm.add(newItem)
                    }
                    isPresented = false
                }
                .disabled(title.isEmpty)
            )
        }
    }
}

```

# 修改项目

比如修改.done属性，需要解冻项目.thaw()

```swift
            List {
                    ForEach(items, id: \.self) { item in
                        Toggle(item.title, isOn: Binding(
                            get: { item.done },
                            set: { newValue in
                                if let thawedItem = item.thaw() {
                                    try? thawedItem.realm?.write {
                                        thawedItem.done = newValue
                                    }
                                }
                            }
                        ))
		}
```

# 删除项目

也需要解冻项目.thaw()

```swift
Button(role: .destructive) {
                                if let thawedItem = item.thaw() {
                                    try? thawedItem.realm?.write {
                                        thawedItem.realm?.delete(thawedItem)
                                    }
                                }
                            } label: {
                                Label("删除", systemImage: "trash")
}
```

# 参考

[Todoey-swiftui-realm](https://github.com/linxz-coder/Todoey-swiftui-realm)
