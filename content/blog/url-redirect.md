+++
title = "如何把一个网址重定向到另一个网址（分属不同的服务器）"
date = 2023-10-18
+++

需求：将 linxz.fun 映射到 commonlearner.com

方法：需要用到nginx

首先我们看/etc/nginx/sites-available/default，它的作用是把HTTP（80口）映射到HTTPS（443口）：

```bash
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
```


主要修改/etc/nginx/nginx.conf，主要是做SSL重定向location / {}

```bash
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
        #       proxy_pass http://localhost:3000;
                proxy_pass https://commonlearner.com;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
        }


        ssl_certificate /etc/nginx/cert/linxz.fun.pem;
        ssl_certificate_key /etc/nginx/cert/linxz.fun.key;

        ssl_session_cache shared:SSL:1m;
        ssl_session_timeout 5m;

        ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3; # Dropping SSLv3, ref: POODLE
        ssl_prefer_server_ciphers on;
        }


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

