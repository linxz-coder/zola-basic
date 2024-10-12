+++
title = "Python如何使用enumerate()"
date = 2023-11-14
+++

enumerate() 用来找出数列[]里面的index和值。

假设我们有一个水果列表，我们想要打印出每种水果及其在列表中的位置（索引）。下面是如何使用enumerate来实现这一点的例子：

```python
fruits = ['苹果', '香蕉', '橘子', '葡萄']

for index, fruit in enumerate(fruits):
    print(f"水果 {fruit} 的位置是 {index}")
```

这段代码会遍历fruits列表，enumerate函数会生成每个元素的索引（index）和值（fruit）。然后，我们打印出每种水果及其索引。输出结果会是这样的：

```bash
水果 苹果 的位置是 0
水果 香蕉 的位置是 1
水果 橘子 的位置是 2
水果 葡萄 的位置是 3
```
