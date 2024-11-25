+++
title = "swift如何自定义数据类型Struct"
date = 2024-11-20
+++

## 城镇struct示例：

```swift
struct Town{
    let name = "Linland"
    var citizens = ["Lin","Jack"]
    var resources = ["Grain": 100, "Ore":42, "Wool":72]
    
    func fortify(){
        print("Defences increased!")
    }
}

var myTown = Town()

print(myTown.citizens)
print("\(myTown.name) has \(myTown.resources["Grain"]!) bags of grain.")

//增加元素
myTown.citizens.append("Louis")
print(myTown.citizens.count)

//调用method
myTown.fortify()

```

## initialization

```swift
struct Town{
    let name: String
    var citizens: [String]
    var resources: [String: Int]
    
    init(name: String, citizens: [String], resources: [String : Int]) {
        self.name = name
        self.citizens = citizens
        self.resources = resources
    }
}

var anotherTown = Town(name: "Nameless Island", citizens: ["Tom Hanks"], resources: ["Coconut": 100])

print(anotherTown.name)

anotherTown.citizens.append("Wilson")
print(anotherTown.citizens)
```

## mutating func

swift struct内部不可更改属性property，哪怕是用`var`定义的。

比如：

```swift
struct QuizBrain{
var questionNumber = 0
questionNumber = 1 //这一行会报错
}
```

如果一定要更改，可以用`mutating`放在func的前面

```swift
struct QuizBrain{
 var questionNumber = 0
 mutating func changeNumber(){
	questionNumber = 1 
 } 
}
```

## ios在struct内对变量进行计算compute

可以定义一个变量叫做conditionName，通过switch不同的conditionId获取不一样的值。

```swift

struct WeatherModel {
    let conditionId: Int
    let cityName: String
    let temperature: Double
    
    var conditionName: String{
        switch conditionId {
        case 200...299:
            return "cloud.bolt"
        case 300...399:
            return "cloud.drizzle"
        case 500...599:
            return "cloud.rain"
        case 600...699:
            return "snowflake"
        case 700...799:
            return "cloud.fog"
        case 800:
            return "sun.max"
        case 800-804:
            return "cloud"
        default:
            return "cloud.bolt"
        }
    }
    
}

```
