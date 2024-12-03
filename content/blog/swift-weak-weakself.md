+++
title = "swift的weak和weakSelf"
date = 2024-12-03
+++

# strong vs weak

与内存管理有关。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202412031622041.png)

默认是`strong`，不用写关键词。

```swift

var str = "hello"

```

如果是`weak`，需要在前面注明：

```swift
weak var str = "hello"
```

例子：

```swift
class Child {
	weak var balloon = "hello"
}

var joe = Child()
```

如果joe不见了，那么weak变量balloon也会从内存消失。


# weakself示例

```swift
import UIKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        print("hello")
        
        view.backgroundColor = UIColor(.white)
        
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        
        let alert = UIAlertController(title: "Title", message: "Message", preferredStyle: .alert)
        
        alert.addAction(UIAlertAction(title: "Done", style: .cancel, handler: { [weak self] _ in
            self?.doSomething()
        }))
        
        present(alert, animated: true)
    }
    
    private func doSomething(){
        print("something")
    }

}
```

说明：

如果不用weak self，当viewController声明了alert，因此进行了引用；alert在closure中又声明了self中的function，即引用了viewController。

相互引用，因此系统无法回收内存，造成「内存泄露」，即这些内存永远无法被重新利用。

加上weak self，alert消失后，由于不是强引用viewController，内存会自然释放。

# 参考视频

[weak self](https://www.youtube.com/watch?v=chI-B8u4MBs)

[weak vs strong swift](https://www.youtube.com/watch?v=I2mu9gMUbF0)

