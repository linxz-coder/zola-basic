+++
title = "Flutter基础"
date = 2025-01-17
authors = ["小中"]
[taxonomies]
tags = ["Flutter"]

+++

# 是什么？

跨平台开发框架，可以同时开发iOS和Android。

这是开源代码。

# 编程语言

Dart

# 概念来源

web网页的缩放技术

# 基本概念

所有的东西都是一个“部件”(widget）

就像乐高搭积木

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202501211027508.png)

# 安装

[安装sdk](https://docs.flutter.dev/get-started/install/macos/mobile-android)

[安装Android studio的插件](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202501211107182.png)

Android studio是intelliJ开发的，和开发jetbrain是同一个公司

# 快捷键

自己在Android studio里面设置

新建flutter项目 option+shift+f 

# 设计元素

[material](https://m3.material.io/components/all-buttons)

# 关于引号

建议使用单引号，而不是双引号

# 快速包裹widget

Option + Enter，选择即可。比如需要包裹到Center里面。

# 如何添加本地图片

根目录新建`images`文件夹。

修改`pubspec.yaml`文件，加上assets的信息。注意缩进，不然会报错。[参考错误](https://stackoverflow.com/questions/50171766/flutter-pub-expected-a-key-while-parsing-a-block-mapping-path)

可以添加整个文件夹`images/`，就不用一个个添加文件。

编辑后，点击上方`Get dependencies`才会生效。

# 生成icon

访问[appicon](appicon.co)，选择你想要的平台，下载即可。

# 放入icon

Android的目录： app - src - main - res

iOS的目录： Runner - Assets.xcassets - AppIcon.appiconset

# 怎么把方icon变成圆icon

点击左上角 - open，选择Android文件夹。

打开后，run一下。右键点开`res`文件夹 - 新建 - Image Assets

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202501211654367.png)

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202501211656628.png)

里面拉大缩小图标即可。

