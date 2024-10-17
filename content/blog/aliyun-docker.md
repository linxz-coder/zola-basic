+++
title = "怎么在阿里云用docker"
date = 2023-10-17
+++

docker的好处是创建一个完全隔离的空间，所以依赖项不会互相冲突，今天就来试一下吧。

# 安装docker

```bash
sudo apt update
sudo apt install docker.io
```

开始docker并设置开机自启动

```bash
sudo systemctl start docker
sudo systemctl enable docker
```

现在可以试下

```bash
docker container run hello-world
```

# 添加Dockerfile

在项目的根目录添加Dockerfile，注意项目里面要用到的文件需要COPY进这个文件里面，最终Dockerfile是这样的

```bash
FROM python:3.8-slim

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt
# 在Dockerfile中添加Pandas安装命令
RUN pip install pandas
RUN pip install gunicorn

COPY index.py /app/
COPY .env .env
COPY commonlearner.com.pem .
COPY commonlearner.com.key .

#CMD ["python", "index.py"]
CMD ["gunicorn", "--certfile", "commonlearner.com.pem","--keyfile", "commonlearner.com.key", "-b", "0.0.0.0:5328", "-w", "4","index:app"]
```

注意：

1. 以上requirements.txt里面的pandas发生错误，所以单独install

2. gunicorn用来转为https命令的，vercel的后端仅接受https传输数据

3. index.py需要传入app文件夹，证书也有在根目录内，COPY进Dockerfile

4. 最后运行gunicorn指令运行python后端。

5. 如果你是http请求，非vercel程序，可以用CMD[“python”, “index.py”]命令

# docker build

```bash
docker build -t server-autism /root/server-autism
```

代码解释：

1. docker build: 这是 Docker 命令的起始部分，表示你要执行构建镜像的操作。
2. -t server-a: 这是一个选项（参数），用于为新构建的镜像指定一个名称（tag）。在这里，镜像名称被设置为 “server-a”。标签可以帮助你对不同版本或不同配置的镜像进行标识。
3. /root/server-autism: 这是 Docker 构建上下文（build context）的路径。构建上下文是一个包含用于构建 Docker 镜像的文件和目录的路径。在这个例子中，构建上下文的路径是 /root/server-autism，意味着 Docker 将在该路径下查找 Dockerfile 和其他构建所需的文件。

# docker run

```bash
docker run -d -p 5328:5328 server-autism
```

代码解释：

1. docker run: 这是 Docker 命令的起始部分，表示你要运行一个容器。
2. -d: 这是一个选项（参数），代表 “detached” 模式。当你使用 -d 选项时，容器将会在后台运行，而不会占用当前终端的控制权。这意味着你可以在终端中继续执行其他命令，而容器仍然在后台运行。
3. -p 8080:3000: 这是一个选项（参数），用于指定端口映射。具体来说，它将容器内部的端口3000映射到主机（宿主机）上的端口8080。这意味着容器内的应用程序可以通过主机的8080端口进行访问。
左侧的8080表示主机上的端口，这是你将要用来访问容器内应用程序的端口。
右侧的3000表示容器内部的端口，这是容器内应用程序实际监听的端口。
4. my-web-app: 这是要运行的 Docker 镜像的名称或标签。你运行的容器将基于这个镜像创建。

# 查看所有运行的容器

```bash
docker ps
```

## 查看包括已退出的容器

```bash
docker ps -a
```

# docker ps -a

```bash
docker stop [id]
docker rm [id]
```

# 查看某镜像内所有容器

```bash
docker ps -a | grep server-autism
```

# 查看镜像

```bash
docker images
docker images -a #包含中间images
```

# 删除镜像

```bash
docker rmi server-autism
```

```bash
docker image prune
docker image prune -a #删除所有未使用的image
```

# 查看docker日志

```bash
docker logs [id]
```

# 添加nextjs网站到docker步骤

同样，在根目录下添加Dockerfile

```bash
touch Dockerfile
vim Dockerfile
```

Dockerfile里面内容：

```bash 
FROM node:16-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "start"]
```

注意，放入Dockerfile之前，我已经执行过npm run build了，如果没有执行，应该要在Dockerfile重新执行一次。

执行Docker build container 和 run 的动作：

```bash
docker build -t  terminal-blog-nomodule  . #在本文件夹下
docker build -t  terminal-blog-nomodule  /root/terminal-blog-nomodule
docker run -d -p 3000:3000 terminal-blog-nomodule
```

# 如何重新开始docker应用

查看哪些应用在运行

```bash
docker ps #查看当前运行的应用
docker ps -a #查看退出的应用
```

查看结果

```bash
root@iZj6cbu3y55famglsids2zZ:~# docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
root@iZj6cbu3y55famglsids2zZ:~# docker ps -a
CONTAINER ID   IMAGE           COMMAND                  CREATED       STATUS                    PORTS     NAMES
9729682ea764   terminal-b      "docker-entrypoint.s…"   12 days ago   Exited (1) 28 hours ago             compassionate_bose
c4ffe60c6f1f   server-a        "gunicorn --certfile…"   13 days ago   Exited (0) 28 hours ago             ecstatic_tharp
33b47e589667   71fd1256c003    "docker-entrypoint.s…"   13 days ago   Created                             hopeful_khorana
8349468a3c6e   71fd1256c003    "docker-entrypoint.s…"   13 days ago   Created                             focused_aryabhata
3bc316876340   server-autism   "gunicorn --certfile…"   13 days ago   Exited (0) 13 days ago              optimistic_einstein
```

重新开始应用

```bash
docker start compassionate_bose
docker start ecstatic_tharp
```

这里，我们使用了容器的名称（如 compassionate_bose 和 ecstatic_tharp）来启动它们。你也可以使用容器的ID来达到同样的效果。

