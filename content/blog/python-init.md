+++
title = "python - `__`init`__`.py是什么文件？"
date = 2023-11-16
+++

`__`init`__`.py是python文件包（文件夹）的初始化文件，在import后就直接运行。

举个例子：

假设你有一个名为 my_package 的文件夹，其结构如下所示：
```python
my_package/
|-- __init__.py
|-- module1.py
|-- module2.py
```
在 `__`init`__`.py 中，你定义了一个函数：

```python
# my_package/__init__.py

def hello_world():
    print("Hello, world from my_package!")
```

当你导入 my_package 时，你可以直接调用 hello_world() 函数，无需通过模块名引用：

```python
import my_package

my_package.hello_world()  # 输出: Hello, world from my_package!
```

如果引用时想省略前缀my_package，可以用from…import…：

```python
from my_package import hello_world

hello_world()  # 直接调用函数，无需前缀
```