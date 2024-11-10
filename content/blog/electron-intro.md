+++
title = "Electron介绍"
date = 2024-11-08
+++

一款应用广泛的`跨平台`的`桌面应用`开发框架。

意味着无论是windows, mac，还是linux，一套代码软件，就可以跑多个系统。

使用html, css, js等web技术构建桌面应用程序。

本质是结合了Node.js和Chromium，以及Native API.

Node.js负责后台，Chromium负责前端页面，Native API负责和系统交互，比如发系统级别的通知。

# Electron流程模型

## 为什么没有浏览器也可以运行html三件套？
因为安装时已经把chromium内核安装了。等于有了浏览器环境。

## 一个窗口（页面）对应一个渲染进程
![electron-render](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411082242977.png)


# Electron安装
[官网安装](https://www.electronjs.org/zh/docs/latest/tutorial/quick-start)

 # Electron打开控制台
cmd + option + i

# 安装nodemon
自动预览效果

```bash
cnpm i nodemon -D
```

## 改package.json
```bash
  "scripts": {
    "start": "nodemon --exec electron ."
  },
```

# 主进程main.js和渲染进程render.js之间的通信
靠preload.js

因为main.js有nodejs的api，比如.__dirname, process.version，但没有浏览器api，比如window, alert()。反过来，render.js也不能访问Nodejs的api，比如fs（访问文件夹）等。

preload.js介于两者之间，位于render.js的环境中，但可以访问部分node.js的api。

# 打包
```bash
cnpm i electron-builder -D
```

如果打包不成功，可能是网络问题，多试几次命令。或者换成代理：

```bash
# 检查当前代理设置 
echo $http_proxy 
echo $https_proxy 
# 如果需要设置代理 
export http_proxy=http://127.0.0.1:xxxx 
export https_proxy=http://127.0.0.1:xxxx
```

# 使用vue
查看`electron-vite`教程。


# 参考资料

[Electron视频教程](https://www.youtube.com/watch?v=ApMhLxJIW2c)
