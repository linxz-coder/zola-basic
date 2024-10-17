+++
title = "wordpress转移到阿里云（非wordpress镜像）需要注意什么？"
date = 2023-10-22
+++

首先要安装mysql和php，这是wordpress必备项。

# 新主机安装mysql

由于wordpress默认的数据库配置是mysql，因此需要在新主机提前安装。

首先需要确保 Ubuntu 的包列表是最新的：

```bash
sudo apt update
```

安装 MySQL 服务器:

```bash
sudo apt install mysql-server
```

配置 MySQL:

这个工具将会提示你设置 root 用户的密码、删除匿名用户、禁止 root 远程登录和删除测试数据库。对于大多数情况，推荐选择默认配置（通常是输入 “y”）。

我在这里设置用户是root，密码是”，你可以根据实际情况设置。

```bash
sudo mysql_secure_installation
```

启动和启用 MySQL 服务:

```bash
sudo systemctl status mysql
```

确保 MySQL 服务在开机时自动启动：

```bash
sudo systemctl enable mysql
```

登录 MySQL:

```bash
sudo mysql -u root -p
```

输入你在 mysql_secure_installation 中设置的密码。

可选：这里可以选择在安全组里面打开3306，这是mysql默认使用的端口，暂没发现如果没打开这个端口会有什么问题。

# 创建数据库wordpress

在mysql界面，直接创建：

```bash
CREATE DATABASE wordpress CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

这里的[database_name]通常是wordpress，注意要带上分号；，不然命令会不成功。

CHARACTER和COLLATE其实是输出的是默认项，即utf8，上面mb4不影响。

## 测试是否创建成功

登录mysql后，连接数据库：

```bash
USE wordpress;
```

显示表格：

```bash
SHOW TABLES;
```

这一步就会显示出所有的表名。

退出MYSQL：

```bash
EXIT #或者quit
```

如果在mysql输入错误，点击ctrl+c可以返回上一步。

# 安装PHP

更新包列表：

```bash
sudo apt update
```

安装php：

使用以下命令安装PHP及其常用模块：

```bash
sudo apt install php php-cli php-fpm php-json php-common php-mysql php-zip php-gd php-mbstring php-curl php-xml php-pear
```

验证安装：

```bash
php -v
```

# 可选步骤：安装wordpress

如果你把备份的wordpress拷贝过去，一般不需要操作这一步。但是如果你发现新的文件有各种各样的问题，或者文件损坏，这时候最好就安装新的wordpress，再把wp-content和wp-admin文件夹的内容拷贝过去。

下载WordPress:

```bash
cd /tmp
wget https://wordpress.org/latest.tar.gz
tar xzvf latest.tar.gz
```

将WordPress文件复制到web服务器的文档根目录下：

```bash
sudo cp -a /tmp/wordpress/. /var/www/html
```

配置文件权限:

为了确保WordPress能够正确地工作，您需要更改文件和目录的所有权：

```bash
sudo chown -R www-data:www-data /var/www/html
```

注：wordpress默认用户是www-data，所以在给它设置文件夹的权限。这个用户名也会体现在Nginx的配置中。

# 备份数据库和wordpress文件夹

针对原主机上，在terminal上执行下面的操作以备份数据库到本地：

```bash
 scp root@149.129.84.1:/home/admin/backup.sql /Users/lxz/Desktop
 ```

 执行下面操作备份wordpress文件夹：

 ```bash
 scp root@149.129.84.1:/data/wwwroot/wordpress/wordpress_backup.tar.gz /Users/lxz/Downloads
 ```

 这个步骤会比较久，因为文件比较大。

 # 推送备份到新主机

 数据库备份：

 ```bash
 scp /Users/lxz/Downloads/backup.sql root@8.217.65.15:/root
 ```

 wordpress备份：

 ```bash
