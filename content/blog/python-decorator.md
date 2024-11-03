+++
title = "Python: 什么是装饰器（Decorator）"
date = 2024-11-03
+++

作用：不修改原func，增加func功能

让我们通过一个简单的例子来理解装饰器：

假设你有一个打印“Hello, World!”的函数：

```Python
def greet():
    print("Hello, World!")
```

现在，你想在调用 greet 函数之前和之后打印一些额外的信息（比如日志），但又不想修改 greet 函数本身。这时，你可以使用装饰器来实现：

```Python
def my_decorator(func):
    def wrapper():
        print("Something is happening before the function is called.")
        func()
        print("Something is happening after the function is called.")
    return wrapper

@my_decorator
def greet():
    print("Hello, World!")
```

当你使用 @my\_decorator 语法（这称为“装饰”）应用于 greet 函数时，实际上是用 wrapper 函数来“包装”了 greet 函数。因此，当你调用 greet() 时，它不仅会执行 greet 函数本身的内容，还会执行额外的打印操作。

当你运行以下代码：

```Python
greet()
```

输出将会是：

```Python
Something is happening before the function is called.
Hello, World!
Something is happening after the function is called.
```

这在很多场景下非常有用，比如添加日志、性能测试、事务处理、缓存等。
