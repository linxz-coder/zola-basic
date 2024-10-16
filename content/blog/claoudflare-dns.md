+++
title = "如何在cloudflare解析域名？"
date = 2023-10-06
+++

1. 注册cloudflare账号

2. 点击添加站点

![cloudflare-dns1](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/cloudflare-dns1.png)

3. 选择免费计划

![cloudflare-dns2](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/cloudflare-dns2.png)

4. 改变nameserver

![cloudflare-dns3](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/cloudflare-dns3.png)


![cloudflare-dns4](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/cloudflare-dns4.png)


![cloudflare-dns5](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/cloudflare-dns5.png)

5.稍等几分钟，完成全过程。

实测下来，有时候速度也很慢。我阿里云的解析过去，需要半小时。半小时后，cloudflare会发邮件给你。

如果你的网站涉及vercel的解析，可能还需要半小时-1小时，vercel完成解析会发邮件给你。

所以不要干等和刷新，干点别的先。

值得注意的是，最后你要需要调整一下cloudflare的SSL/TLS，从”灵活“改成”完全“，否则会出现”重定向过多“的错误。

![cloudflare-dns6](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/cloudflare-dns6.png)

如果中间有邮件告诉你，网址已经被cloudflare删除。这个也不用担心，完全是正常现象。


![cloudflare-dns7](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/cloudflare-dns7.png)



