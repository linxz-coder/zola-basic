+++
title = "zola自定义语法高亮"
date = 2024-12-26
+++

# 修改配置文件

修改[config.toml](https://www.getzola.org/documentation/getting-started/configuration/#syntax-highlighting)文件。

添加代码：

```toml
[markdown]
extra_syntaxes_and_themes = ["syntaxes", "syntaxes/wxml.sublime-syntax"]
```

# 新建语法高亮规则

根据[官方建议](https://www.getzola.org/documentation/content/syntax-highlighting/)，创建一个`Syntaxes`文件夹，里面新建一个`wxml.sublime-syntax`文件（注意，需要用.sublime-syntax的后缀）。

我找到一个靠谱的[wxml语法高亮仓库](https://github.com/springlong/Sublime-wxapp/blob/master/wxml/WXML.sublime-syntax)。

询问AI，需要的代码如下：

```bash
name: WXML
scope: text.html.wxml
file_extensions:
  - wxml

variables:
  # 定义常用的微信指令
  wx_directives: 'wx:(if|elif|else|for|for-item|for-index|key|model|class|style|model-prop|model-event)'
  # 定义事件绑定
  event_binding: 'bind\w+|catch\w+'

contexts:
  main:
    # 标签开始
    - match: (<)(\/?)(\w+)
      captures:
        1: punctuation.definition.tag.begin.wxml
        2: punctuation.definition.tag.begin.wxml
        3: entity.name.tag.wxml
      push: tag-attributes
    
    # 数据绑定表达式 {{}}
    - match: '{{'
      scope: punctuation.section.embedded.begin.wxml
      push: expression
    
    # 注释
    - match: <!--
      scope: punctuation.definition.comment.wxml
      push: comment

  # 标签属性上下文
  tag-attributes:
    # 标签结束
    - match: '/?>'
      scope: punctuation.definition.tag.end.wxml
      pop: true
    
    # 微信指令属性
    - match: '{{wx_directives}}'
      scope: entity.other.attribute-name.wxml keyword.control.directive.wxml
    
    # 事件绑定
    - match: '{{event_binding}}'
      scope: entity.other.attribute-name.wxml support.function.wxml
    
    # 普通属性
    - match: '\b[\w-]+\b'
      scope: entity.other.attribute-name.wxml
    
    # 属性值
    - match: '='
      scope: punctuation.separator.key-value.wxml
      push: attribute-value

  # 属性值上下文
  attribute-value:
    # 双引号字符串
    - match: '"'
      scope: punctuation.definition.string.begin.wxml
      push: double-quoted-string
    # 单引号字符串
    - match: "'"
      scope: punctuation.definition.string.begin.wxml
      push: single-quoted-string

  # 双引号字符串
  double-quoted-string:
    - meta_scope: string.quoted.double.wxml
    - match: '"'
      scope: punctuation.definition.string.end.wxml
      pop: true
    - include: expression-interpolated

  # 单引号字符串
  single-quoted-string:
    - meta_scope: string.quoted.single.wxml
    - match: "'"
      scope: punctuation.definition.string.end.wxml
      pop: true
    - include: expression-interpolated

  # 表达式内容
  expression:
    - meta_scope: source.wxml.embedded.expression
    - match: '}}'
      scope: punctuation.section.embedded.end.wxml
      pop: true
    - match: '\b(true|false|null|undefined)\b'
      scope: constant.language.wxml
    - match: '\b\d+\b'
      scope: constant.numeric.wxml
    - match: '\b[a-zA-Z_]\w*\b'
      scope: variable.other.wxml

  # 表达式插值
  expression-interpolated:
    - match: '{{'
      scope: punctuation.section.embedded.begin.wxml
      push: expression

  # 注释
  comment:
    - meta_scope: comment.block.wxml
    - match: '-->'
      scope: punctuation.definition.comment.wxml
      pop: true
```