scp /Users/lxz/Downloads/wordpress_backup.tar.gz root@8.217.65.15:/root
```

同样，文件大了，这个过程会比较久。

当然，有人肯定注意到了，其实不需要经过本地这个“二道贩子”，直接云主机间传输的。我这次没有尝试这个方式，下次会试一下。

好了，这样一来，新主机就有源主机的wordpress配置信息和数据库了。下面的操作都是在新主机完成的了。

# 设定文件夹 /var/www/html

上面的流程，我们把备份文件放在了root文件夹，这不是最佳实际，最好是放在/var/www/html文件夹内。移动文件夹：

```bash
sudo mv /root/* /var/www/html/
```

如果你需要的是拷贝：

```bash
sudo cp -r /root/* /var/www/html
```

将root下面的文件全部复制到/var/www/html中去。

设置适当的权限：

```bash
sudo chown -R www-data:www-data /var/www/html/
sudo find /var/www/html/ -type d -exec chmod 755 {} \;
sudo find /var/www/html/ -type f -exec chmod 644 {} \;
```

# Nginx设置

由于我使用的nginx，所以下面都是Nginx的配置，aphache请自行GPT。

我的nginx.conf配置如下：

关键点有三个：

1. 设定server_name，root文件夹，和要用作主页的index

2. 设定location里的index.php

3. 设定php的路径

```bash
user www-data;
#user root;
worker_processes auto;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;

events {
        worker_connections 768;
        # multi_accept on;
}

http {

        ##
        # Basic Settings
        ##

        sendfile on;
        tcp_nopush on;
        types_hash_max_size 2048;
        # server_tokens off;

        # server_names_hash_bucket_size 64;
        # server_name_in_redirect off;

        include /etc/nginx/mime.types;
        default_type application/octet-stream;

        ##
        # SSL Settings
        ##

        server {
        #listen 443 ssl;
        listen 80;
        #server_name 183441.xyz;
        server_name 183441.xyz;
        root /var/www/html;
        index index.php;
        #index index.html index.php;



        location / {
        try_files $uri $uri/ /index.php?$args;


        #       proxy_pass http://localhost:3000;
        #       proxy_pass https://commonlearner.com;
        #       proxy_set_header Host $host;
        #       proxy_set_header X-Real-IP $remote_addr;
        #       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        #        proxy_set_header X-Forwarded-Proto $scheme;
        }

        #处理php
        location ~ \.php$ {
         include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock; # 请注意这里使用了 8.1 的套接字
        # fastcgi_index index.php;
        }

        location /phpMyAdmin {
        root /var/www/html;
        index index.php index.html index.htm;
        }

        ##
        # Logging Settings
        ##

        access_log /var/log/nginx/access.log;
        error_log /var/log/nginx/error.log;

        ##
        # Gzip Settings
        ##

        gzip on;

        include /etc/nginx/conf.d/*.conf;
        include /etc/nginx/sites-enabled/*;
}
```

注：phpmyadmin可以根据需要设置，非必要

## 如果nginx没有运行

确认Nginx是否正在运行：

```bash
ps aux | grep nginx
```

如果不是active的状态，启动Nginx：

```bash
sudo systemctl start nginx
```

重新加载nginx配置：

```bash
sudo nginx -s reload
```

如果问题还存在，检查nginx配置中的错误：

```bash
sudo nginx -t
```

## Nginx启动不了？

通常是别的服务占用了80端口，可能是apache，找出正在使用端口80的进程：

```bash
sudo netstat -tuln | grep :80
```

杀死占用端口80的进程：

```bash
sudo kill -9 [PID]
```

再次查看占用的程序：

```bash
sudo lsof -i :80
```

再次启动Nginx：

```bash
sudo systemctl start nginx
```

# 改变数据库默认登录方式

这一步非常关键！！！！特别是Ubuntu系统要看。我在这一步卡了两天。

因为连接到主机IP地址后，总是显示“数据库连接错误”，各种排查都找不到原因。最后还是无意中GPT提到的这个方法——改变数据库默认登录方式，从私钥验证改成密码验证，就成功了。

首先登录mysql，这里username是root，-p是输入密码的意思。我的密码是空，所以接着按回车就可以；

```bash
mysql -u root -p
```

接着将mysql默认的身份验证方式改成密码验证，我没设置密码，因此是空字符”；

```bash
ALTER USER 'root'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY '';
```

# 手动改变wordpress主题的首页链接

因为发现首页会自动跳转到以前的旧网址，一排查原因发现是主题内设定了自定义链接。

在后台进入主题设置，改变主页地址，从www.linxiaozhong.club改到183441.xyz就可以了。

# wp-admin无法登录？

通常是wp_options的问题，这个可以在mysql里面改。

主机登录mysql后，

检查当前siteurl和home的值：

```bash
SELECT option_name, option_value FROM wp_options WHERE option_name='siteurl' OR option_name='home';
```

更新siteurl和home值:

```bash
UPDATE wp_options SET option_value='http://your_domain_or_IP' WHERE option_name='siteurl';
UPDATE wp_options SET option_value='http://your_domain_or_IP' WHERE option_name='home';
```

退出MySQL:

```bash
exit;
```

通常这就搞定了。

# 其他wordpress错误

可以通过日志了解。

将wp-config.php文件里的debug设置为true，可以给你更多的信息。

```bash
define('WP_DEBUG', true);
```
