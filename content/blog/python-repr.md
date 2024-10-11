+++
title = "python - def __repr__(self)和def __eq__(self, other)是什么？"
date = 2023-11-16
+++

这两个东西都是在类（class）内使用的。

repr代表representation，输入repr(obj)，会显示指定字符串：

```python
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String

Base = declarative_base()

class User(Base):
    __tablename__ = 'customer'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    fullname = Column(String)
    nickname = Column(String)

    def __repr__(self):
        return f"<User(name='{self.name}', fullname='{self.fullname}', nickname='{self.nickname}')>"

# 创建表
Base.metadata.create_all(engine)
```

repr使用：

```python
new_cu=User(name='小中', fullname='linxz', nickname='xz')
repr(new_cu)
```

repr输出：

```python
<User(name='小中', fullname='linxz', nickname='xz')>
```

eq代表equal，强制使两个同参数的对象等同。

```python
def __eq__(self, other):
    return repr(self) == repr(other)
```

例子：

```python
# 创建两个具有相同属性的 Summary 实例
summary1 = Summary("http://example.com", "This is a summary.")
summary2 = Summary("http://example.com", "This is a summary.")

# 创建一个具有不同属性的 Summary 实例
summary3 = Summary("http://different.com", "A different summary.")

# 比较
print(summary1 == summary2)  # 输出 True，因为它们的字符串表示相同
print(summary1 == summary3)  # 输出 False，因为它们的字符串表示不同
```

解释，原本实例summary1和summary2是不等同的，因为虽然是同样的对象obj，但是是不同的实例。但是因为在class内用了–eq–，现在就等同了。