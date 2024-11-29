+++
title = "ios-设置标题UI元素"
date = 2024-11-27
+++

首先要embed in Navigate Controller:

选中第一个界面 - Editor - embed in - Navigate Controller

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411291211654.png)

# 设置Logout button

添加元素bar button

改成名字-Logout

# 隐藏左上角Back按钮

在viewDidLoad里面增加：

```swift
navigationItem.hidesBackButton = true
```

# 增加上面中间的title

在viewDidLoad里面增加：

```swift
title = "⚡️FlashChat"
```

# 整体修改navigation bar的属性

在AppDelegate的第一个func里面输入：

```swift
 //全局样式-顶部菜单颜色
        let appearance = UINavigationBarAppearance()
        appearance.backgroundColor = UIColor(named: K.BrandColors.blue)  // 设置背景色
        
        // 设置标题字体和颜色
        appearance.titleTextAttributes = [
            .font: UIFont.systemFont(ofSize: 25, weight: .black),  // 设置字号为28
            .foregroundColor: UIColor.white        // 设置颜色为白色
        ]
        
        UINavigationBar.appearance().standardAppearance = appearance
        UINavigationBar.appearance().scrollEdgeAppearance = appearance
        UINavigationBar.appearance().compactAppearance = appearance
```
