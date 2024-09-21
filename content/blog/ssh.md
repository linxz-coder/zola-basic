+++
title = "如何用ssh钥匙对登录远程主机（服务器）？"
date = 2024-09-21
+++

首先，你需要一个公钥和私钥，如果没有，可以使用`ssh-keygen`命令生成。

## 生成密钥对

```bash
ssh-keygen -t rsa -b 4096 -C "
```

代码中的`-t`表示密钥类型，`-b`表示密钥长度，`-C`表示注释，可以不填。

## 查看公钥

```bash
cat ~/.ssh/id_rsa.pub
```

## 查看私钥

```bash
cat ~/.ssh/id_rsa
```

## 登录远程主机并添加公钥

```bash
cd ~/.ssh
```

传入公钥，我这里的公钥名字是authorized_keys

## 设置sshd_config
/etc/ssh/sshd_config

```bash
PubkeyAuthentication yes
PasswordAuthentication yes
```
允许公钥登录。
实测，也可以保留密码登录。

## 重启sshd服务

```bash
sudo systemctl restart sshd
```
