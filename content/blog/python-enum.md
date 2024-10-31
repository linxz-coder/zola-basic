+++
title = "python - 如何使用Python的枚举Enum()？"
date = 2023-11-15
+++

枚举（Enum），是一种特殊的类。在枚举中，每个成员都有一个名称（类似key）和一个值（类似value).

可以理解是一个字典dict。

注意：枚举不是必要的数据类型，只是为了避免程序员打错字，比如green会打成gerrn这样的错误，才推出的，完全可以不用。

如何使用：

```python
from enum import Enum

class Color(Enum):
    RED = "red"
    GREEN = "green"
    BLUE = "blue"

# 使用枚举
color = Color.RED

# 比较时直接与字符串进行比较
if color == Color.RED:
    print("The color is red.")
```
