+++
title = "数据库 - 如何使用 SQLalchemy？"
date = 2023-11-15
+++

使用SQLalchemy可以在本地简单架设数据库，使用SQLite来建设。

实现代码如下：

# 安装sqlalchemy：

```bash
pip install sqlalchemy
```

# 建立引擎：

```python
from sqlalchemy import create_engine
import os

# 获取当前用户的主目录
home = os.path.expanduser('~')
print(home)

# 设置数据库文件的路径
db_path = os.path.join(home, 'Downloads', 'sql_alchemy.db')
print(db_path)

# 创建连接到 SQLite 数据库文件的引擎
engine = create_engine(f'sqlite:///{db_path}', echo=True)
```

# 建立表格：

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

# 插入数据：

```python
from sqlalchemy.orm import sessionmaker

Session = sessionmaker(bind=engine)
session = Session()

new_customer = User(name='张三', fullname='Zhang San', nickname='zhang')
session.add(new_customer)
session.commit()
```

我使用的是`mac`，可以用`DB Browser for SQLite`来查看数据。