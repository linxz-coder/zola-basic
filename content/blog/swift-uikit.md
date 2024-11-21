+++
title = "什么是苹果的UIKit?"
date = 2024-11-21
+++

苹果提供的UI接口，通过它可以访问UIViewController, UIButton, UILabel等元素。

```swift
import UIKit

class SecondViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let label = UILabel()
    }
}
```
