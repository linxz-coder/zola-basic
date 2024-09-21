+++
title = "从零开始自动申请Let's Encrypt证书（三个月有效，自动续期）"
date = 2024-09-21
+++

# 安装nginx
## 安装软件包
为什么要安装nginx？一开始我看教程不懂，以为只是要测试证书是否成功，所以需要一个web服务器。

其实，nginx在这里的用途是，配置证书。如果不进入nginx配置，证书是无法生效的。

基于CentOs系统，安装：
```shell
sudo yum install epel-release
sudo yum install nginx
```

Nginx不包含在默认的仓库中，所以你需要添加EPEL仓库。

## 启动nginx
```shell
sudo systemctl start nginx
```

## 开机启动nginx
```shell
sudo systemctl enable nginx
```

## 查看nginx状态
```shell
sudo systemctl status nginx
```

## 查看nginx配置文件
```shell
sudo nginx -t
```
通常在`/etc/nginx/nginx.conf`中。


# 配置域名和server
## 解析域名-添加一个A记录
指向你的服务器IP地址。

## 查看是否成功
```shell
ping yourdomain.com
```
出现你的服务器IP地址，说明解析成功。

## 架设一个简单的web服务
```shell
sudo vim /etc/nginx/nginx.conf
```
看看root的路径，一般是`/usr/share/nginx/html`。

在`root`设置下方，输入 `index index.html`.
同时，`server_name`设置为你的域名。

```shell
server {
    listen       80;
    server_name  yourdomain.com;
    root         /usr/share/nginx/html;
    index        index.html;
}
```


`:wq`退出，输入：

```shell
echo 'Hello, World!' | sudo tee /usr/share/nginx/html/index.html
```

## 重启nginx
```shell
sudo systemctl restart nginx
```

现在，访问你的域名，应该可以看到Hello, World!。
实测，chrome可能不会正常显示，可以试试firefox。我最后是用curl命令测试的：
```shell
curl yourdomain.com
```
如果出现Hello, World!，说明你的web服务已经架设成功。


# 配置SSL证书
## 安装acme
```shell
curl https://get.acme.sh | sh -s email=my@example.com
```
这里的email是你的邮箱地址。

## 给acme.sh设置别名
```shell
sudo vim ~/.bashrc
```
加上：
```shell
alias acme.sh='/root/.acme.sh/acme.sh'
```
然后：
```shell
source ~/.bashrc
```
这样，就可以直接用`acme.sh`命令了。

## 切换服务器到letsencrypt
```shell
acme.sh  --set-default-ca --server letsencrypt
```
acme.sh默认的是ZeroSSL，但是ZeroSSL不大稳定，所以我们切换到letsencrypt。

当然，你也可以不切换，直接用ZeroSSL。但你可以看看网上[对ZeroSSL延时的不满](https://github.com/acmesh-official/acme.sh/issues/3842)。

## 注册账号
```shell
acme.sh --register-account -m my@example.com
```
实测下来，国内服务器时间可能会花得比较久，可以试一下这个方法：
```shell
sudo vim ~/.acme.sh/account.conf
```
将邮箱填入即可。

## 设置access key
由于我们接下来需要DNS验证，所以需要获取access key。由于我是阿里云解析的，就说阿里云的步骤：
### 登录阿里云网站
https://ram.console.aliyun.com/manage/ak

生成一个 key 和 secret

### 设置环境变量
```shell
export Ali_Key="yourkey"
export Ali_Secret="yoursecret"
```

## 生成证书
```shell
acme.sh --issue --dns dns_ali -d linxz.online -d *.linxz.online
```
成功后，会提示你证书的位置。通常在`/root/.acme.sh/yourdomain.com`。
有用的是两个文件：`fullchain.cer`和`yourdomain.com.key`。


## 配置证书
### 完成nginx-443端口配置
打开nginx配置文件：
```shell
sudo vim /etc/nginx/nginx.conf
```
完成443端口的配置：
```shell
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    
    server_name linxz.online;
    ssl_certificate /home/lighthouse/.acme.sh/linxz.online_ecc/fullchain.cer;
    ssl_certificate_key /home/lighthouse/.acme.sh/linxz.online_ecc/linxz.online.key;
    client_max_body_size 100m;

    location / {
        root  /usr/share/nginx/html;
        index index.html;
    }
}
```

### 重启nginx
```shell
sudo systemctl restart nginx
```

### 测试
再次通过curl命令测试：
```shell
curl https://linxz.online
```
如果出现Hello, World!，说明你的证书配置成功。

## 安装证书自动更新
```shell
acme.sh --installcert -d linxz.online --key-file /home/lighthouse/.acme.sh/linxz.online_ecc/linxz.online.key --fullchain-file /home/lighthouse/.acme.sh/linxz.online_ecc/fullchain.cer --reloadcmd "sudo systemctl reload nginx"
```

# 自动更新
## 查看定时任务
```shell
crontab -l
```
你可以看到以下命令：
```shell
45 12 * * * "/home/lighthouse/.acme.sh"/acme.sh --cron --home "/home/lighthouse/.acme.sh" > /dev/null
```
这个命令的意思是，每天12:45，自动更新证书。

## 自动更新acme.sh
```shell
acme.sh --upgrade --auto-upgrade
```
这样，acme.sh就会自动更新了。


## 参考
1. [古时的风筝-用这个方法，免费、无限期使用 SSL(HTTPS)证书，从此实现证书自由了](https://mp.weixin.qq.com/s/tCcsyF3oLU8zrBAKO2JPow)