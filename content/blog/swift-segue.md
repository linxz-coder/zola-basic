+++
title = "swift如何连接第二屏Segue"
date = 2024-11-22
+++

# 方法一：新建Cocoa touch类

## cocoa touch class

比用代码创建更方便

subclass: UIViewController

### 设置identity连接

点击main-storyboard里面黄色按钮，输入cmd+option+4，调出inspector菜单。
在Class里面输入之前设置的Class即可。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411220945174.png)

### 操作代码

cmd+ctl+option + Enter，可以出现`assistant view`，就可以调试代码和storyboard窗口，按住ctrl拖动元素到代码窗口了。


## 连接图形

按住ctrl，拉动第一屏的黄色方形按钮，连接第二屏。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411220954226.png)

选择`Present Modally`

或者选择某一个按钮，直接拉到其他屏幕上：

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411261604169.png)

## 更改名字Identifier

选中箭头，在inspector窗口(cmd+option+5)里面修改`Identifier`。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411220958683.png)

## 在UIViewController连接

```swift
self.performSegue(withIdentifier: "goToResult", sender: self)
```

## 在UIViewController里面准备`prepare`function

```swift
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "goToResult"{
            let destinationVC = segue.destination as! ResultsViewController //为什么要as!?因为downcasting，即告诉它降级到子class-ResultsViewController，而不是原本的UIViewController
            destinationVC.bimValue = "0.0"
        }
    }
```

## 如何退后到第一屏？

在第二屏设置：

```swift
    @IBAction func recalculatePressed(_ sender: UIButton) {
        self.dismiss(animated: true)
    }
```

## 如何看到多屏幕的3D视角？

运行程序时，点击左下角的`多屏幕图标`。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411221022674.png)

# 方法二：通过代码创建第二屏

创建SecondViewController的class

```swift
import UIKit

class SecondViewController: UIViewController {
    
    var bmiValue = "0.0"
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        view.backgroundColor = .red //等于UIColor.red，前面可省略
        
        let label = UILabel()
        label.text = bmiValue
        label.frame = CGRect(x: 0, y: 0, width: 100, height: 50)
        view.addSubview(label)
    }
}
```

在UIViewController里面使用

```swift
let secondVC = SecondViewController()
        
        secondVC.bmiValue = String(format:"%.1f",bmi)
```
