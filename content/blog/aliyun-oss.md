+++
title = "如何设置阿里云OSS图床"
date = 2024-09-26
+++

# 购买OSS空间
在阿里云首页，输入`对象存储OSS`，进入对象存储OSS页面。

新用户可以试用3个月，20G空间，之后需要付费。

付费可以选40G空间的，6个月，4.98元。（实际上是40+元/年，可以看后面加个备注）

免费试用的套餐：

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/20240924232712.png)

付费价格：
选择OSS资源包-40G。
![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/20240924232848.png)

价格备注-2024年10月更新：

注意，我续费的时候发现，成本并非是4元，而是40+。

因为除了存储容量，还要买流量和请求包，不然不让请求。

我的总成本是：

20G资源包 1年 25元（变贵了）
下行流量包 1年 14元
请求包	1年 2元

`总成本40+元/年`

# 创建用户及其配置OSS权限
## 创建用户
因为默认用户拥有最高权限，可以操作你的所有阿里云资源，所以不推荐使用默认用户。

我们需要创建一个子用户，然后给这个子用户配置OSS权限。

选择你的头像-`AccessKey管理`-`新建AccessKey`-`开始使用子用户AccessKey`-`创建用户`。
随便起个名字，选择OpenAPI的权限即可。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/20240924233549.png)

## 配置OSS权限
在OSS页面，点击`用户`-`添加权限`-`新增授权`，选择所有和OSS有关的权限。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/20240924232349.png)

# 配置OSS
## 创建Bucket
Bucket是OSS的基本存储单元，类似于文件夹。

进入[OSS控制台](https://oss.console.aliyun.com/overview)，点击`Bucket列表`-`创建Bucket`，随便改个名字，选择存储区域，其他默认即可。

注意选择”公共读“，这样你上传的图片才能被访问。

选择“本地冗余存储”，而不是“同城冗余存储”，因为后者是收费的。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/20240924234022.png)

## 创建文件夹（可选）
点击Bucket名字，`新建目录`，起个名字叫`images`就可以了，当然，你也可以取其他名字。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/20240924234250.png)

## 配置域名（可选）
`Bucket配置`-`域名管理`，这里可以输入你的已备案的域名，好处是Bucket名称或者地区变了，图片的地址就不需要变了。

# 可选-配置PicGo
PicGo是一个图床工具，可以实现本地快速上传，自动复制链接到剪贴板。

存储区域就是你的OSS区域，比如`oss-cn-shenzhen`。

按照下图配置即可。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/20240924233803.png)

# 开通全球加速

如果开通时，选择的是大陆地区（比如我选了深圳），
国外是无法访问的。

解决方案是`传输加速`。

打开Bucket列表，选择开启传输加速即可，不过流量费会增加。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202412100922448.png)

开通后，默认的链接比如`yourname.oss-cn-shenzhen.aliyuncs.com`还能用，但如果要全球访问，要换一个`yourname.accelerate.com`的链接。

原理很简单，阿里本来有分布全球的CDN，但是不能免费给你用，用了就要流量收费。

还是CloudFlare佛心啊。

## 参考
[阿里云教程](https://developer.aliyun.com/article/787128)
[PicGo配置教程](https://picgo.github.io/PicGo-Doc/zh/guide/config.html#%E9%98%BF%E9%87%8C%E4%BA%91oss)
