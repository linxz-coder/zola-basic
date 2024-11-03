+++
title = "python-defaultdict ()和默认dict{}的区别"
date = 2024-11-03
+++

区别：

defaultdict会自动给key赋予初始value是0，不用处理key不在dict()的异常情况。

举个例子：

# 使用 dict()

当使用普通字典时，如果尝试访问或修改一个不存在的键，你需要手动处理这种情况。例如，在统计字符出现次数的例子中，使用普通字典需要额外的代码来检查键是否存在：

```python
text = "hello world"
char_count = {}

for char in text:
    if char in char_count:
        char_count[char] += 1
    else:
        char_count[char] = 1

print(char_count)
```

在这个例子中，你必须使用if-else语句来检查每个字符是否已经在字典中。如果字符不在字典中，你需要先初始化它的计数为1，然后才能进行累加操作。

# 使用 defaultdict

相比之下，defaultdict自动处理不存在的键。如果你尝试访问或修改一个不存在的键，defaultdict会使用提供的工厂函数来为该键创建一个默认值，然后返回这个值。这样可以减少代码量并提高可读性：

```python
from collections import defaultdict

text = "hello world"
char_count = defaultdict(int)  # 默认值是0
print(char_count)

for char in text:
    char_count[char] += 1
    print(char_count)

print(char_count)
```

在这个例子中，你不需要检查字符是否已经存在于字典中。如果字符不存在，defaultdict会自动创建一个值为0的条目，然后进行累加操作。这使得代码更加简洁和直观。

上述的代码会输出hello world各个字母出现的次数，结果是：

```python
defaultdict(<class 'int'>, {})
defaultdict(<class 'int'>, {'h': 1})
defaultdict(<class 'int'>, {'h': 1, 'e': 1})
defaultdict(<class 'int'>, {'h': 1, 'e': 1, 'l': 1})
defaultdict(<class 'int'>, {'h': 1, 'e': 1, 'l': 2})
defaultdict(<class 'int'>, {'h': 1, 'e': 1, 'l': 2, 'o': 1})
defaultdict(<class 'int'>, {'h': 1, 'e': 1, 'l': 2, 'o': 1, ' ': 1})
defaultdict(<class 'int'>, {'h': 1, 'e': 1, 'l': 2, 'o': 1, ' ': 1, 'w': 1})
defaultdict(<class 'int'>, {'h': 1, 'e': 1, 'l': 2, 'o': 2, ' ': 1, 'w': 1})
defaultdict(<class 'int'>, {'h': 1, 'e': 1, 'l': 2, 'o': 2, ' ': 1, 'w': 1, 'r': 1})
defaultdict(<class 'int'>, {'h': 1, 'e': 1, 'l': 3, 'o': 2, ' ': 1, 'w': 1, 'r': 1})
defaultdict(<class 'int'>, {'h': 1, 'e': 1, 'l': 3, 'o': 2, ' ': 1, 'w': 1, 'r': 1, 'd': 1})
defaultdict(<class 'int'>, {'h': 1, 'e': 1, 'l': 3, 'o': 2, ' ': 1, 'w': 1, 'r': 1, 'd': 1})
```


