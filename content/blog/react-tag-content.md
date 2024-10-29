+++
title = "react如何获取组件标签中的内容？"
date = 2024-10-29
+++

不知道大家有没在组件标签中写过内容，比如：

```javascript
<A>Hello<A/>
```

这个时候，Hello这个字符并不会在首页显示出来。

我们需要借助props.children来显示。

需要在A组件中加上以下代码：

```javascript
{/* 其他内容 */}
{this.props.children}
```

这样，Hello才能够正常显示。
