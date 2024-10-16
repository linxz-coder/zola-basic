+++
title = "nextjs 网站搬上阿里云需要什么？"
date = 2023-10-13
+++

# 1.首先你需要一个网站（废话）

# 2.你需要一个阿里云服务器（废话）

阿里云服务器选择最低配，但是注意cpu不要选择0.5核的，实测下来下载速度贼慢。

特别是在npm install的时候。

# 3.npm install慢解决方法

https://developer.aliyun.com/article/834193

用国内的镜像，通过这三步：

换上阿里巴巴镜像

```bash
npm config set registry https://registry.npmmirror.com
```

实测下来，这个镜像有时候也很慢，不知道是不是因为我的服务器在香港的缘故，下面淘宝镜像我还没试，可以一试：

可选

```bash
npm config set registry https://registry.npm.taobao.org
```

查看是否更换成功

```bash
npm config get registry
```

可以办正事了

```bash
npm i
```

# 4.云主机必要安装

必须安装npm和node

```bash
sudo apt install nodejs npm
```

检查是否安装成功

```bash
node -v
npm -v
```

# 5.买个域名

可以在namesilo或者阿里云购买，注意阿里云购买需要实名认证，上传身份证并验证（大约需要20分钟），namesilo买则很丝滑。

但我发现阿里云买更便宜，买了个.life后缀的域名，10年180+，很划算。

阿里云买域名后要自己解析，用阿里云的DNS解析地址：

ns1.alidns.com

ns2.alidns.com

再添加两条A记录，一条主机记录是@，一条主机记录是www，都指向你的云主机公网IP即可。

# 6.npm run build

npm i之后，执行npm run build，成功后就可以执行npm start了！

npm start成功后，程序会运行在3000端口，记得在阿里云安全规则中打开3000接口，允许所有计算机访问（0.0.0.0/0），这样外网才能访问到这个应用。

但是，现在用户用通过 公网IP:3000 才能访问到你的应用。所以我们还需要通过nginx设置来让用户直接访问你的网站。

通常，你可以在 /etc/nginx/sites-available/ 下找到默认的 Nginx 配置，通常命名为 default。使用你喜欢的文本编辑器编辑它：

```bash
sudo vim /etc/nginx/sites-available/default
```

在 server 块中，你可以添加或修改 location 指令以设置反向代理。例如，将所有请求代理到在 3000 端口运行的 Next.js 应用程序：

```bash
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    server_name your_domain_or_ip;  # 替换为你的域名或 IP 地址

    location / {
        proxy_pass http://localhost:3000;  # 将请求代理到本地的 3000 端口
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

重新加载 Nginx：

保存并关闭配置文件后，重新加载 Nginx 以应用更改：

```bash
sudo systemctl reload nginx
```

现在，重新执行 npm start 已经可以正常在公网IP上访问你的网站了，原理是直接访问你HTTP口（prot:80），nginx通过反向代理转到localhost:3000，所以就成功了。

# 7.让网站一直运行

## 使用 PM2

PM2 是一个流行的 Node.js 进程管理器，可以使应用持续运行，自动重启应用程序如果它崩溃了，并在系统重启后启动应用程序。

安装：

```bash
npm install pm2 -g
```

启动：

```bash
pm2 start npm --name "my-next-app" -- start
```

pm2 startup

```bash
pm2 startup
```

保存当前的 PM2 进程列表

```bash
pm2 save
```

查看pm2进程

```bash
pm2 list
```

停止pm2进程

```bash
pm2 stop <app_name_or_id>
pm2 stop all #停止所有
```

重启pm2

```bash
pm2 restart <app_name_or_id>
```

彻底删除pm2

```bash
pm2 delete <app_name_or_id>
```

# 8.下一步

获取SSL证书，把网址变成HTTPS安全模式。

探索下来，最终配置要放在/etc/nginx/nginx.conf比较靠谱，贴下我最终的代码：

```bash
root@iZj6c6gq7umdxx4foh861kZ:/etc/nginx# cat nginx.conf

