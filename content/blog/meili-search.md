+++
title = "meili search的安装方法？最好的站内搜索工具"
date = 2024-09-21
+++

# 服务器端安装meili-search
## 本地作为服务器
### 安装meili-search
```bash
brew install meilisearch
```
其他安装方法见[官网](https://www.meilisearch.com/docs/learn/self_hosted/install_meilisearch_locally)

### 运行meili-search
```bash
meilisearch --master-key <your-key>
```
你应该有个master-key，如果没有，直接运行`meilisearch`，会生成一个。

项目会运行在`http://localhost:7700`

# 扫描网站，生成index
接下来，我们需要扫描网站，生成index。这里用到一个工具是meilisearch的[docs-scraper](https://github.com/meilisearch/docs-scraper/).

## 编写供扫描的配置文件
以下是简单的示例。值得注意的是，我把`zola`放在本地的1111端口里面，希望它扫描blog页面的文档，所以需要指向本地端口。

因为后面要用到docker，docker里面的本地表示不一样，所以需要用`host.docker.internal`来代替`localhost`。
```json
{
    "index_uid": "docs",
    "start_urls": ["http://host.docker.internal:1111/blog/"],
    "sitemap_urls": ["http://host.docker.internal:1111/sitemap.xml"],
    "stop_urls": [],
    "selectors": {
      "lvl0": "h1",
      "lvl1": "h2",
      "lvl2": "h3",
      "text": "p, li"
    }
  }
```

## 运行Scrapper
这里要用到docker，所以需要先安装docker desktop。
```bash
docker run -t --rm \
  -e MEILISEARCH_HOST_URL="http://host.docker.internal:7700" \
  -e MEILISEARCH_API_KEY="yourkey" \
  -v /Users/lxz/Desktop/zola-basic/meili.json:/docs-scraper/config.json \
  --network host \
  getmeili/docs-scraper:latest pipenv run ./docs_scraper config.json
```
由于是在本地运行，所以需要加上--network host，这样docker才能访问到本地的端口。

另外，我用docker pull的image是getmeili/docs-scraper:latest，我实践过程，指定版本不行，会显示禁止POST访问，但是官网推荐生产环境要用指定版本。

出现以下信息，表示成功：
```bash
> Docs-Scraper: http://host.docker.internal:1111/blog/ 27 records)

Nb hits: 27
```
上面信息表示，扫描了27个文档。

# 前端安装js和css
## 安装docs-searchbar.js
接下来，我们正式在前端要搜索了，需要安装一个搜索工具，这里用到的是meilisearch的[docs-searchbar.js](https://github.com/meilisearch/docs-searchbar.js?tab=readme-ov-file)

### 安装库
```bash
yarn add docs-searchbar.js
```

### 在html里面引入
```html
<script src="https://cdn.jsdelivr.net/npm/docs-searchbar.js@latest/dist/cdn/docs-searchbar.min.js"></script>
```
如果直接在html里面引入，可以不安装库。与前面步骤是二选一的关系。

## html页面添加元素
### 添加搜索框：
```html
<input type="search" id="search-bar-input" />
```

### 添加js代码：
```html
  <script>
    docsSearchBar({
      hostUrl: 'http://127.0.0.1:7700',
      apiKey: 'your-key',
      indexUid: 'docs',
      inputSelector: '#search-bar-input',
      debug: false, // Set debug to true if you want to inspect the dropdown
    })
  </script>
```

### 添加css样式
```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/docs-searchbar.js@latest/dist/cdn/docs-searchbar.min.css"
/>
```

好了，可以测试一下了。

注意，当你的zola网站是本地生成时，即用`zola serve`来预览的，索引的结果会特别少，因为meili-search只能扫描线上的网站？（待验证）。

后来，我把网站部署到cloudflare pages上，再扫描，索引的结果就正常了。

<br>

# 云主机作为服务器
## 安装meili-search-走不通
```bash
# Install Meilisearch
curl -L https://install.meilisearch.com | sh

# Launch Meilisearch
./meilisearch
```

文件大概有115M，国内服务器太慢了，下载不了。后来我换了一个国外的服务器，一下子就搞定了。

[官网云服务器架设教程](https://www.meilisearch.com/docs/guides/deployment/running_production#step-4-run-meilisearch-as-a-service)

[本地架设参考](https://www.meilisearch.com/docs/learn/self_hosted/configure_meilisearch_at_launch)

但是，因为编译问题，我还是用了docker。

## 安装docker
```bash
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install docker-ce docker-ce-cli containerd.io
```

## 启动docker
```bash
sudo systemctl start docker
sudo systemctl enable docker
```

## 运行meili-search
```bash
sudo docker run -d --name meilisearch \
  -p 7700:7700 \
  getmeili/meilisearch \
  meilisearch --master-key "your-key"
```
-d代表后台运行，所以即使关掉终端，也不会停止。

### 查看运行状态
```bash
docker ps
```

## 修改nginx配置
以下可以参考：
```bash
server {
    listen 80;
    listen [::]:80;
    server_name meilisearch.linxz.online;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name meilisearch.linxz.online;

    ssl_certificate /etc/letsencrypt/live/meilisearch.linxz.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/meilisearch.linxz.online/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    location / {
        proxy_pass http://localhost:7700;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```
还要给我这个二级域名添加证书，参考[这里](https://www.meilisearch.com/docs/guides/deployment/running_production#step-4-run-meilisearch-as-a-service)

之后，再在DNS服务商（我是cloudflare）添加A记录，指向云服务器的IP地址。

这样，你输入meilisearch.linxz.online就可以访问到meili-search了，因为7700端口自动转发到443端口。

不过，如果是cloudflare pages的话，注意要把SSL模式换成“完全”，而不是“灵活”，否则会出现”重定向过多“的错误。

## 修改前端js代码：
```html
  <script>
    docsSearchBar({
      hostUrl: 'https://meilisearch.linxz.online',
      ... // 其他参数
    })
  </script>
```
将hostUrl改为你的域名即可。

## 设置github action自动化
由于我希望一改动网站（通常是更新文章），就自动索引，所以我设置了github action。

首先，在.github/workflows文件夹下，新建一个yaml文件，比如`build.yml`。

这里是我的代码：
```yaml
name: Update Search Index
on:
  workflow_dispatch:
  push:
    branches:
      - main

jobs:
  update-search-index:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Wait for Cloudflare Pages to update
        run: sleep 2m
      
      - name: Run docs-scraper
        env:
          HOST_URL: ${{ secrets.MEILISEARCH_URL }}
          API_KEY: ${{ secrets.MEILISEARCH_API_KEY }}
          CONFIG_FILE_PATH: ${{ github.workspace }}/meilisearch-docs-scraper-config.json
        run: |
          docker run -t --rm \
            -e MEILISEARCH_HOST_URL=$HOST_URL \
            -e MEILISEARCH_API_KEY=$API_KEY \
            -v $CONFIG_FILE_PATH:/docs-scraper/config.json \
            getmeili/docs-scraper:v0.12.12 pipenv run ./docs_scraper config.json
```

脚本在push到main分支时运行，会等待2分钟，然后运行docs-scraper。自动索引我的文章，配置文件是`meilisearch-docs-scraper-config.json`。里面是索引规则。

# 参考
1. 为什么我知道meili-search?-[owen的博客](https://www.owenyoung.com/blog/add-search/#overview)
2. owen设置的自动化脚本-[github](https://github.com/theowenyoung/blog/blob/ee82d2d783c3b08b98862a7700a6a29a301e164e/.github/workflows/build.yml#L20-L37)
3. owen的配置json-[config.json](https://github.com/theowenyoung/blog/blob/main/meilisearch-docs-scraper-config.json)