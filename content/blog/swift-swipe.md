+++
title = "swift滑动删除效果实现"
date = 2024-12-12
+++

# 安装插件

[swipecellkit](https://github.com/SwipeCellKit/SwipeCellKit)，可以用SPM安装。

# 将cell改成 SwipeTableViewCell

在属性窗口里面改`Class`。

Module改为`SwipeCellKit`。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202412121602751.png)

# 代码增加

## SwipeTableViewCell类型

```swift
override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let cell = tableView.dequeueReusableCell(withIdentifier: "Cell") as! SwipeTableViewCell
    cell.delegate = self
    return cell
}
```

## 删除功能

删除功能的实现，取决于你的数据结构和选取的数据库。

```swift
func tableView(_ tableView: UITableView, editActionsForRowAt indexPath: IndexPath, for orientation: SwipeActionsOrientation) -> [SwipeAction]? {
    guard orientation == .right else { return nil }

    let deleteAction = SwipeAction(style: .destructive, title: "Delete") { action, indexPath in
        // handle action by updating model with deletion
    }

    // customize the action appearance
    deleteAction.image = UIImage(named: "delete")

    return [deleteAction]
}
```

## 右划删除

如果需要向右滑动，.destructive风格

```swift
func tableView(_ tableView: UITableView, editActionsOptionsForRowAt indexPath: IndexPath, for orientation: SwipeActionsOrientation) -> SwipeOptions {
    var options = SwipeOptions()
    options.expansionStyle = .destructive
    options.transitionStyle = .border
    return options
}
```

