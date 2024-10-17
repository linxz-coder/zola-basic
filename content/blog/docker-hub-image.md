+++
title = "如何把本地镜像Image push到Docker Hub"
date = 2023-10-18
+++


实测下来，跟 github 的原理差不多，少了很多复杂工序，比如init、add、commit等。

首先注册一个 Docker Hub 的用户名和密码。

新建一个 repository，随便命名，选择 public（注：private只允许放一个，多的要钱）

打开terminal：

# 查看images

```bash
docker images
```

# 登录Docker

```bash
docker login
```

按照要求输入用户名和密码即可

# 远程关联仓库

```bash
 docker tag <本地repository名称>:<本地TAG> <Docker用户名>/<远程repository名称>:<远程TAG>
```

注意TAG名称一般是latest之类的，有的人会标注版本号；repository名称即对应Image Name，而不是id

 例子：

```bash
docker tag terminal-blog-nomodule:latest  commonlearner/terminal-blog:latest
```

# push仓库

```bash
docker push <Docker用户名>/<远程repository名称>:<远程TAG>
```

例子：

```bash
docker push commonlearner/terminal-blog:latest
```

# pull仓库

需要在新主机上登录：

```bash
docker login
```

再pull

```bash
docker pull <dockerhub_username>/<repository_name>:<tag>
```

例子：

```bash
docker pull commonlearner/terminal-blog:latest
```

# 手动迁移

不使用Dockerhub也能实现image的复制：直接手动传输 Docker 镜像的 tar 文件。

## 手动迁移 Docker 镜像：

## 1. 在源云主机上：

### a. 创建 Docker 镜像

首先，需要将容器提交为一个新的 Docker 镜像。使用 docker commit 命令：

```bash
docker commit <container_id_or_name> <new_image_name>:<tag>
```

例如：

```bash
docker commit my_container my_image:v1
```

### b. 保存 Docker 镜像为 tar 文件

使用 docker save 命令：

```bash
docker save -o <path_to_save_image.tar> <new_image_name>:<tag>
```

例如：

```bash
docker save -o my_image_v1.tar my_image:v1
```

### c. 传输 tar 文件到目标云主机

可以使用 scp, rsync 或其他方法将 tar 文件传输到目标主机。

例如使用 scp：

```bash
scp my_image_v1.tar username@target_host:/path/on/target/host
```

## 2. 在目标云主机上：

### a. 加载 Docker 镜像

首先，需要从 tar 文件中加载 Docker 镜像。使用 docker load 命令：

```bash
docker load -i <path_to_save_image.tar>
```

例如：

```bash
docker load -i /path/on/target/host/my_image_v1.tar
```

### b. 运行容器

现在，你可以使用 docker run 命令从新加载的镜像启动容器。

例如：

```bash
docker run -d <other_options> my_image:v1
````

注意
- 在迁移过程中，你迁移的是容器的当前状态。这意味着在容器内进行的任何非持久化更改（例如，容器内部的临时文件）都会被保存并迁移到新的主机。
- 如果你的应用有持久化存储需求（如数据库数据），还需要额外迁移这些数据。一种方法是使用数据卷或绑定挂载，并单独迁移这些数据。
- 这种迁移方法更适合临时、测试或开发环境。对于生产环境，推荐使用 Docker Registry 进行镜像的存储和传输，这样可以更容易地管理和分发 Docker 镜像。

