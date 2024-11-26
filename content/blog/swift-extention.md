+++
title = "swift extension介绍"
date = 2024-11-26
+++

用法：extend现有的type

格式

```swift
extension someType{
  //Add new functionality
}
```

示例：实现四舍五入指定位数

```swift
extension Double{
    func round(to places: Int)->Double{
        let preciseNumber = pow(10, Double(places))
        var n = self
        n = n * preciseNumber
        n.round()
        n = n / preciseNumber
        return n
    }
}

var myDouble = 3.14159

myDouble.round(to: 3)
```

示例：扩展UIButton，画出圆形按钮
```swift
extension UIButton{
    func makeCircular(){
        self.clipsToBounds = true
        self.layer.cornerRadius = self.frame.size.width / 2
    }
}

let button = UIButton(frame: CGRect(x: 0, y: 0, width: 50, height: 50))
button.backgroundColor = .red

button.makeCircular()
```

## extend the protocol

```swift
entension SomeProtocol{
  //Define default behaviour
}
```

