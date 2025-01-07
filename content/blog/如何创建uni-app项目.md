+++
title = "如何创建uni-app项目"
date = 2025-01-07
authors = ["小中"]
[taxonomies]
tags = ["uni-app"]

+++

# HBuilderX

[下载地址](https://www.dcloud.io/hbuilderx.html)

类似于vscode的开发工具。

为什么要使用新的工具？因为HBuildX和uni-app都是属于Dcloud公司的产品。

## 新建项目

记住：选择vue3的版本

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202501061042988.png)


如果需要开发app，就要勾选`uni-app x`

## 怎么让项目在微信开发工具运行？

工具 - 插件安装- 安装新插件 - uniapp(vue3)编译器

## 小程序运行

运行 - 小程序模拟器

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202501061047746.png)

## 微信手机预览分离窗口

点击分离窗口，然后把微信开发工具最小化即可。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202501061112807.png)


## 手机预览

需要在`manifest.json`里面设置AppID

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202501061207617.png)


# 命令行创建

[官方教程](https://zh.uniapp.dcloud.io/quickstart-cli.html)

```bash
npx degit "dcloudio/uni-preset-vue#vite" my-uniapp
```

如果是ts项目

```bash
npx degit "dcloudio/uni-preset-vue#vite-ts" my-vue3-project
```

如果网络不给力，可以使用代理

```bash
git config --global http.proxy http://127.0.0.1:1087
git config --global https.proxy http://127.0.0.1:1087
```

## 下载依赖

如果要预览，需要下载编译器，它在依赖中。

安装国内源pnpm

```bash
npm install -g pnpm
```

安装依赖

```bash
pnpm i
```

注意：需要在`manifest.json`里面设置AppID

微信预览命令

```bash
pnpm dev:mp-weixin
```

生成dist/div/mp-weixin文件夹，需要在微信开发工具中导入。

