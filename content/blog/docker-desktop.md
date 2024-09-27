+++
title = "Docker Desktop国内访问速度慢？代理设置方式"
date = 2024-09-25
+++

# Docker Desktop加速下载
国内官网下载太慢了，这里有个国内的[下载点](https://smartide.cn/zh/docs/install/docker/osx/)，速度还不错。

# Docker pull加速
发现`docker`从`docker hub`里面`pull`镜像也很慢，可以设置代理。

方法是在Docker Desktop，选中右上角的齿轮-Preferences-Resources-Proxies，设置代理。

注意，**HTTPS里面的代理也要设置成http://的地址**，一开始我不知道，就没有成功。

我的地址是http://127.0.0.1:1087，可以根据你的实际代理情况设置。注意，不是socks5的地址，我的是1080，但是设置了也不行。

![img](https://i.imgur.com/LoNkBY4.jpeg)

[教程参考](https://cloud.tencent.com/developer/ask/sof/108678559)

# Docker 换镜像源
我看到还有一种方法，是换国内的镜像源，但是测试了一下，发现没啥用。[教程参考](https://www.cnblogs.com/Flat-White/p/17107494.html)