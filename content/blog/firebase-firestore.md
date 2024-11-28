+++
title = "如何使用Firebase的数据库Firestore"
date = 2024-11-28
+++

用来存储数据，是个数据库。

[Cloud Firestore](https://firebase.google.com/docs/firestore)官方文档。

# 创建Database

在console-选中项目-Firestore Database下，选择`create database`

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411281418137.png)

选定区域后（我选的香港），选择`test mode`。后面可以改成`production mode`的，只是为了方便调试。在你明确数据管理人和规则后，可以选择后一种模式。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411281422642.png)

# 改变AppDelegate配置

```swift
import FirebaseCore
import FirebaseFirestore

//第一个func下面
func aplication(....)
        FirebaseApp.configure()
        let db = Firestore.firestore()
	  print(db) //测试是否成功，要出现<FIRFirestore: 0x600002129c70>字样
```

# 如果因为网络连接不成功，可以设置http代理：

改变AppDelegate配置。

```swift
setenv("grpc_proxy", "http://127.0.0.1:1087", 1)

//其他firebase的设置
```

# 添加数据进数据库

```swift
    @IBAction func sendPressed(_ sender: UIButton) {
        //Auth提供的访问用户名的方法
        if let messageBody = messageTextfield.text, let messageSender = Auth.auth().currentUser?.email{
            db.collection(K.FStore.collectionName).addDocument(data: [K.FStore.senderField: messageSender, K.FStore.bodyField: messageBody]) {error in
                if let error {
                    print("There is an issue saving data to firestore, \(error)")
                } else {
                    print("Successfully saved data.")
                }
            }
        }
    }
```

K.swift参考：

```swift
    struct FStore {
        static let collectionName = "messages"
        static let senderField = "sender"
        static let bodyField = "body"
        static let dateField = "date"
    }
```

# 拓展：代理问题

其实我本来就设置了代理，但是默认是socks5，firebase不支持。可以看看[中国人提出的问题](https://github.com/firebase/firebase-ios-sdk/issues/5377)和[设置环境变量的解释](https://github.com/grpc/grpc/blob/master/doc/environment_variables.md)

# 拓展：国内对标Firebase的平台

[LeanCloud](https://www.leancloud.cn/tutorials/)，也是个baas(backend as a service)平台。解决用户的后端需求，包括用户注册登录、存储数据库、短信发送等服务。

也有iOS sdk。

## 其他选择

[腾讯云开发cloud base](https://cloud.tencent.com/product/tcb)：缺点是没有iOS的sdk，用不了移动端。好像有Flutter的？
