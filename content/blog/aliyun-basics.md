+++
title = "阿里云基本操作-远程连接、上传文件、删除文件"
date = 2023-09-30
+++

# 一、登录阿里云

用支付宝/钉钉/阿里云 app均可以扫码登录阿里云

# 二、远程连接

远程连接有两种方法：官网远程连接和本地 terminal 连接。

## 官网远程连接

1.官网直接点击"远程连接"。

2.点击 Workbench 远程连接。

选择公网连接，输入用户名和密码即可。

## 本地 terminal 连接

```bash
ssh root@公网地址
```

输入密码即可连接。

不过，测试下来，Workbench连接比本地terminal快和稳定。

# 三、上传文件

以下需要在本地 terminal 中操作。

scp 本地文档位置 user@公网IP: 远程文档位置

```bash
scp /Users/lxz/Downloads/test.txt root@1.118.72.177:/root
```

注意：需要输入远程主机密码才能上传成功。如果要上传文件夹，而不是文件，要加-r，比如：

```bash
scp -r /Users/lxz/Downloads/test root@1.118.72.177:/root
```

## 远程文档下载到本地

scp user@公网IP: 远程文档位置 本地文档位置

```bash
scp root@1.118.72.177:/root/requirements.txt /Users/lxz/Desktop
```

# 四、删除文件

远程登录主机后，执行rm指令：

```bash
rm test.txt
```
