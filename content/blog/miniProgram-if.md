+++
title = "小程序条件渲染"
date = 2024-12-26
+++

控制页面的展示和隐藏。

两种方式：

1. 使用`wx:if`, `wx:elif`, `wx:else`属性组； 
2. `hidden`属性。

wxif 和hidden 二者的区别：

1. wxif：当条件为 true 时将结构展示出来，否则结构不会进行展示，通过`移除/新增节点`的方式来实现

2. hidden：当条件为 true 时会将结构隐藏，否则结构会展示出来，通过 `display 样式属性`来实现的

# wxif属性组代码：

```wxml
<!-- wx:if 属性组 -->
<!-- wx:if wx:elif wx:else -->
<!-- 只有对应的条件成立，属性所在的组件才会进行展示 -->
<view wx:if="{{ num === 1 }}">num 等于 {{ num }}</view>
<view wx:elif="{{ num === 2 }}">num 等于 {{ num }}</view>
<view wx:else>num 大于 2， 目前 num 等于 {{ num }}</view>
```

# hidden属性代码：

```wxml
<view hidden="{{ !isFlag }}">如果 isFlag 是 true，展示结构，否则隐藏结构</view>
```
