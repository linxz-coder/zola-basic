+++
title = "nginx常用命令"
date = 2024-09-21
+++

nginx是常用的web服务器，替代的web服务器还有apache。

## 怎么找到nginx的配置文件-nginx.conf
### 方法一：通过nginx -t命令
```bash
nginx -t
```
### 方法二：通过find命令
```bash
sudo find / -name nginx.conf
```
意思是从根目录/开始查找nginx.conf文件。

## 安装nginx
### 对于Ubuntu/Debian系统
```bash
sudo apt update
sudo apt-get install nginx
```
需要先更新apt-get，然后再安装nginx。

### 对于CentOS/RHEL系统
```bash
sudo yum install epel-release
sudo yum install nginx
```
Nginx不包含在默认的仓库中，所以你需要添加EPEL仓库。

## 启动nginx
```bash
sudo systemctl start nginx
```

## 开机启动nginx
```bash
sudo systemctl enable nginx
```

## 查看nginx状态
```bash
sudo systemctl status nginx
```

## 查看修改后的配置是否正确
```bash
sudo nginx -t
```

## 重启nginx
```bash
sudo systemctl restart nginx
```
这里的restart是重启，reload是重新加载配置文件。实践下来，两者差不多。