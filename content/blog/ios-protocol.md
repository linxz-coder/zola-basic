+++
title = "swift的protocol"
date = 2024-11-24
+++

swift的protocol

协议，约定固定的功能，类似与取得某个function的证书。

用于子类和父类function不能简单继承的情况。比如企鹅是鸟，但是不能飞。所以不能把`飞`这个function安装在鸟里面，需要子类自定义这个function。

如果有这个证书，则可以用某些function，且这些function需要子类来自定义。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411232249252.png)

## UITExtFieldDelegate是一个protocol

protocol在class里面的格式：

```swift
class Eagle: Bird, FirstProtocol, SecondProtocol…{
}
```

在struct里面的格式：
```swift
struct Eagle: FirstProtocol, SecondProtocol…{
}
```



例子：

```swift
class WeatherViewController: UIViewController, UITextFieldDelegate {}

```
