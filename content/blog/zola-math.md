+++
title = "Zola使用数学公式"
date = 2024-11-18
+++

zola博客支持latex语法，安装katex就可以了。

```html
{# templates/base.html #}

<!DOCTYPE html>
<html lang="en">
<head>
    <!-- 添加 KaTeX CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
    <!-- 添加 KaTeX JS -->
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
    <!-- 添加 auto-render 扩展，用于自动渲染页面中的数学公式 -->
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>
    
    <!-- 其他头部内容 -->
    {% block head %}{% endblock %}
</head>
<body>
    {% block content %}{% endblock %}
    
    <!-- 配置 KaTeX 自动渲染 -->
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            renderMathInElement(document.body, {
                delimiters: [
                    {left: "$$", right: "$$", display: true},
                    {left: "$", right: "$", display: false},
                    {left: "\\[", right: "\\]", display: true},
                    {left: "\\(", right: "\\)", display: false}
                ],
                throwOnError: false
            });
        });
    </script>
</body>
</html>
```


在你的 Markdown 文件中，你可以用以下方式写数学公式：

* 行内公式：使用单个美元符号，如 $E=mc^2$
* 独立公式：使用双美元符号，如 $$E=mc^2$$
* 也支持 LaTeX 风格的 \( \) 和 \[ \] 分隔符
* 如果需要在公式中使用反斜杠，要使用双反斜杠
* 注意：乘号不要用*，要用\times
