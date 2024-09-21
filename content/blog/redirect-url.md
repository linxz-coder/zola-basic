+++
title = "如何实现url的重定向（域名跳转）"
date = 2024-09-21
+++

我想实现`b.club`跳转到`b.com`，怎么做？

## 修改nginx配置文件
以下是个示例文件，你可以根据自己的需求修改。

主要是`return 301 https://$host$request_uri;`这一行，其中`https://`是跳转到https，`$host`是原域名，`$request_uri`是原请求路径。

可以看到，所有`b.club`的请求都会被重定向到`b.com`。
```bash
# HTTP 80端口的重定向
server {
    listen 80;
    server_name b.com www.b.com;
    # 所有 HTTP 请求重定向到 HTTPS
    return 301 https://$host$request_uri;
}

# 将 b.club 的 HTTP 请求重定向到 b.com
server {
    listen 80;
    server_name b.club www.b.club;
    return 301 https://b.com$request_uri;
}

# HTTPS 443端口的主站点配置 (b.com)
server {
    listen 443 ssl;
    server_tokens off;
    server_name b.com www.b.com;

    # SSL证书配置
    ssl_certificate /etc/letsencrypt/live/b.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/b.com/privkey.pem;

    include enable-php-74.conf;
    include /www/server/panel/vhost/rewrite/wordpress.local.conf;

    location ~ ^/(\.user.ini|\.htaccess|\.git|\.svn|\.project|LICENSE|README.md) {
        return 404;
    }

    location ~ \.well-known {
        allow all;
    }

    access_log /www/wwwlogs/wordpress.local.log;
    error_log /www/wwwlogs/wordpress.local.error.log;
}

# HTTPS 443端口的 b.club 重定向到 b.com
server {
    listen 443 ssl;
    server_name b.club www.b.club;

    # SSL证书配置
    ssl_certificate /etc/letsencrypt/live/b.club/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/b.club/privkey.pem;

    # 所有 HTTPS 请求重定向到 b.com
    return 301 https://b.com$request_uri;
}
```

怎么找到nginx的配置文件-nginx.conf？
可以看我这篇文章：
https://linxiaozhong.cn/nginx/

## DNS解析
在域名解析中，将b.club的A记录指向服务器IP。

或者设置两条CNAME记录，b.club将`@`和`www`结果指向`b.com`。

### 为什么需要DNS解析？
DNS解析是将域名解析为IP地址的过程，这样浏览器才能找到服务器。
所以，访问服务器是第一步，之后才会进行执行重定向请求。