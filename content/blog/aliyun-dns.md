+++
title = "如何用阿里云解析域名？"
date = 2023-10-06
authors = ["小中"]
+++

进入阿里云管理平台：

1. 搜索`域名解析`

2. 点击`解析设置`，修改DNS地址为以下地址：

`ns1.alidns.com`

`ns2.alidns.com`

3. 添加A记录和CNAME记录：

添加两条A记录，一条是www，一条是@，指向公网IP

![aliyun-dns1](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/aliyun-dns1.png)