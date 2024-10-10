+++
title = "如何用pm2管理nextjs应用（nextjs网站部署上线）"
date = 2024-10-02
+++

# 为什么要用pm2？
在生产环境中，`pm2`通常取代`npm run start`来启动应用程序。`pm2`是一个进程管理器，它可以在后台进行，帮助我们管理应用程序的生命周期，包括启动、停止、重启、监控等。

# 安装pm2
```bash
npm install -g pm2
```

# 启动nextjs应用
```bash
pm2 start npm --name "terminal-blog-nomodule" -- run start
```

这里`--name`参数是给进程起一个名字，`--`后面的是`npm`的参数，`run start`表示运行`package.json`中的`start`脚本。

# 查看进程
```bash
pm2 list
```

# 停止进程
```bash
pm2 stop app_name_or_id
```

# 删除进程
```bash
pm2 delete app_name_or_id
```

# 重启进程
```bash
pm2 restart app_name_or_id
```

# 保存并自动重启应用
```bash
pm2 save
pm2 startup
```

# 修改nextjs应用后自动重启
```bash
npm run build
pm2 restart app_name_or_id
```
注意，这里需要先运行`npm run build`，因为`nextjs`是一个`ssr`框架，需要先编译成`html`文件，否则会一直显示旧的内容。

# 恢复保存的进程列表
如果服务器发生重启，可以快速恢复之前保存的进程列表。
```bash
pm2 resurrect
```
# 关于nextjs程序的nginx设置

nextjs不是通过html文件，而是通过Node.js服务器动态渲染。因此不会出现index.html的重定向。反而重定向是localhost:3000。

核心是HTTPS的重定向

```bash
location / {
    proxy_pass http://localhost:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```



