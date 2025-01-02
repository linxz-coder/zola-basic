+++
title = "微信小程序优化目录结构到miniprogram"
date = 2025-01-02
authors = ["小中"]
[taxonomies]
tags = ["小程序"]

+++

文件目录繁琐，为了优化调整，可以把小程序核心源码放在`miniprogram`目录下，相当于react的src文件夹。

这时候需要开发者在 project.config.json 中指定 node_modules 的位置和目标 miniprogram_npm 的位置。

具体配置如下：

1. 配置 project.config.json 的 miniprogramRoot 指定小程序源码的目录

2. 配置 project.config.json 的 seting.packNpmManually 为 true，开启自定义 node_modules 和 miniprogram_npm 位置的构建 npm 方式

3. 配置 project.config.json 的 setting.packNpmRelationList 项，指定 packageJsonPath和 miniprogramNpmDistDir 的位置

# 具体操作

## 增加设置

project.config.json里添加以下代码，指定源码目录。

```json
 "miniprogramRoot": "miniprogram/",
```

## 执行npm包安装

根目录`npm init -y`

安装npm包，生成node_modules文件夹 `npm i @vant/weapp`

此时如果工具-构建npm会报错。

## 修改npm设置

 project.config.json 的 seting.packNpmManually 和 packNpmRelationList修改对应的值

```json
  "setting": {
    "packNpmManually": true,
	 "packNpmRelationList": [
      {
        "packageJsonPath": "./package.json",
        "miniprogramNpmDistDir": "./miniprogram"
      }
    ],

}
```

## 重新构建npm

项目 - 重新打开此项目

工具 - 构建npm
