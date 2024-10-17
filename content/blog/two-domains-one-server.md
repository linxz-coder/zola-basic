+++
title = "怎么在一个服务器塞两个域名（nginx）"
date = 2023-10-19
+++

# 修改DNS

将DNS的A记录中@和www都改为相同服务器的IP。

# Nginx.conf设置

使用nginx。主要思路是塞三个server设置，一个server处理两个域名的80端口，都重定向到各自的https（443端口），一个server处理linxz.fun的SSL证书，一个server处理commonlearner.com的SSL证书。

下面是/etc/nginx/nginx.conf的设置：

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

        ## linxz.fun server
        server {
            listen 80;
            server_name linxz.fun www.linxz.fun commonlearner.com www.commonlearner.com;

            location / {
                return 301 https://$host$request_uri;
             }
        }

        # linxz.fun SSL
        server {
            listen 443 ssl;
            server_name linxz.fun www.linxz.fun;

            ssl_certificate /etc/nginx/cert2/linxz.fun.pem;
            ssl_certificate_key /etc/nginx/cert2/linxz.fun.key;

            location / {
                proxy_pass http://localhost:3000;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
            }
        }

        ##
        # SSL Settings
        ##
        server {
        listen 443 ssl;
        server_name commonlearner.com www.commonlearner.com;


        ssl_certificate /etc/nginx/cert/commonlearner.com.pem;
        ssl_certificate_key /etc/nginx/cert/commonlearner.com.key;

         location / {
                proxy_pass http://localhost:3000;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
        }



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



