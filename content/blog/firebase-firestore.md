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


# firestore获取数据

需要用到async await的方法

```swift
    func loadMessages() async{
        messages = []
        do {
            let snapshot = try await db.collection(K.FStore.collectionName).getDocuments()
            for document in snapshot.documents {
//                print("\(document.documentID) => \(document.data())")
                let data = document.data()
                if let messageSender = data[K.FStore.senderField] as? String, let messageBody = data[K.FStore.bodyField] as? String{
                    let newMessage = Message(sender: messageSender, body: messageBody)
                    messages.append(newMessage)
                    
                    //后台运行异步任务
                    DispatchQueue.main.async {
                        self.tableView.reloadData()
                    }
                    
                }
            }
        } catch {
            print("Error getting documents: \(error)")
        }
    }
```

注意，在call function的时候需要包裹在Task里面，因为ViewDidLoad无法覆盖成async方法

```swift
        Task {
            await loadMessages()
        }
```

# 如果需要实时同步UI

```swift
    func loadMessages() async{
        
        //实时更新信息 - addSnapshotListener
        db.collection(K.FStore.collectionName).addSnapshotListener { (querySnapshot, error) in
            
            self.messages = []
            
            if let error{
                print("There was an isssue retrieving data from Firestore, \(error)")
            } else {
                if let snapshotDocuments = querySnapshot?.documents{
                    for document in snapshotDocuments {
                        //                print("\(document.documentID) => \(document.data())")
                        let data = document.data()
                        if let messageSender = data[K.FStore.senderField] as? String, let messageBody = data[K.FStore.bodyField] as? String{
                            let newMessage = Message(sender: messageSender, body: messageBody)
                            self.messages.append(newMessage)
                            
                            //后台运行异步任务
                            DispatchQueue.main.async {
                                self.tableView.reloadData()
                            }
                            
                        }
                    }
                }
            }
        }
    }
```

注意，可能不是预想的顺序，因为retrieve data是按照id的顺序，而不是添加时间的顺序，我们需要做一个`按照时间戳顺序`的方式。

# 按时间戳顺序

[firestore的order方法](https://firebase.google.com/docs/firestore/query-data/order-limit-data)

加一个.order即可：

```swift
 db.collection(K.FStore.collectionName)
            .order(by: K.FStore.dateField)
            .addSnapshotListener{...
```

firestore数据库的安全规则rules

[文档](https://firebase.google.com/docs/rules/basics?authuser=0&hl=en)

在console里面写明规则，再publish即可。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411281802003.png)



# 拓展：国内对标Firebase的平台

[LeanCloud](https://www.leancloud.cn/tutorials/)，也是个baas(backend as a service)平台。解决用户的后端需求，包括用户注册登录、存储数据库、短信发送等服务。

也有iOS sdk。

## 其他选择

[腾讯云开发cloud base](https://cloud.tencent.com/product/tcb)：缺点是没有iOS的sdk，用不了移动端。好像有Flutter的？
