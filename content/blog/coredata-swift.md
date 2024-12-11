+++
title = "利用CoreData来存储数据"
date = 2024-12-10
+++

CRUD操作：

Create
Read
Update
Destroy

# 名词解释

Entity 可以理解成Table或者Class

Attribute 可以理解成properties

NSPersistentContainer 实际上一个SQLite Database，之所以不直接叫SQLite，因为你还可以用其他数据库，比如XML等。

context类似github的暂存区stash，直到你满意了，才提交修改到永久保存区。

NSObject 等于一个row。

类比图：

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202412101700584.png)

# 操作过程

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202412101724476.png)

# 添加CoreData

两种方式：创建新项目或者添加文件

## 创建新项目

在新建项目中，`storage`选中`CoreData`。

## 添加文件

cmd + N 添加新文件，选择`DataModel`。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202412101415405.png)

### 添加AppDelegate的CoreData方法

```swift
	import CoreData

    // MARK: - Core Data stack

    lazy var persistentContainer: NSPersistentContainer = {
        /*
         The persistent container for the application. This implementation
         creates and returns a container, having loaded the store for the
         application to it. This property is optional since there are legitimate
         error conditions that could cause the creation of the store to fail.
        */
        let container = NSPersistentContainer(name: "CoreDataTest")
        container.loadPersistentStores(completionHandler: { (storeDescription, error) in
            if let error = error as NSError? {
                // Replace this implementation with code to handle the error appropriately.
                // fatalError() causes the application to generate a crash log and terminate. You should not use this function in a shipping application, although it may be useful during development.
                 
                /*
                 Typical reasons for an error here include:
                 * The parent directory does not exist, cannot be created, or disallows writing.
                 * The persistent store is not accessible, due to permissions or data protection when the device is locked.
                 * The device is out of space.
                 * The store could not be migrated to the current model version.
                 Check the error message to determine what the actual problem was.
                 */
                fatalError("Unresolved error \(error), \(error.userInfo)")
            }
        })
        return container
    }()

    // MARK: - Core Data Saving support

    func saveContext () {
        let context = persistentContainer.viewContext
        if context.hasChanges {
            do {
                try context.save()
            } catch {
                // Replace this implementation with code to handle the error appropriately.
                // fatalError() causes the application to generate a crash log and terminate. You should not use this function in a shipping application, although it may be useful during development.
                let nserror = error as NSError
                fatalError("Unresolved error \(nserror), \(nserror.userInfo)")
            }
        }
    }
```

### 修改上面的PersistentContainer的名字

需要和你创建的DataModel的文件名一样。

```swift
 let container = NSPersistentContainer(name: "DataModel")
```

# 添加新表

在`DataModel`下方的+号，点击`Add Entity`。

双击`Entity`，可以修改名字。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202412101454606.png)

## 将表设置为当前项目

inspector菜单 - Current Product Module

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202412101501195.png)


# 添加attribute (column)

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202412101458865.png)

如果是`optional`，即可选项；如果不勾选，则表示必须有值。

# 添加数据 Create

## 设置context变量

```swift
    let context = (UIApplication.shared.delegate as! AppDelegate).persistentContainer.viewContext
```

## 在add button下面添加数据

```swift
                let newItem = Item(context: self.context)
                
                newItem.title = textField.text!
                newItem.done = false

saveItem()
```

## 规定saveItem()

```swift
func saveItems(){
        do{
            try context.save()
        } catch {
            print("Error Saving Context \(error)")
        }
    }
```

# 读取数据 Read

1. 首先建立一个request，这里不能类型推断，要定义好类型。

2. 保存好context.fetch()

3. 直接在viewDidLoad里面loadItems即可。

```swift
 func loadItems(){
        let request : NSFetchRequest<Item> = Item.fetchRequest()
        do{
            itemArray = try context.fetch(request)
        } catch {
            print("Error fetching data from context. \(error)")
        }
    }
```

# 更新数据 Update

直接修改属性即可。

```swift
itemArray[indexPath.row].done = !itemArray[indexPath.row].done
```
# 删除数据 Delete

注意：顺序不能弄错，要先删除数据库，再删除视图UI。

```swift
        //删除数据（需要按照顺序）
        context.delete(itemArray[indexPath.row]) //从数据库删除
        itemArray.remove(at: indexPath.row) //从视图删除
```
