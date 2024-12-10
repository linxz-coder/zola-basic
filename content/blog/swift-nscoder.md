+++
title = "如何用swift保存数据 - NSCoder"
date = 2024-12-10
+++

结果：保存在用户的`Documents`文件夹下。

# 为什么数据要encode和decode？

因为数据的样式是系统不认识的，即`不是基本数据类型`，比如struct或者class。想象成把音乐做成黑胶唱片，就是encode的过程。而用播放设备播放音乐，就是把黑胶唱片还原成音乐，是decode的过程。

# 连接用户的Documents文件夹

```swift
let dataFilePath = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first?.appendingPathComponent("Items.plist")
```

# 数据要保存成Codable

```swift
import Foundation

class Item: Codable{
    var title: String = ""
    var done: Bool = false
}
```

# 保存数据

## 定义saveItems()

```swift
    func saveItems(){
        let encoder = PropertyListEncoder()
        
        do{
            let data = try encoder.encode(itemArray)
            try data.write(to: dataFilePath!)
        } catch {
            print("Error encoding item array, \(error)")
        }
    }
```

## 使用savveItems()

```swift
    @IBAction func addButtonPressed(_ sender: UIBarButtonItem) {
        
        var textField = UITextField()
        
        
        let alert = UIAlertController(title: "Add New Todoey Item", message: "", preferredStyle: .alert)
        
        let action = UIAlertAction(title: "Add Item", style: .default)
            { (action) in
                
                let newItem = Item()
                
                newItem.title = textField.text!
                
                self.itemArray.append(newItem)
                
                self.saveItems()
                
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
```

# videDidLoad中读取数据

```swift
    override func viewDidLoad() {
        super.viewDidLoad()
        
        print(dataFilePath!)
        
        loadItems()
    }
```

## 定义loadItem()

```swift
func loadItems(){
        if let data = try? Data(contentsOf: dataFilePath!) {
            let decoder = PropertyListDecoder()
            do{
                itemArray = try decoder.decode([Item].self, from: data)
            } catch {
                print("Error decoding item array, \(error)")
            }
        }
    }
```



