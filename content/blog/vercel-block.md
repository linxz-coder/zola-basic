+++
title = "解决vercel域名被墙"
date = 2023-10-06
+++

两种方法：

# 方法一：使用vercel国内专供的A记录和CNAME记录

A记录地址：76.223.126.88

CNAME 记录地址：cname-china.vercel-dns.com

可以用阿里云来解析。

实验下来，这个方法也是很容易被墙，我的域名坚持了一天就不行了，请使用方法二吧。

# 方法二：域名解析到cloudflare

因为cloudflare会随机改变用户访问的DNS地址，而不是原本被访问到的vercel地址。

[cloudflare的解析教程](@/blog/cloudflare-dns.md)

