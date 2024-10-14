+++
title = "如何使用jinja2生成html页面？-Python"
date = 2023-11-13
+++

Jinja2 是一个流行的模板引擎，用于 Python。Environment 对象在 Jinja2 中起着核心作用，它是模板系统的中心，负责存储配置参数和全局对象，并用于从文件系统或其他位置加载模板。

首先，安装Jinja2：

```bash
pip install Jinja2
```

创建一个app.py文件：

```python
from jinja2 import Environment, FileSystemLoader

#用浏览器打开
import webbrowser
import os

# 设置模板文件的目录
env = Environment(loader=FileSystemLoader('templates'))

template = env.get_template('hello.html')

data = {'name': 'Linxz'}
print(template.render(data))

# 生成html文件
html_content = template.render(data)

# 保存到一个临时文件
with open('output.html', 'w') as file:
    file.write(html_content)

# 在浏览器中打开
webbrowser.open('file://' + os.path.realpath('output.html'))
```

以上代码创建了一个环境env，并在templates文件夹中使用hello.html作为模版。

hello.html的代码如下：

```html
<!DOCTYPE html>
<html>
<head>
    <title>Example</title>
</head>
<body>
    <h1>Hello {{ name }}!</h1>
</body>
</html>
```
输出会自动将{{name}}替换成自定义字符”Linx”。

完成后使用`python app.py`即可以用浏览器打开网页。

