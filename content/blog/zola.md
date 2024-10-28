+++
title = "zola搭建教程-如何开始一个zola项目"
date = 2024-09-21
+++

zola是一种ssg技术，即static site generator （静态网站生成器）

## 安装zola - brew
```bash
brew install zola
```

## 创建一个zola项目
```bash
zola init myblog
```

完成几个选项，即可开始项目。

### 关于选项
关于url的配置，可以选择默认，之后再在config.toml中配置
如果不想用增强版CSS，可以不选Sass
后两项是语法高亮和搜索索引。

## 运行项目
```bash
zola serve
```
然后你就可以在浏览器输入http://127.0.0.1:1111来访问刚才生成的站点，可以看到Welcome to Zola

注意：
zola serve只是为了便于本地管理站点，真实的站点还是需要用专业的web server来提供服务的。

因为zola生成的是一个纯静态网站，所以部署时可选的方案很多，最简单的就是用nginx来配置一个静态网站，把content目录复制到线上即可。

## zola的目录结构

### templates
负责所有页面输出的模版。

#### base.html
所有的元数据，比如标签、\<head>这些
```html
<!DOCTYPE html>

<html lang="en">

<head>
  <meta charset="utf-8">
  <title>MyBlog</title>
</head>

<body>
  <section class="section">
    <div class="container">
      {% block content %} {% endblock %}
    </div>
  </section>
</body>
```

#### index.html
网站首页内容和跳转标题。
```html

{% extends "base.html" %}

{% block content %}

<h1 class="title">
  This is my blog made with Zola.
</h1>
{# 避免被zola解析，get_url写多了\ #}
<p>Click <a href="{{ get\_url(path='@/blog/_index.md') }}">here</a> to see my posts.</p>
{% endblock content %}
```

#### section.html
博客的目录（菜单）
```html
{% extends "base.html" %}

{% block content %}

<h1 class="title">
  {{ section.title }}
</h1>
<ul>
  <!-- If you are using pagination, section.pages will be empty. You need to use the paginator object -->    {% for page in section.pages %}
  <li><a href="{{ page.permalink | safe }}">{{ page.title }}</a></li>
  {% endfor %}
</ul>
{% endblock content %}
```

#### page.html
文章的主题内容
```html
{% extends "base.html" %}

{% block content %}

<nav>
  <a href="/">首页</a>
  <a href="/blog/">目录页</a>
</nav>
<h1 class="title">
  {{ page.title }}
</h1>
<p class="subtitle"><strong>{{ page.date }}</strong></p>
{{ page.content | safe }}
{% endblock content %}
```

### content
content-blog里面的文件夹

使用的是toml语法，包裹在.md文件里面。+++后面说明的是配置。

#### _index.md
定义了博客的目录。

只要文件夹里面有_index.md，就会成为一个section。

```toml
+++
title = "List of blog posts"
sort_by = "date"
template = "section.html"
page_template = "page.html"
+++
```

#### `内容.md`
博客的具体内容。

```toml
+++
title = "My first post"
date = 2019-11-27
+++
# 奇怪杂谈

昨天的运动。
```

## zola主要框架 
大括号加百分号 {% %} 是 Jinja2 模板引擎中的语法，用于在 HTML 文件中嵌入动态内容。

# zola如何链接到内部文章

如果需要链接到其他文章，@代表是content目录，在下面有个文件夹是blog，之后再输入要链接的.md文件全称即可。

```html
[我要链接到zola文章](@/blog/zola.md)
```



## [参考教程](https://blog.zicode.com/zola/zolajiao-cheng-0ru-men/)
