+++
title = "如何免费获得SSL证书-让阿里云免费给你的网站「上锁」"
date = 2020-05-18
+++

说明：这篇文章的方法已经过时，仅做记录需要。阿里云的证书已经收费。免费证书可以看[letsencrypt](@/blog/certbot.md)这篇文章。

正文如下：

作为一个网络小白，为了提高网站的搜索排名，我稍微研究了一下必要条件，发现google很在意一个事情，就是https证书，”s”代表security（安全），即上锁的意思。

简单来说，一般的网页生成后网站名称是http://www.linxiaozhong.club，而加了https证书的网站则可以通过https://www.linxiaozhong.club到达。

HTTP 网站的左上角有“不安全”字样，也就是说在这样的网站输入个人信息是不安全的，特别是信用卡等付款信息。

通过https验证后，也就是拿到证书后，网站会多一个小锁头。点进去可以看到网站有“证书”，即已经通过验证。

这个证书有什么用呢？1、保护你的网站；2、增加谷歌google排名的权重（百度也正要开始推https了）

那么如何获取这个证书呢？下面我以阿里云获取证书的流程为例，说一下具体步骤：

1、登陆阿里云，搜索“SSL证书”，选择“选购证书”

2、选择“单域名”-“DV SSL”-“免费版”，点击“立即购买”即完成证书的购买过程

3、付款后，会来到证书申请页面，需要填基本资料：你的域名、姓名、手机号、邮箱之类的。其他的选项都选择阿里云默认的选项即可

4、证书申请后，稍等10几分钟后你登记的邮箱就会收到申请成功邮件，接下来就是下载部署证书了！

因为本文篇幅问题，部署证书下一篇文章：如何下载和部署SSL证书

2022年3月14日更新：

下载购买证书的环节改变了，这次可以直接购买20个，还是一样选择DV证书。






