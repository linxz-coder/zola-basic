+++
title = "iOS类型的提升和下降 - as的用法"
date = 2024-11-28
+++

as 是做什么的？type-casting

# as

强制类型提升（子类->父类）

# as!

强制类型下降（父类->子类）

# as?

安全类型下降（父类->子类）

示例代码：

```swift
import Foundation

class Animal {
    var name: String
    
    init(n: String){
        name = n
    }
}

class Human: Animal {
    func code(){
        print("Typing away...")
    }
}

class Nohuman{
    func shout(){
        print("zzzz....")
    }
}

class Fish: Animal{
    func breatheUnderWater(){
        print("Breathing under water.")
    }
}

let angela = Human(n: "Angela Yu")
let jack = Human(n: "Jack Bauer")
let nemo = Fish(n: "Nemo")
let noman = Nohuman()

//这三个之所以可以组成Array，因为它们都是Animal
let neighbours = [angela, jack, nemo]
//let neighbours = [angela, jack, nemo, noman] //报错

//is: 检查一个实例是否某个class (for type checking)
if neighbours[0] is Human{
    print("First neighbour is a Human.")
}

func findNemo(from animals:[Animal]){
    for animal in animals{
        if animal is Fish{
            print(animal.name)
            let fish = animal as! Fish //强制类型下降 as!强制cast down到Fish类型
            fish.breatheUnderWater()
            
            let animalFish = fish as Animal //强制类型提升
        }
    }
}

findNemo(from: neighbours)

let fish = neighbours[1] as? Fish //安全类型下降 as?
fish?.breatheUnderWater() //不会crash，只是不执行

//安全执行
if let fish2 = neighbours[1] as? Fish{
    fish2.breatheUnderWater()
} else {
    print("Casting has failed")
}


let num = 12
//Any就可以拼凑一个Array
let neighbours2: [Any] = [angela, jack, nemo, num]

//AnyObject只可以拼凑Object在一起
let neighbours3: [AnyObject] = [angela, jack, nemo, noman]
```

## 拓展：swift的Any类型

Any是最大的，下面是AnyObject。

苹果的Object，即在Foundation模块下，都是NSObject

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411281220865.png)

