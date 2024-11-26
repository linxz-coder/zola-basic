+++
title = "swift语法介绍"
date = 2024-11-13
+++

# swift基本语法

![swift-cheatsheet](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411131554901.png)

# swift的数组

## 如何定义数组

```swift
let diceImages = [
    UIImage(named: "DiceOne"),
    UIImage(named: "DiceTwo"),
    UIImage(named: "DiceThree"),
    UIImage(named: "DiceFour"),
    UIImage(named: "DiceFive"),
    UIImage(named: "DiceSix")
]
```

注意，`var`指可变的变量，`let`指不变的变量，类似const

# swift如何生成一个随机数

## 方法一：Int.random()

```swift
Int.random(in: 0...5)
```

范围：从0到5的随机整数


## 方法二： Array.randomElement()

```swift
 let diceImages = [
            UIImage(named: "DiceOne")!, //!代表非空
            UIImage(named: "DiceTwo")!,
            UIImage(named: "DiceThree")!,
            UIImage(named: "DiceFour")!,
            UIImage(named: "DiceFive")!,
            UIImage(named: "DiceSix")!
  ]
        
        diceImageView1.image = diceImages.randomElement()
```

注意，因为数组元素是UIImage，系统会进行安全检查，认为这里可能是空值。即`UIImage?`，加上一个Optional的条件。

加上感叹号意思是`强制解包`，否则会报错。

告诉编译器， **我确定这里有值** ，这样，执行randomElement()才不会报错。

# 如何在swift的print里面插入变量？

## 利用反斜杠

```swift
pritn(“Text \(2+3) Text”)
```

示例代码：

```swift
var a = 4
print("The result of 2 + 2 = \(2+2)")
print("The result of 2 + 2 = \(a)”)
```

# swift的function

格式：

```swift
func getMilk(){ //do stuff }
```

# swift的external和internal参数

external参数用在call function的时候；

internal参数放在定义function的时候。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411252317892.png)

## 省略参数名称的方法：

只要把external参数设为下划线_即可，就不用输入name: value，只需要输入value即可。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411252318564.png)

# swift-ios的dictionary

Key - value对

## 依赖类型推断

```swift
var dict = ["Brewery”: “a place where beer is made”]
```

## 指定类型

```swift
var dict : [String: Int] = [“Angela”: 7712345678, “Philipp”: 7787654321]
```

# swift-ios的switch语法

```swift
switch hardness {
case "Soft":
    print(5)
case "Medium":
    print(7)
case "Hard":
    print(12)
default:
    print("Error")
}
 
```

# swift条件判断if...else

```swift
func loveCalculator(){
    let loveScore = Int.random(in: 0...1);
    print(loveScore)
    if(loveScore==1){
        print("You love each other like Kanye loves Kanye")
    } else{
        print("You'll be forever alone.")
    }
    
}

loveCalculator()

```

# swift-ios的开区间和闭区间

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411190943947.png)

## 开区间

```swift
Int.random(in: 0...100)
```


## 闭区间

```swift
Int.random(in: 0..<100) 
```

## 单方向区间

```swift
let numbers = [1, 2, 3, 4, 5]
let slice = numbers[...3]  // 包含索引 0 到 3 的元素 [1, 2, 3, 4]
```

# swift的Optinal语法?!

Optional是用来处理`不知道是否有值`存在的情况，防止程序因为空值崩溃。

```swift
//var playerUsername: String = nil //不能直接赋值nil

var playerUsername: String? = nil

playerUsername = "Jack"

var unwrappedP1Username = playerUsername!

print(playerUsername) //optional("Jack")
print(playerUsername!) //Jack
print(unwrappedP1Username) //Jack

playerUsername = nil
//print(playerUsername!) //报错，因为强制解包nil值

//怎么办？

/* 方法一：条件检查*/
if playerUsername != nil {
    print(playerUsername!)
}

```

---

`Optional`解决的是值为空时，会抛出错误中断程序的问题。

## 问号：

代表Optional类型，即可能有值，可能是nil：

```swift
var name: String? // name 可以是 String 或 nil
```

### 安全解包：

```swift
var petName: String? = "Buddy"
print(petName?.uppercased()) // 如果 petName 有值，输出大写；否则输出 nil
```

## 感叹号：

代表一定有值。但是若值为空时则抛出错误。

```swift
var name: String? = "孝中"
print(name!) // 输出：孝中
```

### 强制解包
若值为nil时，程序崩溃。

```swift
var nickname: String? = nil
print(nickname!) // 运行时崩溃
```

# IOS-swift-code顺序

```swift
//1.import
import UIKit
import AVFoundation


class ViewController: UIViewController {
    
	//2.声明变量
    var player: AVAudioPlayer!
    var totalTime = 0
    var secondsPassed = 0
    var timer = Timer()
    
    let eggTimes = [
        "Soft": 3,
        "Medium": 4,
        "Hard": 7
    ]
    
	//3.IB操作：IBOutlet和IBAction
    @IBOutlet weak var doneLabel: UILabel!
    
    @IBOutlet weak var progressBar: UIProgressView!
    
    @IBAction func hardnessSelector(_ sender: UIButton) {
        
        let hardness = sender.currentTitle!
        
        timer.invalidate() //取消timer每次点击都会触发，现在仅触发1次
        
        progressBar.progress = 0.0
        secondsPassed = 0
        
        doneLabel.text = hardness
        
        totalTime = eggTimes[hardness]!
        
        timer = Timer.scheduledTimer(timeInterval: 1.0, target: self, selector: #selector(updateTimer), userInfo: nil, repeats: true)
        
    }
    
	//4.function定义
    @objc func updateTimer(){
        if secondsPassed < totalTime {
            
            secondsPassed += 1
            
            progressBar.progress = Float(secondsPassed) / Float(totalTime)
            print(Float(secondsPassed) / Float(totalTime))
            
            
        } else {
            timer.invalidate() // 停止定时器
            doneLabel.text = "Done." // 更新标签文字
            playSound()
        }
    }
    
//    播放声音
    func playSound() {
            let url = Bundle.main.url(forResource: "alarm_sound", withExtension: "mp3")
            player = try! AVAudioPlayer(contentsOf: url!)
            player.play()
                    
        }
    

}

```
