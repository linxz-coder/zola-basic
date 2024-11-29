+++
title = "ios-自动隐藏键盘方案"
date = 2024-11-29
+++

# 作用

防止键盘挡掉页面的内容

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411291007996.png)

# 使用swift package manager下载对应的包

[IQKeyboardManagerSwift](https://cocoapods.org/pods/IQKeyboardManagerSwift)

[github地址](https://github.com/hackiftekhar/IQKeyboardManager)

# 在AppDelegate.swift添加代码：

在第一个function下面添加以下代码：

```swift
IQKeyboardManager.shared.isEnabled = true
```

示例代码：

注意以下代码整合了firebase和IQKeyboardManager。

```swift
@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        //设置http代理，firebase不支持socks5代理
        setenv("grpc_proxy", "http://127.0.0.1:1087", 1)
        
        FirebaseApp.configure()
        let db = Firestore.firestore()
        
        print(db) //测试是否成功，要出现<FIRFirestore: 0x600002129c70>字样
        
        IQKeyboardManager.shared.isEnabled = true

        
        return true
    }
```

# 使用其中的属性

## 想要出现`done`的标签。

```swift
IQKeyboardManager.shared.enableAutoToolbar = true
```

注意，以上办法已经废弃，应该这样使用：

```swift
import IQKeyboardToolbarManager
IQKeyboardToolbarManager.shared.isEnabled = true
```

[其他属性参考](https://github.com/hackiftekhar/IQKeyboardManager/wiki/Properties-&-Functions)

## 点击键盘外区域退出键盘

```swift
IQKeyboardManager.shared.resignOnTouchOutside = true
```

