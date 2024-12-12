+++
title = "利用realm数据库管理swift数据"
date = 2024-12-12
+++

# 介绍

realm是移动数据库，基于SQLite。

2019年被MongoDB收购，更名为Atlas SDK， **2024年9月正式弃用（不再更新）** 。

# 参考网站：

[realm的github网站](https://github.com/realm/realm-swift)

[MongoDB的不更新声明](https://www.mongodb.com/blog/post/realm-now-part-atlas-platform)

[Altas Device SDKs](https://www.mongodb.com/docs/atlas/device-sdks/deprecation/#std-label-device-sdks-deprecation)


# 查看数据

以前用realm browser，现在最新工具是[realm-studio](https://github.com/realm/realm-studio?tab=readme-ov-file)

# realm安装

用SPM安装。地址就是github网站的地址。

realm或者realmswift安装包选一个，不能两个都选，会报错。

我选的是`realswift`。


# 基础配置（可选）

打开AppDelegate，在didFinishLaunchingWithOptions下面输入：

```swift
//打印数据文件的地址，通常是一个default.realm文件，用real-studio打开
print(Realm.Configuration.defaultConfiguration.fileURL)
```

# 创建数据文件class

创建新的swift文件，比如CategoryTitle.swift

```swift
import Foundation
import RealmSwift

class CategoryTitle: Object{
    @objc dynamic var name: String = ""
    
    //后向关系
    let items = List<Item>()
}
```

比如里面有items，可以定义Item.swift

```swift
import Foundation
import RealmSwift

class Item: Object{
    @objc dynamic var title: String = ""
    @objc dynamic var done: Bool = false
    
    //前向关系
    var parentCategory = LinkingObjects(fromType: CategoryTitle.self, property: "items")
}
```

# 添加数据 Create - saveData

```swift
import RealmSwift
```

在vieController声明：

```swift
let realm = try! Realm()

var categories:Results<CategoryTitle>? //使用realm的Results变量
```

addButton里面添加：

```swift
let newCategory = CategoryTitle()
                
newCategory.name = textField.text!
                
self.save(category: newCategory)
```

save()的声明

```swift
 func save(category: CategoryTitle){
        do{
            try realm.write{
                realm.add(category)
            }
        } catch {
            print("Error Saving CategoryTitles \(error)")
        }
        
        tableView.reloadData()
    }
```

# 读取数据 Read - loadData

用realm.objects()

```swift
    func loadCategories(){
        
        categories = realm.objects(CategoryTitle.self)
        
        tableView.reloadData()
    }
```

# 更新数据 update

用realm.write{}

```swift
if let item = todoItems?[indexPath.row]{
            do{
                try realm.write{
                    item.done = !item.done
                }
            }catch{
                print("Error saving done status, \(error)")
            }
        }
        
        tableView.reloadData()
```

# 删除数据 delete

用realm.write{remove.delete(item)}

```swift
if let item = todoItems?[indexPath.row]{
            do{
                try realm.write{
                    realm.delete(item)
                }
            }catch{
                print("Error saving done status, \(error)")
            }
        }
        
        tableView.reloadData()
```

# 搜索数据 sort

过滤关键字逻辑和CoreData一致。

```swift
        todoItems = todoItems?.filter("title CONTAINS[cd] %@", searchBar.text!).sorted(byKeyPath: "dateCreated", ascending: true)
        
        tableView.reloadData()
```

# 增加属性需要删除app重来

注意，如果你增加属性后，xcode会报错。解决方案是删除目前这个app，重新run一次。旧的数据就会被删除，启用新数据库。

# 其他替代数据库

2023年推出[swiftData](https://developer.apple.com/xcode/swiftdata/)，特别适配SwiftUI

[GRDB](https://github.com/groue/GRDB.swift)

Firebase

参考:

[swiftData vs Realm vs coreData](https://hackernoon.com/swift-data-vs-core-data-vs-realm-ios-data-persistence-overview-and-analysis)

