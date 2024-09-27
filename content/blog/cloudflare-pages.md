+++
title = "如何无服务器上线网站？- Cloudflare Pages"
date = 2024-09-25
+++

cloudflare pages是一个无服务器的网站托管服务，可以帮助你快速上线网站。

它支持多种前端和静态网站生成器，如React、Vue、Angular、Svelte、Eleventy、Hugo、Jekyll、zola等。

下面，我以`zoal`为例，介绍如何用cloudflare pages上线网站。

# 上传网站到github
首先，你需要把zola网站代码上传到github。可以不必使用`zola build`命令，因为cloudflare pages会自动构建。

# 创建cloudflare pages项目
## 登录cloudflare网站
到达[cloudflare官网](https://dash.cloudflare.com/)，选择Workers and Pages。选择`创建` - 连接到git，导入你的github项目。

## 配置项目
选择项目的框架，这里选择`zola`。再选择默认的构建命令`zola build`。输出目录是`public`。

### 坑一：需要加环境变量
注意：zola有个坑。直接部署是不成功的，需要加一个环境变量`UNSTABLE_PRE_BUILD`，值为`asdf plugin add zola https://github.com/salasrod/asdf-zola && asdf install zola 0.18.0 && asdf global zola 0.18.0`

原因是cloudflare只支持v1的zola，而最新已经到v2了。具体构建可以见[zola官方解释](https://www.getzola.org/documentation/deployment/cloudflare-pages/)

### 坑二：需要使用npm
如果你的zola项目是用yarn管理依赖，不知为啥会反复报错。在与AI一同调试后也没用，我随删除了`yarn.lock`文件，改用`npm install`，自动生成`package-lock.json`，重新push一下仓库，就成功了。

# 配置域名
选择项目中的`自定义域`，就可以选择域名了。注意，这里的域名指在cloudflare解析的域名。这意味着，你需要把DNS解析的服务器指向cloudflare。