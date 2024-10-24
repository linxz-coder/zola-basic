+++
title = "如何读取多对象json"
date = 2024-09-30

+++

朋友今日传来一个json文件，说无法读取。

我很好奇，到底什么json文件，竟然无法读取？

我试着按照朋友指示的路径下载，发现这个文件竟然有1G多，颠覆了我对json文件”小而美“的认知。

我试着用python读取:

```python  
import json

# 打开JSON文件并读取内容
with open('data.json', 'r') as file:
    json_data = file.read()

# 解析JSON数据
data = json.loads(json_data)
```

报错如下：


于是，我用vscode查看了这个文档：

我发现，这是一个多对象json文件，每个对象单独成为一个json，中间并没有逗号分隔，难怪python无法读取。

应该怎么做呢？

我试着问ChatGPT。它给了一个办法，就是在每个对象后面加上逗号，效果大致如下：

```json
{
    "id": 1,
    "name": "A green door",
    "price": 12.50,
    "tags": ["home", "green"]
},
{
    "id": 2,
    "name": "A red door",
    "price": 12.50,
    "tags": ["home", "red"]
}
```

可是，加逗号的过程一塌糊涂，首尾不该加逗号的地方加了，中间该加逗号的地方没加，文件过大经不起折腾，我只得放弃。

我突然想，是否有办法遍历这个多对象json呢？

谷歌了一下，还真的找到一个办法，代码如下：

```python
import json

with open('data.json', 'r') as file:
    text = file.read()

objs = text.splitlines()
print(len(objs))
```

上面这段代码使用splitlines() 方法，可以将文件内容拆分为行的列表。

比如，原本的json对象是这样的：

```json
{"id": 1, "name": "A green door", "price": 12.50, "tags": ["home", "green"]}
{"id": 2, "name": "A red door", "price": 12.50, "tags": ["home", "red"]}
```

使用splitlines()后，变成这样：

```json
[
    {"id": 1, "name": "A green door", "price": 12.50, "tags": ["home", "green"]},
    {"id": 2, "name": "A red door", "price": 12.50, "tags": ["home", "red"]}
]
```
这样我就可以读取里面的数据了！

我把objs[1]打印出来：

```python
print(objs[1])
```

结果如下：

```json
{"id": 2, "name": "A red door", "price": 12.50, "tags": ["home", "red"]}
```

接下来就可以用json.loads()方法读取了。

```python
for item in objs:
    data = json.loads(item)
    print(data["id"])
```

结束！撒花！