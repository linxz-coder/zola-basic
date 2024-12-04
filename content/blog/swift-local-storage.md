+++
title = "swift-利用defaults来保存数据到本地"
date = 2024-12-04
+++

# 在按钮加一个closure，里面加上代码

```swift
self.defaults.set(self.itemArray, forKey: "TodoListArray")
```

# 在ViewController里面声明变量：

```swift
 let defaults = UserDefaults.standard
```

# 在viewDidLoad里面更新item:

```swift
 if let items = defaults.array(forKey: "TodoListArray") as? [String] {
            itemArray = items
 }
```

# 看到数据变化

delegate.swift输入以下代码：

```swift
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        
        print(NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true).last! as String)
        
        return true
    }
```

文档路径里面找到preferences里面的plist，通过退出应用看看是否有增加的key-value对。

# 整体代码示例：

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
