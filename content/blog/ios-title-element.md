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

# swift改变导航条颜色：

## 改变本页导航条颜色

在`viewWillAppear`里面设置。

为什么不设置在`viewDidLoad`？因为它会快于导航条的渲染。而viewWillAppear出现在导航条渲染后。

```swift
var defaultAppearance: UINavigationBarAppearance?

override func viewWillAppear(_ animated: Bool) {
	guard let navBar = navigationController?.navigationBar else {fatalError("Navigation controller does not exist")}
            
            // 保存默认外观配置，以便后续恢复
            defaultAppearance = navBar.standardAppearance.copy()
            
            let appearance = UINavigationBarAppearance()
            appearance.backgroundColor = .red
            navBar.standardAppearance = appearance
            navBar.scrollEdgeAppearance = appearance
}
```

## 恢复上一页导航条颜色

在`viewWillDisappear`里面设置。

```swift
override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        
        // 恢复默认外观
        if let defaultAppearance = defaultAppearance,
           let navBar = navigationController?.navigationBar {
            navBar.standardAppearance = defaultAppearance
            navBar.scrollEdgeAppearance = defaultAppearance
        }
    }
```

## 改变其他元素颜色

### back按钮

.tintColor

### 导航条标题

appearance.titleTextAttributes

代码示例：

```swift
 guard let menuColor = UIColor(hexString: colorHex) else {
                fatalError("Error color")}
            
            // 保存默认外观配置，以便后续恢复
            defaultAppearance = navBar.standardAppearance.copy()
            
            let appearance = UINavigationBarAppearance()
            appearance.backgroundColor = UIColor(hexString: colorHex)
            
            //改变back按钮颜色
            navBar.tintColor = UIColor(contrastingBlackOrWhiteColorOn: menuColor , isFlat: true)
            
            //改变标题颜色
            appearance.titleTextAttributes = [.foregroundColor: UIColor(contrastingBlackOrWhiteColorOn: menuColor, isFlat: true)]
            
            // 设置 Large Title 的颜色
              appearance.largeTitleTextAttributes = [.foregroundColor: UIColor(contrastingBlackOrWhiteColorOn: menuColor, isFlat: true)]
            
            navBar.standardAppearance = appearance
            navBar.scrollEdgeAppearance = appearance
            

            
            searchBar.barTintColor = UIColor(hexString: colorHex)
```

# 全局设置navigation bar

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
