+++
title = "SwiftUI使用Core Data的步骤"
date = 2025-02-18
+++

使用SwiftUI与Core Data结合时，一般遵循以下步骤：
1.	创建Core Data模型
	- 使用Xcode的.xcdatamodeld文件来创建Core Data模型，定义实体（例如，Student）及其属性（例如，id, name）。
2.	设置DataController
	- 创建一个DataController类，用于初始化并加载NSPersistentContainer。这个容器负责管理Core Data的所有操作，包括持久化存储和上下文的管理。



```swift
class DataController: ObservableObject {
    let container = NSPersistentContainer(name: "StudentInfo")
    
    init() {
        container.loadPersistentStores { description, error in
            if let error = error {
                print("Core Data failed to load: \(error.localizedDescription)")
            }
        }
    }
}
```



3.	设置Core Data上下文
	- 使用`@Environment(\.managedObjectContext)`注解，将Core Data的上下文（viewContext）注入到ContentView中，使得视图可以访问和操作Core Data。

```swift
@Environment(\.managedObjectContext) var moc
```


4.	执行Fetch请求
	- 使用@FetchRequest注解从Core Data中获取数据。可以指定排序规则（如sortDescriptors）来决定数据的排序方式。

```swift
@FetchRequest(sortDescriptors: []) var students: FetchedResults<Student>
```


5.	添加数据
	- 在Button操作中创建新的Student对象，并将其属性设置为随机的名字。之后，通过moc.save()保存更改到Core Data。

```swift
Button("Add") {
    let firstNames = ["Ginny", "Harry", "Hermione", "Luna", "Ron"]
    let lastNames = ["Granger", "Lovegood", "Potter", "Wealey"]
    
    let chosenFirstName = firstNames.randomElement()!
    let chosenLastName = lastNames.randomElement()!
    
    let student = Student(context: moc)
    student.id = UUID()
    student.name = "\(chosenFirstName) \(chosenLastName)"
    
    try? moc.save()
}
```


6.	绑定Core Data到App的视图层
	- 在@main应用程序入口点，通过`.environment(\.managedObjectContext, dataController.container.viewContext)`将Core Data的上下文传递给应用的视图，使得所有的视图都能够访问并修改Core Data数据。

```swift
@main
struct CoreData_swiftUIApp: App {
    @StateObject private var dataController = DataController()
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(\.managedObjectContext, dataController.container.viewContext)
        }
    }
}
```



总结：

- 创建NSPersistentContainer来管理Core Data的容器。

- 在ContentView中通过@Environment(\.managedObjectContext)和@FetchRequest来管理数据。

- 在操作（如按钮点击）中创建新的NSManagedObject（例如Student），并使用上下文保存数据。