+++
title = "Firebase介绍"
date = 2024-11-27
+++

google推出的app工具，可以存储对话，实现验证等功能。

# 新建项目

到[官网](https://firebase.google.com/)，用自己的google账号打开右上角`console`。

create new project，暂时我们不需要google analytic，所以里面的都可以不勾选。创建项目即可。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411271216442.png)

点击正中间的"ios+"按钮，加入一个ios-app。

输入你的bundle ID，一般是一个倒着的URL，比如online.linxz

# 下载config文件

注意，这个文件需要放在项目的根目录下，和Info.plist一个目录。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411271219265.png)

# 修改Podfile文件

```bash
pod 'FirebaseAuth'
pod 'FirebaseFirestore'
```

[参考链接](https://firebase.google.com/docs/ios/installation-methods?hl=en&authuser=0#cocoapods)

# 安装

```bash
pod install
```

# 修改AppDelegate文件

实际上就是加上`import FirebaseCore`和`FirebaseApp.configure()`

```swift
import UIKit
import FirebaseCore


@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.
        FirebaseApp.configure()
        return true
    }
```

[firebase文档](https://firebase.google.com/docs/guides?hl=en&authuser=0)查看使用方式。

# ios-Authentication

[Password Authentication操作指引](https://firebase.google.com/docs/auth/ios/password-auth?hl=en&authuser=0)

在console里面勾选emali/password，enable就可以了。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411271432972.png)

在需要使用代码的地方：

```swift
Auth.auth().createUser(withEmail: email, password: password) { authResult, error in
  // ...
}
```

示例代码：

```swift
@IBAction func registerPressed(_ sender: UIButton) {
        
        if let email = emailTextfield.text,let password = passwordTextfield.text{
            Auth.auth().createUser(withEmail: email, password: password) { authResult, error in
                if let error {
                    print(error)
                } else{
                    //Navigate to the ChatViewController
                    self.performSegue(withIdentifier: "RegisterToChat", sender: self)
                }
            }

        }
        
    }
```

当完成注册后，账号代码也会在console里面显示：

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411271448702.png)

