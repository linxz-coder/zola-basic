+++
title = "swift的类class"
date = 2024-11-21
+++

## 定义类

```swift
class Enemy{
    var health = 100
    var attackStrength = 10
    
    func move(){
        print("Walk forward")
    }
    
    func attack(){
        print("Land a hit, does \(attackStrength) damage.")
    }
}
```

## 继承类

```swift
class Dragon: Enemy {
    var wingSpan = 2
    
    func talk(speech: String){
        print("Says: \(speech)")
    }
    
    override func move() {
        print("Fly forward")
    }
    
    override func attack() {
        super.attack()
        print("Spits fire, does 10 damage")
    }
}
```

## 使用类

```swift
let skeleton = Enemy()
print(skeleton.health)
skeleton.move()
skeleton.attack()

let dragon = Dragon()
dragon.wingSpan = 5
dragon.attackStrength = 15
dragon.talk(speech: "My teeth are swords! My claws are spears! My wings are a hurricane")
dragon.move()
dragon.attack()
```

## 苹果的UI class

![swift-ui-class](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411211537694.png)


