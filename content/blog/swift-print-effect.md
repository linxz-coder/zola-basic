+++
title = "swift实现打字机动画"
date = 2024-11-26
+++

# 方法一：for loop实现

基本思路：
for loop打印每个字出来，每个字出现需要间隔（设定定时器）。

每次的间隔不同，可以用0.1 * index来实现时间间隔的不同。

```swift
    override func viewDidLoad() {
        super.viewDidLoad()
        
        titleLabel.text = ""
        var charIndex = 0.0
        let titleText = "⚡️FlashChat"
        for letter in titleText{
            Timer.scheduledTimer(withTimeInterval: 0.1 * charIndex, repeats: false) { (timer) in
                self.titleLabel.text?.append(letter)
            }
            charIndex += 1
        }
```

# 方法二： 引入pods - CLTypingLabel

```swift
import CLTypingLabel

@IBOutlet weak var titleLabel: CLTypingLabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        titleLabel.text = "⚡️FlashChat"
}
```
