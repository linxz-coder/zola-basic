+++
title = "python - __all__在python里面代表”导出限制“？"
date = 2023-11-16
+++

之所以有这个疑问，是因为碰到这个代码：
```python
__all__ = ['ParseError', 'parser_factory']
```

这行代码是用于定义一个模块（module）中应该被导出（export）的内容，也就是”导出限制“。

确保只有ParseError和parser_factory这两个名称在模块被其他地方导入时被包含，当使用from module import *这样的语句导入时，只有在__all__列表中的名称会被导入到当前的命名空间。
