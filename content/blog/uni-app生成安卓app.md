+++
title = "uni-app生成安卓app"
date = 2025-01-13
authors = ["小中"]
[taxonomies]
tags = ["安卓", "Android"]

+++

# 修改manifest配置

加入app名字等信息

[教程](https://www.bilibili.com/video/BV1Yg4y127Fp?t=112.4&p=115)

# 上传图标

点击`自动生成所有图标`

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202501101631279.png)

# 启动界面

勾选上`使用原生隐私政策提示框`

如果不勾选，不能上架苹果或小米应用商店

# 常用其他设置

如果是模拟器预览，必须勾选`x86`

# 预览

选择`自定义调试基座`

包名必须有唯一性，一般都是倒着的url

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202501101637936.png)

使用云端证书

传统打包

运行 - 安卓基座 - 自定义基座

如果发现没有设备可以选择，就是需要安装模拟器。

国外： Android Studio （需要科学上网）

国内：雷电、夜神、MuMu（mac可用）、逍遥（mac不可用）、BlueStacks（蓝叠）、腾讯模拟器（手游助手）

# 发行

发行 - 选择`正式打包`。

打包需要排队，通常是10分钟左右，也可以充值快一点，20元/次。

打包完成后会有个临时链接，只能安装5次。当然也可以直接通过链接下载下来。

我们点击`一键上传到uniCloud`就可以获取链接多次下载。

可以在uniCloud后台，点击项目的详情看到链接，通过草料二维码可以生成二维码分享给好友。
