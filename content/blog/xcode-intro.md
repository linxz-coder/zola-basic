+++
title = "xcode界面介绍"
date = 2024-11-12
+++

xcode界面介绍

# 整体结构
![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411121143528.png)

# 配置文件
左上角是项目配置文件。

General可以设置：
1. 最低使用的ios版本
2. 是否随着手机上下摆动

![xcode-settings1](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/20241112105404.png)

# 添加设计组件
比如添加一个label

![xcode-settings2](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/20241112111348.png)

# 修改设计组件的属性

右侧菜单栏是`inspector`，负责修改设计组件的属性。

比如，修改label的颜色。

如果需要修改label在主屏幕的位置，点击右侧三角形`size inspector`，调整x, y轴的位置。

![xode-settings3](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/20241112111633.png)

# 设计组件图层结构

中间的竖框是`document outlines`，显示的是整体设计组件的结构。

![xode-settings4](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411121120129.png)

# debug窗口
最下层窗口
cmd + shift + c 激活
cmd + shift + y 隐藏

也可以通过view-debug area激活。

# xcode快捷键

![xcode-shortcut](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411121135047.png)
	
[参考网页](https://swifteducation.github.io/assets/pdfs/XcodeKeyboardShortcuts.pdf)

# # LaunchScreen和Main的区别

LaunchScreen是开屏画面，常用于展示Logo;
Main是主要的App界面。

# 如何把手机重新居中？

双击`View Controller Scene`。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411121539695.png)

# 颜色灵感
[colorhunt](https://colorhunt.co/)

# 如何确定元素的坐标

x轴是离左边框多远，y轴是离上边框多远。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411121602879.png)

宽和高是元素本身的大小。

可以参考[iPhone的尺寸](https://www.paintcodeapp.com/news/ultimate-guide-to-iphone-resolutions)确定位置。

# 如何导入图片

找到左边菜单`Assets`文件夹，将图片拖入里面。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411121626385.png)

## 1x 2x 3x像素是啥意思

倍数越大，像素越多，越清晰。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411121628276.png)

苹果来决定你的图片应该呈现多大，但是你上传的尺寸是显示时的最大尺寸。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411121631920.png)

怎么生成不同尺寸的图片？

[appicon](https://www.appicon.co/#image-sets)


# app icon生成

只需要用上面提到的`appicon`网站，选择需要的app icon尺寸就可以自动生成了。

[appicon-icon](https://www.appicon.co/#app-icon)

方法，你只需要上传一张1024x1024的图片即可。

如何生成这样的图片，可以用`canva`。

[canva英文网](https://www.canva.cn)生成一张1024x1024的画布，然后随意发挥吧。

通过`appicon`网站，将生成的app icon保存下来，只需要勾选iPhone和iPad即可。

在原项目的AppIcon文件夹右键，选择`show in Finder`，把下载来的文件拖进去即可。

# 预览

## 电脑预览

最上面选择合适的手机尺寸，单机左上角播放按钮。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411121822237.png)

## 手机预览

1.  查看xcode和手机的版本是否兼容。总原则是两者版本尽量都高一点。
2. 登记开发者账号。在settings-accounts，加入自己的苹果账号。
3. app签名。在文档配置页，signing & Capability 里面，选择自己的账号即可。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411121834290.png)

4. USB连接你的iPhone

首先需要在手机打开`开发者模式`。Settings -> Privacy & Security，点击启动`开发者模式`。


选择`我的iPhone`，点击左上角播放按钮，就会自动进入build流程。

注意，如果一直提示要打开`开发者模式`，需要拔掉USB插头查新插。

### 信任设备

手机打开`通用-VPN与设备管理`，然后选择信任开发者就行。

[故障排除](https://appbrewery.com/p/ios-course-resources)，查找`trouble shooting`关键词。

5. 无线连接

首先确保有线连接完成，xcode有了你手机的资料，才可以用无线连接。

无线连接方式应该是默认连接的，USB线拔掉后可以试一下，如果不行，可以遵照以下步骤：

顶部菜单-window-Devices and Simulators，在`connect via network`处打钩即可。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411131003634.png)

# xcode的block显示-swift

如果你双击大括号结束的右边，就会高亮左边的大括号。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411131415821.png)

如果双击大括号的左边，就会选择所有大括号内的内容。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411131416369.png)

# xcode的错误Error

## no assistant results

错误表现：
xcode main无法连接代码，错误显示`no assistant results`。

通常，退出xcode，重新打开项目即可。


[stackoverflow](https://stackoverflow.com/questions/38314310/no-assistant-results)
