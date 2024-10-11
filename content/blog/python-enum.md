+++
title = "python - 如何使用Python的枚举Enum()？"
date = 2023-11-15
+++

枚举（Enum），是一种特殊的类。在枚举中，每个成员都有一个名称（类似key）和一个值（类似value).

可以理解是一个字典dict。

如何使用：

```python
from enum import Enum

class Color(Enum):
    RED = 1
    GREEN = 2
    BLUE = 3

print(Color.RED)
#输出1
```