user www-data;
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
        listen 443 ssl;
        server_name linxz.fun;


        location / {
                proxy_pass http://localhost:3000;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                 proxy_set_header X-Forwarded-Proto $scheme;
        }

        # ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3; # Dropping SSLv3, ref: POODLE
        # ssl_prefer_server_ciphers on;

        ssl_certificate /etc/nginx/cert/linxz.fun.pem;
        ssl_certificate_key /etc/nginx/cert/linxz.fun.key;

        ssl_session_cache shared:SSL:1m;
        ssl_session_timeout 5m;

        ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3; # Dropping SSLv3, ref: POODLE
        ssl_prefer_server_ciphers on;
        }


        # ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3; # Dropping SSLv3, ref: POODLE
        # ssl_prefer_server_ciphers on;

        ##
        # Logging Settings
        ##

        access_log /var/log/nginx/access.log;
        error_log /var/log/nginx/error.log;

        ##
        # Gzip Settings
        ##

        gzip on;

        # gzip_vary on;
        # gzip_proxied any;
        # gzip_comp_level 6;
        # gzip_buffers 16 8k;
        # gzip_http_version 1.1;
        # gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

        ##
        # Virtual Host Configs
        ##

        include /etc/nginx/conf.d/*.conf;
        include /etc/nginx/sites-enabled/*;
}


#mail {
#       # See sample authentication script at:
#       # http://wiki.nginx.org/ImapAuthenticateWithApachePhpScript
#
#       # auth_http localhost/auth.php;
#       # pop3_capabilities "TOP" "USER";
#       # imap_capabilities "IMAP4rev1" "UIDPLUS";
#
#       server {
#               listen     localhost:110;
#               protocol   pop3;
#               proxy      on;
#       }
#
#       server {
#               listen     localhost:143;
#               protocol   imap;
#               proxy      on;
#       }
#}
```

同时贴一下/etc/nginx/sites-available/default的配置：

```bash
root@iZj6c6gq7umdxx4foh861kZ:/etc/nginx/sites-available# cat default
##
# You should look at the following URL's in order to grasp a solid understanding
# of Nginx configuration files in order to fully unleash the power of Nginx.
# https://www.nginx.com/resources/wiki/start/
# https://www.nginx.com/resources/wiki/start/topics/tutorials/config_pitfalls/
# https://wiki.debian.org/Nginx/DirectoryStructure
#
# In most cases, administrators will remove this file from sites-enabled/ and
# leave it as reference inside of sites-available where it will continue to be
# updated by the nginx packaging team.
#
# This file will automatically load configuration files provided by other
# applications, such as Drupal or WordPress. These applications will be made
# available underneath a path with that package name, such as /drupal8.
#
# Please see /usr/share/doc/nginx-doc/examples/ for more detailed examples.
##

# Default server configuration
#
# HTTP configuration (for redirection to HTTPS)
server {
        listen 80;
        listen [::]:80;

        server_name linxz.fun;

        location / {
                # Redirect all HTTP requests to HTTPS
                return 301 https://$host$request_uri;
        }
}

# HTTPS configuration
#server {
        #listen 443 ssl;
        #listen [::]:443 ssl;

        # SSL certificates
        # ssl_certificate /etc/nginx/cert/linxz.fun.pem;
        #ssl_certificate_key /etc/nginx/cert/linxz.fun.key;
        #ssl_session_cache shared:SSL:1m;
        #ssl_session_timeout 5m;
        #ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;
        #ssl_prefer_server_ciphers on;

        # root /var/www/html;
        # index index.html index.htm index.nginx-debian.html;

        # server_name linxz.fun;

#        location / {
 #               proxy_pass http://localhost:3000;
  #              proxy_http_version 1.1;
   #             proxy_set_header Upgrade $http_upgrade;
    #            proxy_set_header Connection 'upgrade';
     #           proxy_set_header Host $host;
      #          proxy_cache_bypass $http_upgrade;
       # }

        # Optional, only if you plan to use PHP
        #location ~ \.php$ {
        #       include snippets/fastcgi-php.conf;
        #       fastcgi_pass unix:/run/php/php7.4-fpm.sock;
        #}

        # Deny access to .htaccess files (if you're using them)
        #location ~ /\.ht {
        #       deny all;
        #}
#}


# Virtual Host configuration for example.com
#
# You can move that to a different file under sites-available/ and symlink that
# to sites-enabled/ to enable it.
#
#server {
#       listen 80;
#       listen [::]:80;
#
#       server_name example.com;
#
#       root /var/www/example.com;
#       index index.html;
#
#       location / {
#               try_files $uri $uri/ =404;
#       }
#}
```

本服务器的nginx配置分析：

`nginx.conf解决HTTPS配置问题`。它是主配置文件，影响服务器所有文件。里面的设置比较重要，这里主要解决443端口，即HTTPS链接到localhost:3000端口的问题，以及SSL证书配置问题。

`sites-available解决HTTP重定向问题`。它其实是网页设置，解决80端口（即HTTP）重定向到443端口（即HTTPS）的问题。

我一般用vim修改，每次修改完要重启一下nginx，命令是：

```bash
sudo nginx -s reload
```

一般nginx都能识别自己的目录，阿里云官网这个步骤太复杂，可以不用：

```bash
cd /usr/local/nginx/sbin  #进入Nginx服务的可执行目录。
./nginx -s reload  #重新载入配置文件。
```

# 9.BUS ERROR

运行 npm run build 遇到这个错误：

```bash
 Creating an optimized production build  ..Bus error (core dumped)
 ```

 这是指你的云主机内存不足，需要加内存了。

你可以通过free -h命令来查看剩余内存，通过df -h来查看剩余磁盘空间，我的free -h结果：

```bash
root@iZj6cbu3y55famglsids2zZ:~/terminal-blog-nomodule# free -h
               total        used        free      shared  buff/cache   available
Mem:           957Mi       652Mi        70Mi       2.0Mi       234Mi       149Mi
Swap:             0B          0B          0B
```

我的df -h结果:
```bash
root@iZj6cbu3y55famglsids2zZ:~/terminal-blog-nomodule# df -h
Filesystem      Size  Used Avail Use% Mounted on
tmpfs            96M  1.1M   95M   2% /run
/dev/vda3        40G  5.0G   33G  14% /
tmpfs           479M     0  479M   0% /dev/shm
tmpfs           5.0M     0  5.0M   0% /run/lock
/dev/vda2       197M  6.1M  191M   4% /boot/efi
tmpfs            50M     0   50M   0% /usr/local/aegis/cgroup
tmpfs            96M  4.0K   96M   1% /run/user/0
```

可以在available中，看出我的硬盘空间还可以，但是内存空间明显不足，只剩下100多M，不足够执行一次npm run build。

我继续查看占用巨大空间的应用，使用top命令，或htop命令。推荐使用htop，更直观，可以点击MEM，按内存使用来排名：

安装htop：

```bash
sudo apt-get install htop
```

在终端中输入htop并按Enter，可以点击MEM列，查看排名。我这边是因为使用了一个python后端，所以导致内存使用过高。所以，1G内存下，既要运行一个后端，又要运行一个前端有点吃紧，需要升级内存。

在阿里云看，从1G内存升级到2G需要多少钱，8.93元，果断升级。

增加内存后还是bus error？

这是缓存问题，需要删掉.next文件和node_modules文件：

在应用目录下：

```bash
rm -r .next
rm -r node_modules
```

重新运行npm run build
