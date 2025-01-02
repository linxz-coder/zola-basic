+++
title = "微信小程序npm使用"
date = 2025-01-02
authors = ["小中"]
[taxonomies]
tags = ["小程序", "npm"]

+++

# 生成package.json配置

右键-内建终端打开

```bash
npm init -y
```

# 安装包

```bash
npm i @vant/weapp
```

安装完后，会生成node_modules文件夹。

在package.json的dependecies也会看到包。

但现在的包还不能正常使用，需要在小程序构建后才能用。

# 构建npm

工具 - 构建npm

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202501021035938.png)

构建后，默认是项目根目录，生成miniprogram_npm目录。

里面放着构建后的npm包，这个才能被小程序使用。

注意，并不是所有的包都能在小程序环境中使用，要看作者是否支持小程序。

如果需要发布小程序包，需要遵循[官方规范](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)
