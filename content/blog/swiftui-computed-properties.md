+++
title = "什么是computed properties"
date = 2024-12-17
+++

computed properties 作用：通过计算实时更新值，与function结果一致，但代码较简单。

主要实现方式：Getter和Setter


# 什么是getter和setter？

get实现了数值的计算逻辑，set实现了根据数值变化，即时呈现效果。

```swift
import UIKit

let pizzaInInches: Int = 10

//MARK: - computed properties
//作用：通过计算实时更新值，与function结果一致，但代码较简单

/*
 1. 需要用var，而不是let关键字;
 2. 需要指定类型，比如Int
    
*/

//简短版本
var numberOfSlices: Int{
    return pizzaInInches - 4
}

//MARK: - Getter only
//作用：计算值

//复杂版本 - getter
var numberOfSlices: Int{
    get{
        return pizzaInInches - 4
    }
}


//MARK: - Getter + Setter
//作用：值一变化，就会更新

var numberOfSlices: Int{
    get{
        return pizzaInInches - 4
    }
    set{
        print("numberOfSlices now has a new value which is \(newValue)")
    }
}

numberOfSlices = 12

print(numberOfSlices)
```

# observe属性？

如果你不需要计算属性，即不需要get，只需要set的时候。

主要是`willSet`和`didSet`两个属性，一个是newValue，一个oldValue。

`didSet`一个用法是，通过条件判断来改变值。

 ```swift
import UIKit

var pizzaInInches: Int = 10 {
    //before changes
    willSet{
        print(pizzaInInches) //10
        print(newValue) //8
    }
    //after changes
    didSet{
        print(oldValue) //10
        print(pizzaInInches) //8
        
        if pizzaInInches >= 18 {
            print("Invalid size specified, pizzaInInches set to 18.")
            pizzaInInches = 18
        }
    }
}

pizzaInInches = 8

pizzaInInches = 33
print(pizzaInInches) //18
```
