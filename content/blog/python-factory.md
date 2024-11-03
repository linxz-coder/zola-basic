+++
title = "什么是工厂函数（Factory Function）"
date = 2024-11-03
+++

工厂函数指不需要直接创建class，就可以引用class的function。

举个例子：

假设有一个表示“交通工具”的场景。

# 使用类的构造函数

```python
class Car:
    def __init__(self, brand):
        self.brand = brand

class Bike:
    def __init__(self, type):
        self.type = type

# 创建对象
my_car = Car("Toyota")
my_bike = Bike("Mountain")
```

在这个例子中，我们直接使用各自的构造函数来创建Car和Bike对象。

# 使用工厂函数

```python
class Car:
    def __init__(self, brand):
        self.brand = brand

class Bike:
    def __init__(self, type):
        self.type = type

def vehicle_factory(vehicle_type, attribute):
    if vehicle_type == "car":
        return Car(attribute)
    elif vehicle_type == "bike":
        return Bike(attribute)

# 创建对象
my_vehicle1 = vehicle_factory("car", "Toyota")
my_vehicle2 = vehicle_factory("bike", "Mountain")
```

在这个例子中，vehicle\_factory是一个工厂函数，根据传入的vehicle_type参数来决定创建Car还是Bike对象。这种方式更加灵活和抽象，因为调用者不需要直接与具体的Car或Bike类打交道。
