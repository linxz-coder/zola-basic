+++
title = "如何一键部署网站 – vercel"
date = 2023-09-26
+++

首先，vercel会提供一个域名，需要科学上网才能访问。所以，请自己看下是否符合需求。

最简单的方式是将项目托管到 github，直接连接 github 一键部署，以下是步骤：

进入 vercel 首页，点击”Add New…”和”Project”

![vercel1](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/vercel1.png)

输入你想要部署的 github 项目，点击”import”：

![vercel2](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/vercel2.png)

输入项目名字和系统变量（即.env里面的变量），点击”deploy”即可完成，过程耗时1-2分钟。

![vercel3](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/vercel3.png)

# 如何绑定域名：

在 vercel project 上的 domain 输入 域名:

![vercel4](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/vercel4.png)

下一步是去 namesilo，点击“蓝色小星球”，把 A TYPE 和 CNAME TYPE 都写上：

![vercel6](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/vercel6.png)
![vercel7](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/vercel7.png)

最后改一下server name：

vercel通知：

![vercel8](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/vercel8.png)

namesilo可以直接点击domain的名字，进入以下页面改动：

![vercel9](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/vercel9.png)

等待5分钟左右，即成功。如果不成功，检查一下vercel-Domains页面：

![vercel10](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/vercel10.png)

![vercel7]()

