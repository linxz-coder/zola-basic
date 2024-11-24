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


过程示例：
![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411242306527.png)
