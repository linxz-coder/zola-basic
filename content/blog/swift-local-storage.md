+++
title = "swift-利用defaults来保存数据到本地"
date = 2024-12-04
+++

# 什么是UserDefaults?

一个本地存储的plist，可以供App在开始时读取。

```swift
/*
 1. UserDefaults不是数据库，只适合存放少量数据。
 2. 每次加载程序时，整个UserDefaults plist都会加载，因此越大的数据，程序运行越慢。
 */

import UIKit

let defaults = UserDefaults.standard


let dictionaryKey = "myDict"

// 格式 - key: "Volume" value: 0.24
defaults.set(0.24, forKey: "Volume")
defaults.set(true, forKey: "MusicOn")
defaults.set("Angela", forKey: "PlayerName")
defaults.set(Date(), forKey: "AppLastOpenedByUser")

let array = [1,2,3]
defaults.set(array, forKey: "myArray")

let dictionary = ["name": "Angela"]
defaults.set(dictionary, forKey: dictionaryKey)


let volume = defaults.float(forKey: "Volume")
print(volume)

let appLastOpen = defaults.object(forKey: "AppLastOpenedByUser") //用object，因为对应的是Any?
print(appLastOpen!)

let myArray = defaults.array(forKey: "myArray")
print(myArray!)

let myDict = defaults.dictionary(forKey: dictionaryKey)
print(myDict!)
```

# 应用

## 在按钮加一个closure，里面加上代码

```swift
self.defaults.set(self.itemArray, forKey: "TodoListArray")
```

## 在ViewController里面声明变量：

```swift
 let defaults = UserDefaults.standard
```

## 在viewDidLoad里面更新item:

```swift
 if let items = defaults.array(forKey: "TodoListArray") as? [String] {
            itemArray = items
 }
```

## 看到数据变化

delegate.swift输入以下代码：

```swift
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        
        print(NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true).last! as String)
        
        return true
    }
```

文档路径里面找到preferences里面的plist，通过退出应用看看是否有增加的key-value对。

## 整体代码示例：

```swift
import UIKit

class TodoListViewController: UITableViewController {
    
    var itemArray = ["Find Mike", "Buy Eggos", "Destory Demogorgon"]
    
    let defaults = UserDefaults.standard
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        if let items = defaults.array(forKey: "TodoListArray") as? [String] {
            itemArray = items
        }
    }
    
    //每个分区section有多少行row
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return itemArray.count
    }
    
    //用哪个cell；indexPath即对应上面的row
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "ToDoItemCell", for: indexPath)
        cell.textLabel?.text = itemArray[indexPath.row]
        return cell
    }
    
    //选择cell会发生的事情
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
//        print(itemArray[indexPath.row])
        
        //checkmark
        if tableView.cellForRow(at: indexPath)?.accessoryType == .checkmark{
            tableView.cellForRow(at: indexPath)?.accessoryType = .none
        } else {
            tableView.cellForRow(at: indexPath)?.accessoryType = .checkmark
        }
        
        //选择后背景色会消失
        tableView.deselectRow(at: indexPath, animated: true)
    }
    
    //MARK: - add new items
    @IBAction func addButtonPressed(_ sender: UIBarButtonItem) {
        
        var textField = UITextField()
        
        
        let alert = UIAlertController(title: "Add New Todoey Item", message: "", preferredStyle: .alert)
        
        let action = UIAlertAction(title: "Add Item", style: .default)
            { (action) in
                // what will happen once the user clicks the Add Item button on our UIAlert
                guard let safeTextField = textField.text else {return}
                self.itemArray.append(safeTextField)
                
                self.defaults.set(self.itemArray, forKey: "TodoListArray")
                
                //重新渲染tableView
                self.tableView.reloadData()
            }
        
        alert.addTextField { (alertTextField) in
            alertTextField.placeholder = "Create New Item"
            textField = alertTextField
        }
        
        alert.addAction(action)
        
        present(alert, animated: true)
    }
    
}
```
