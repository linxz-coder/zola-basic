+++
title = "什么是ios的delegate"
date = 2024-11-24
+++

# delegate 是什么？

通过定义协议（protocol），一个对象可以通知另一个对象某些事件的发生或者请求其执行某些操作。

苹果预设了许多方法，比如`UITextFieldDelegate`，`UITableViewDelegate`，`UICollectionViewDelegate`等等，这些方法可以让我们在特定的事件发生时，执行我们自己的代码。

比如，在`UITextFieldDelegate`中，有`textFieldDidBeginEditing`，`textFieldDidEndEditing`等方法，可以让我们在文本框开始编辑和结束编辑时，执行我们自己的代码。

## 关键点：

1. UITextFieldDelegate 协议定义了`能做什么`，即have the functions.
2. WeatherViewController 实现这些方法定义了`怎么做`，即define the function.
3. delegate = self 告诉 UITextField `谁来做`，即call the function.

过程示例：
![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411242306527.png)


# deligate的使用方式

delegate使用的两种方法

## 在videDidLoad里面定义

```swift
searchBar.delegate = self
```

## 直接在storyboard里面连接

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202412111119702.png)

# delegate的应用

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

## delegate的急救案例

```swift
protocol AdvancedLifeSupport{
    func performCPR()
}

class EmergencyCallHandler{
    var delegate: AdvancedLifeSupport?
    
    func assessSituation(){
        print("Can you tell me what happened?")
    }
    
    func medicalEmergency(){
        delegate?.performCPR()
    }
}

struct Parametic: AdvancedLifeSupport{
    init(handler: EmergencyCallHandler){
        handler.delegate = self
    }
    
    func performCPR() {
        print("The paramedic does chest compressions, 30 per second.")
    }
}

class Doctor: AdvancedLifeSupport{
    init(handler: EmergencyCallHandler){
        handler.delegate = self
    }
    
    func performCPR() {
        print("The doctor does chest compressions, 30 per second.")
    }
    
    func useStethescope(){
        print("Listening for heart sounds.")
    }
}

class Surgeon: Doctor{
    
    override func performCPR() {
        super.performCPR()
        print("Sings stying alive by the BeeGees.")
    }
    
    func useElectricDrill(){
        print("Whirr..")
    }
}

let emilio = EmergencyCallHandler()
//let pete = Parametic(handler: emilio)

let angela = Surgeon(handler: emilio)

emilio.assessSituation()
emilio.medicalEmergency()
```
