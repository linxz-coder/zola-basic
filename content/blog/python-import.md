+++
title = "Python从本文件夹导入模块"
date = 2024-11-03
+++

遇到这个代码：

```Python
from .embeddable import EmbeddableExtractor
```

查了一下，.代表就是本文件夹，embeddable.py位于本文件夹下面。

EmbeddableExtractor是embeddable.py里面的一个class.
