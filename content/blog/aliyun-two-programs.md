+++
title = "如何把两个程序放入阿里云服务器？"
date = 2023-10-15
+++

我有两个阿里云服务器，一个负责chatFUN的flask后台，主要任务就是作为聊天机器人的后端，连接openai的api，要求要快；一个是nextjs程序，运行我的官网。

有一天我想，为什么不直接放在一个得了？

说干就干，我把nextjs所有环境布置后，然后得到一个BUS ERROR，即内存不足。所以我升级内存到2G，这次就成功了。

贴上我的nginx.conf设置：

```bash
root@iZj6cbu3y55famglsids2zZ:/etc/nginx# cat nginx.conf
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
        server_name commonlearner.com;

         location / {
                proxy_pass http://localhost:3000;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
        }


        ssl_certificate /etc/nginx/cert/commonlearner.com.pem;
        ssl_certificate_key /etc/nginx/cert/commonlearner.com.key;

        ssl_session_cache shared:SSL:1m;
        ssl_session_timeout 5m;

        ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3; # Dropping SSLv3, ref: POODLE
        ssl_prefer_server_ciphers on;
        }
        ##

        # 添加 CORS 全局配置
        add_header Access-Control-Allow-Origin "*"; 
        add_header Access-Control-Allow-Methods "GET, POST, OPTIONS";

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

nginx.conf 负责SSL证书和转3000口。

再贴我的/etc/nginx/sites-available/default：

```bash
root@iZj6cbu3y55famglsids2zZ:/etc/nginx/sites-available# cat default
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
server {
        listen 80 default_server;
        listen [::]:80 default_server;

        location / {
                # Redirect all HTTP requests to HTTPS
                return 301 https://$host$request_uri;
        }


        server_name commonlearner.com;

        #location / {
                # First attempt to serve request as file, then
                # as directory, then fall back to displaying a 404.
                #try_files $uri $uri/ =404;
        #}

        # pass PHP scripts to FastCGI server
        #
        #location ~ \.php$ {
        #       include snippets/fastcgi-php.conf;
        #
        #       # With php-fpm (or other unix sockets):
        #       fastcgi_pass unix:/run/php/php7.4-fpm.sock;
        #       # With php-cgi (or other tcp sockets):
        #       fastcgi_pass 127.0.0.1:9000;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #       deny all;
        #}
}


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

sites-available/default 只负责80口，即HTTP转成HTTPS，server_name设置为公网IP或者绑定的域名即可，其他不要设置。

这样一来，我的flask应用是commonlearner.com:5328的地址，nextjs程序是commonlearner.com:3000（实际会被重定向为https://commonlearner.com）两者运行的端口不同，互不干扰。

剩下的就是永久启动了。nextjs程序我用的是pm2，具体可以参考我nextjs系列的文章。flask应用我用的是gunicorn。

