+++
title = "什么是hasattr？"
date = 2023-11-16
+++

这是在python的class自定义的方法，指·、`has attribute`。

举例：

```python
class MyObject:
    attribute = "value"

obj = MyObject()

# 检查 obj 是否有名为 'attribute' 的属性
print(hasattr(obj, 'attribute'))  # 输出 True

# 检查 obj 是否有名为 'other_attribute' 的属性
print(hasattr(obj, 'other_attribute'))  # 输出 False
```

在这个例子中，MyObject 类定义了一个名为 attribute 的属性。所以，当我们用 hasattr 检查 obj 对象是否有这个属性时，它返回 True。而当我们检查不存在的属性 other_attribute 时，它返回 False。