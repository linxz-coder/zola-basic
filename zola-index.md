+++
title = "zola首页如何展示文章？"
date = 2024-09-27
+++

zola官方给的代码：
```html
<div class="posts">
    {% for page in paginator.pages %}
        <article class="post">
            {{ post_macros::title(page=page) }}
            <div class="post__summary">
                {{ page.summary | safe }}
            </div>
            <div class="read-more">
                <a href="{{ page.permalink }}">Read more...</a>
            </div>
        </article>
    {% endfor %}
</div>
<nav class="pagination">
    {% if paginator.previous %}
        <a class="previous" href="{{ paginator.previous }}">‹ Previous</a>
    {% endif %}
    {% if paginator.next %}
        <a class="next" href="{{ paginator.next }}">Next ›</a>
    {% endif %}
</nav>
```

但是，这个代码有个问题，就是只能读取根目录下的文章。

内置变量`paginator`对应的就是content文件夹下的section，对应的模版文档是`_index.md`文件。

如果你的文章不在`content`文件夹下，那么这个代码就不适用了。

我的代码是在`/content/blog`文件夹下，所以我需要修改这个代码。写个新的变量，获取新的`section`，然后遍历这个`section`。

```html
{% set blog_pages = get_section(path="blog/_index.md") %}
{% for page in blog_pages.pages %}
```

以上就是关键的代码。

完整代码如下：
```html
{% extends "base.html" %}

{% block content %}

<h1 class="title" style="font-family: 'Taipei-Sans-TC-Beta-Light-2';">
  一榻梦生琴上月，百花香入案头诗。
</h1>

<div class="posts">
  {% set blog_pages = get_section(path="blog/_index.md") %}
  {% for page in blog_pages.pages %}
      <article class="post">
        <div class="post-title"><a href="{{page.permalink}}" class="post-title-link">{{ page.title }}</a></div>
        <div>
          {# summary #}
          {{ page.content | striptags | truncate(length=150) | safe }}
        </div>
        <div class="read-more">
            <a>未完待续...</a>
        </div>
      </article>
  {% endfor %}
</div>

{% endblock content %}
```

## 参考
[zola论坛](https://zola.discourse.group/t/pagination-not-being-generated/237/8)

[zola官方文档](https://www.getzola.org/documentation/templates/pagination/)