+++
title = "如何在阿里云主机启动flask服务？"
date = 2023-09-30
+++

# 1.远程连接主机

```bash
ssh root@你的公网IP
```

如果是Workbench连接，可省略这一步，直接在阿里云官网登录。

# 2.设定虚拟环境

```bash
source venv/bin/activate
```

这一步其实不是必要的。但是，我们在远程主机通常不只需要启动一项服务，如果存在多项服务，可能会产生 python 依赖项冲突，开启虚拟环境可以防止冲突。

接下来，可以安装依赖项，使用以下命令：

```bash
pip install -r requirements.txt
```

# 3.检查端口占用情况

```bash
sudo lsof -i:5328
```

有时候，你会发现flask占用的端口无法开启服务，是因为端口已经被占用。检查端口占用情况是个好习惯。

# 4.杀死占用端口进程

```bash
sudo kill -9 19450 19605
```

如果你不想换端口的话，就需要杀死占用端口的进程。比如，我需要用的端口是5328，占用端口的进程pid 分别是19450和19605。

# 5.开启服务

需要一个应用服务器来让flask运行在主机上，我们选用的是gunicorn

```bash
gunicorn -w 2 -b 0.0.0.0:5328 index:app
```

- -b 0.0.0.0:5328：这个参数指定了 Gunicorn 应该绑定（监听）哪个 IP 地址和端口。在这里，0.0.0.0 表示 Gunicorn 应该监听所有可用的网络接口，而 5328 是它应该监听的端口号。
- -w 或 --workers ：这个参数用于指定 Gunicorn 应该创建多少个工作进程。指定更多的工作进程可以让 Gunicorn 并发处理更多的请求，但也会增加系统的资源消耗（如内存和CPU）。选择适当的工作进程数需要考虑系统的资源限制、应用的性能特征和预期的负载等因素。
- 2：这个值是指定的工作进程数。在这个例子中，Gunicorn 将创建 2 个工作进程来处理请求。

简而言之，gunicorn -w 2 命令将启动 Gunicorn，并创建 2 个工作进程来并发处理 HTTP 请求。

# 6.如何让flask应用一直在线？

我们发现，当关掉远程主机后，应用就不在线了，而我们选用云主机的目的是，让应用一直在线，怎么办呢？

这时候需要用nohup：

```bash
nohup gunicorn --certfile /etc/nginx/cert/commonlearner.com.pem --keyfile /etc/nginx/cert/commonlearner.com.key -b 0.0.0.0:5328 -w 4 index:app
```

这样就可以保证应用一直在线。

# 7.如何用https发起api

如果你注意看，上面的gunicorn命令有 cert 字样，这是因为我绑定了 ssl 证书，这是 https 网址要求的。由于 vercel 网站只能接受 https 的 api 请求，所以如果你有 https 的需求，需要这样改写代码：

```bash
gunicorn --certfile /etc/nginx/cert/commonlearner.com.pem --keyfile /etc/nginx/cert/commonlearner.com.key -b 0.0.0.0:5328 -w 4 index:app
```

如果你需要查看 log，可以这样写代码：

```bash
gunicorn --certfile /etc/nginx/cert/commonlearner.com.pem --keyfile /etc/nginx/cert/commonlearner.com.key -b 0.0.0.0:5328 index:app --log-level debug
```

这样一来，你的前端 fetch api 代码就需要改成 https 样式，由于阿里云绑定免费 ssl 证书目前只支持域名，而不支持 ip，因此我们需要将公网ip绑定一个域名（怎么做看下一篇文章），然后直接请求https，如下图：

```bash
const response = await fetch("https://www.commonlearner.com:5328/api/python", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ content: content, chatHistory: chatHistoryStr }),
});
```

