+++
title = "tera的基本语法"
date = 2024-09-21
+++

# tera的基本语法
{{ and }} 表达式（expressions） 

{% and %} 声明语句（statements）

{# and #} 注释（comments）

# raw块
避免被渲染
```tera
{% raw %}
    {{ 这段内容不会被Tera解析 }}
{% endraw %}
```

# 变量
- 用set声明变量.
- 在循环和宏中的变量拥有作用域。
- 循环变量在循环结束后不再可用。在其他地方设置的变量在整个模板中可用。如果想要在循环中设置全局变量，用set_global。
```tera
{% set name = "Tera" %}
{{ name }}
```

# 空白控制
![img](https://pic.linxz.online/20240921151241.png)
tera不会主动删除空白，需要用减号-来删除。
```tera
{%-if foo-%}...{%-endif-%}
```
注意：-号前后不能有空格。

# 注释
tera不会渲染注释。
也可以用html注释。
```tera
{# 这是注释 #}
<!--这是html的注释-->
```

# 连接
可以用波浪号~连接字符串、数字和变量。
```tera
{{ "Hello" ~ "world" }}
```

# in判断
用in判断是否在列表中，返回true或false。
```tera
{% if "foo" in ["foo", "bar"] %}
    foo is in the list
{% endif %}
```

# if判断
```tera
{% if foo %}
    foo is true
{% elif bar %}
    bar is true
{% else %}
    foo and bar are false
{% endif %}
```
使用and, or, not来组合条件，而不是&&, ||, !。
```tera
{% if foo and bar %}
    foo and bar are true
{% endif %}
```

# for循环
数据通常在后端传递给模板。
```tera
{% for user in users %}
    {{ user.name }}
{% endfor %}
```

# include
include可以引入其他html文件，相当于叠加。
文件名后面加上ignore missing，如果文件不存在，不会报错。
```tera
{% include "header.html" %}
```

# 继承
定义一个父模版，然后在子模版通过`block`继承。
```tera
<!-- 子模版 -->
{% extends "base.html" %}
```

## 使用{{ block.super }}来继承父模版的内容。
```tera
{% block content %}
    {{ block.super }}
    <p>子模版的内容</p>
{% endblock %}
```

# 宏
只能在模版最上面一行引入宏，否则会发生错误
```tera
{% import "macros.html" as macros %}
```
参考教程：[B站砸松果-tera的基本语法](https://www.bilibili.com/video/BV1EM41117ap/?spm_id_from=333.788&vd_source=52e547e5d9000389c9906e8cf67193c7)


# 函数和过滤器filter
参考教程：[B站砸松果-函数和过滤器](https://www.bilibili.com/video/BV1hg411J7Pn/?p=4&spm_id_from=pageDriver)

# 参考
1. [B站砸松果](https://www.bilibili.com/video/BV1EK41167FZ/?p=2&spm_id_from=pageDriver)