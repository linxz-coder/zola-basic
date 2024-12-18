+++
title = "SwiftData的增删改查"
date = 2024-12-18
+++

如果要实现数据库的实时更新，必须要`context.save()`。

# 主文件配置

关键是`modelContainer`的配置和`print`路径配置。

```swift
import SwiftUI

@main
struct Todoey_swiftDataApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .modelContainer(for: Item.self)
    }
    
    init(){
        print(URL.applicationSupportDirectory.path(percentEncoded: false))
    }
}
```


# 添加数据

context.insert()

1. 定义context

```swift
@Environment(\.modelContext) private var context
```

2. 保存数据

```swift
Button("添加") {
                    let newItem = Item(title: title, done: done)
                    context.insert(newItem)
                    do {
                        try context.save()  // 保存上下文的所有更改
                        isPresented = false
                    } catch {
                        print("保存数据时出错: \(error)")
                    }
```

3. 数据结构

重点是@Model

```swift
import SwiftData

@Model
class Item{
    var title: String
    var done: Bool
    
        init(
            title: String,
            done: Bool
        ){
            self.title = title
            self.done = done
        }
}
```

# 展示数据

1. 定义context和数据

```swift
import SwiftData
@Environment(\.modelContext) private var context
@Query(sort: \Item.title) private var items: [Item]
```

2. 展示数据

```swift
List{
	ForEach(items){ item in
		Text(item.title)
	}
}
```

# 修改数据

用getter和setter辅助修改
	
```swift
ForEach(items) { item in
                        Toggle(item.title, isOn: Binding(
                            //获取当前.done的值
                            get: { item.done },
                            //.done的值变化时，操作数据库
                            set: { newValue in
                                item.done = newValue
                                do {
                                    try context.save()
                                } catch {
                                    print("保存数据时出错: \(error)")
                                }
                                
                            }
                        ))
```

# 删除数据

context.delete()

```swift
                        .swipeActions(edge: .trailing, allowsFullSwipe: true) {
                            Button(role: .destructive) {
                                context.delete(item)
                                do {
                                    try context.save()  // 提交更改
                                } catch {
                                    print("删除项目时出错: \(error)")
                                }
                            } label: {
                                Label("删除", systemImage: "trash")
                            }
                        }
```
