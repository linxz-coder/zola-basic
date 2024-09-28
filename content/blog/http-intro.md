+++
title = "什么是HTTP"
date = 2024-09-28
+++


hypertext transport protocol，即超文本传输协议。

这是一种协议，一种约定，一种规则。

# 什么约定
约定两块内容，一是`请求报文`，二是`响应报文`。

重点是四大块，`行`、`头`、`空行`、`体`。

可以通过浏览器的`开发者工具`->`network`查看，详细信息可以勾选`原始`.

## 请求报文
`请求行`：GET/URL/HTTP/1.1

很少字，通常就是GET，URL，200这些.

`请求头`：Host/User-Agent/Referer/Accept/Connection...

很多字，是浏览器显示请求内容的最大篇幅部分。

`空行`：空行

要求必须有，但是浏览器不显示。

`请求体`：username=linxz&password=123

POST请求时，数据放在请求体中。GET请求可以没有。

## 响应报文
`响应行`：HTTP/1.1 200 OK

200是状态码，OK是响应字符串。

`响应头`：Content-Type/Content-Length/Date...

`空行`：空行

`响应体`：html/css/js内容