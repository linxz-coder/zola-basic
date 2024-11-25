+++
title = "什么是ios的delegate"
date = 2024-11-24
+++


# delegate design pattern

## UITextView对protocol的应用

```swift
protocol CanDealWithUITextFields{
	func textFieldDidBeginEditing()
}
```

这样一来，每个应用这个protocol的子类就必须拥有这些textField的生命周期function，而且必须在自己类的内部定义。

事实上，这个protocol叫做`UITextFieldDelegate`。

```swift
protocol UITextFieldDelegate{
	func textFieldDidBeginEditing()
}
```

### delegate内部的方法也可以是可选的Optional

```swift
// UITextFieldDelegate 的简化定义（实际上是 Objective-C 定义的）
@objc protocol UITextFieldDelegate: NSObjectProtocol {
    // 注意 @objc optional 关键字
    @objc optional func textFieldShouldBeginEditing(_ textField: UITextField) -> Bool
    @objc optional func textFieldDidBeginEditing(_ textField: UITextField)
    @objc optional func textFieldShouldEndEditing(_ textField: UITextField) -> Bool
    @objc optional func textFieldDidEndEditing(_ textField: UITextField)
    // ... 还有更多方法
}
```

## UITextField的内部结构

这样一来，所有UITextField就可以复用这些method

```swift
var delegate: UITextFieldDelegate //property
delegate.textFieldDidBeginEditing() //method
```

## UITextFieldDelegate的具体实现

```swift
let textField = UITextField()
textField.delegate = self //即等于类自己，所以可以重新定义protocol的相关方法
func textFieldDidBeginEditing(){
	//do something
}
```

### 关键点：

1. UITextFieldDelegate 协议定义了`能做什么`，即have the functions.
2. WeatherViewController 实现这些方法定义了`怎么做`，即define the function.
3. delegate = self 告诉 UITextField `谁来做`，即call the function.

过程示例：
![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411242306527.png)
