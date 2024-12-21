+++
title = "App设计模式-MVC"
date = 2024-11-21
+++

App有很多种设计模式，`MVC`是其中的一种。

model - view - controller

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411211026415.png)

## Model: Data & Logic

数据定义和函数

## View: User Interface

UI元素

## Controller: Mediator
也可以成为Conductor，即`指挥者`

控制`什么时候UI界面要更新`。
![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411211028036.png)

View和Model不会互相通信，总是通过Controller通信。

# 为什么swiftui没有controller？

因为用了很多属性包装器，比如@State, @ObservedObject等来管控UI状态。
