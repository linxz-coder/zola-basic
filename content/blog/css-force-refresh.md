+++
title = "如何让浏览器无视缓存，强制刷新css？"
date = 2024-11-12
+++

很多浏览器会保留css缓存记录，强制刷新也没用。这个时候最简单的方法是`给css文件加上版本号`。

这样一来，就骗过浏览器，认为这是一个完全不同的css文件。

方法：

将引入的css后面加个版本号即可，格式是`?v=时间戳`

```html
  <link rel="stylesheet" href="/css/tailwind-like.css?v=20241112140800">
```

v后面是时间戳。
