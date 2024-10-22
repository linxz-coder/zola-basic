+++
title = "zola如何做标签tag？"
date = 2024-10-22
+++

# 修改配置文件

修改配置文件：`config.toml`，添加一下：

```bash
taxonomies = [
    {name = "tags"},
]
```

# 文章加标签**tags**

```bash
+++
...
[taxonomies] 
tags = ["老钱和新钱", "投资"]
+++
```

# template文件夹加上两个html

## taxonomy_list.html

```html
{% extends "base.html" %}

{% block content %}
<h1>{{ taxonomy.name }}</h1>

<ul>
    {% for term in terms %}
    <li><a href="{{ term.permalink }}">{{ term.name }}</a> ({{ term.pages | length }} 篇文章)</li>
    {% endfor %}
</ul>
{% endblock content %}
```

## taxonomy_single.html

```html
{% extends "base.html" %}

{% block content %}
<h1>{{ term.name }}</h1>

<ul>
    {% for page in term.pages %}
    <li>
        <a href="{{ page.permalink }}">{{ page.title }}</a>
        {% if page.date %}
        <span class="date">{{ page.date | date(format="%Y-%m-%d") }}</span>
        {% endif %}
    </li>
    {% endfor %}
</ul>
{% endblock content %}
```

现在你可以通过[我的tags页面](https://linxz.online/tags)来访问**tags**。

## 参考资料

[我的terminal-blog仓库有tag页面](https://github.com/linxz-coder/myblog-terminal/blob/main/templates/tags/list.html)

[zola的taxonomies介绍](https://www.getzola.org/documentation/content/taxonomies/)
