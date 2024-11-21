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

## swift的struct和class的区别

1. struct不能继承，class可以。
2. class需要init()，即self.health=health，struct不需要init()。
3. struct修改property时，需要`mutating func`，而class不用。
4. class是浅拷贝，s2=s1会对应同一个对象；stuct是深拷贝，不会互相影响。

因为安全拷贝的原因，苹果推荐优先使用`Struct`，可以参考[Choosing Between Structures and Classes](https://developer.apple.com/documentation/swift/choosing-between-structures-and-classes)
