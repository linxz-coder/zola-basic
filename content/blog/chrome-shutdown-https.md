+++
title = "关闭谷歌chrome自动重定向https"
date = 2023-10-22
+++


在chrome如果登录过https的网站，比如我的网站https://www.183441.xyz，就会自动记住，清除缓存都没用。今天看到一个方法：

打开Chrome并在地址栏输入：

```bash
chrome://net-internals/#hsts
```

在出现的页面选择：`Delete domain security policies`

下面的Domain写上你的网址：183441.xyz，就可以清除https自动重定向。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/https-chrome-setup.png)

这对于调试很有帮助。

亲测有效。

另外，其实你可以换别的浏览器，firefox或者safari，看看是否chrome的问题，或者直接不用chrome?
