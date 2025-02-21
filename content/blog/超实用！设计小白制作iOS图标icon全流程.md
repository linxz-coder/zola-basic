+++
title = "超实用！设计小白制作iOS图标icon全流程"
date = 2025-02-20
authors = ["小中"]
[taxonomies]
tags = ["设计", "icon"]

+++

# AI版本

## 找出参考图

寻找Icon收集的网站，推荐[iosicongallery](https://www.iosicongallery.com/)。

筛选方式：按照喜好的颜色筛选出喜欢的Icon，将Icon截图。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202502200933785.png)

还可以选择[Canva国际站](https://www.canva.com/search?q=iOS%20icon)

## AI生图

有人问，AI可以生图，为什么还要找参考图？

因为AI本质上是一个`模式学习机器`，你的数据集越精确，AI生成的效果越好。

文字和图片对比，自然是图片的学习更接近你要的结果。

比如我通过只文字prompt，生成的结果如下：

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202502200936029.png)

虽然效果还可以，但是它与上面参考的iOS图标还是有差距。

首先，它没有自动做出图标的圆角矩形图案。不过，许多软件都可以自动圆角，倒也无碍，只不过可以预览到最终效果是最好的。

第二，我尝试生成的图标效果并不好，因为元素过杂又不集中，在App群里面辣眼睛。

通过参考图给AI，生成结果如下：

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202502200952858.png)

可以看出，有了参考，AI生图的水平上了一个档次。

这样，我们可以下载初始图标，进入下一个步骤。

## 蒙版编辑

这里我要介绍一个蒙版的概念。简单来说，就是你创造一个图形，可以把你的图像都塞到图形里面。

一般的设计软件都支持蒙版操作，以下介绍一下`Sketch`的操作。

首先，a键创建一个画布，选中icon类别，我一般选择是1024x1024的。

r创建一个矩形，设置圆角。再把图片拉进去。

cmd+g将图片和矩形分组，图片上方，矩形在下方。右键点击矩形，`用作蒙版`。

通常需要shift+拉动，将图像刚好拉满整个形状，如下图：

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202502201226278.png)

直接导出即可。

### 官方控件支持

如果你是用figma或者sketch，可以选择[官方控件](https://developer.apple.com/design/resources/#macos-apps)。

右键`与控件解绑`状态。

直接把图片复制进来，放进AppIcon的控件即可。这样就会形成蒙版效果，拉大图像即可以填满整个控件。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202502211120674.png)

## 生成标准图标

登入[wuruihong](https://icon.wuruihong.com/)，进行Icon的裁剪。

首先，拉入图像，选择对应的平台。

一般icon我会进行10%的内补白。

自动圆角我一般选择20%。不过，我们经过圆角处理，这个选项也可以忽略。补白的地方默认是透明的。

选择完成后，点击`开始生成`。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202502201229740.png)

现在，预览效果后就可以下载了。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202502201231039.png)

是不是很简单呢？

为防止挂掉，这里还推荐另一个网站[appicon.co](https://www.appicon.co/)，不过这个网站并不支持自动圆角，要自己编辑好才能生成。

## 放入xcode预览

将`AppIcon.appiconset`文件夹放入assets里面对应的文件夹，cmd+shift+k可以清理之前的设置，cmd+R重新运行，即可以看到运行的图标。

在Mac里面，可以一次点击上面菜单 product-archive-custom-copy ，就可以把.dmg导出来本地，看看本地效果如何。

# 纯手工版本

因为我不是设计师，所以以最简单的方式来操作。

首先，我们观察，一个icon包括什么元素。最基本的结构是`背景+前景元素`

## 背景元素

基本上分两类。纯色和渐变。

这两种也很容易实现。依照上面`蒙版编辑`的步骤，在sketch里面先开一个icon的画布，填充一个矩形，再给矩形填色即可。

渐变颜色可以选择`高级渐变`，拉动两边的拉条可以选择渐变的方向。

另一个软件可以选择Canva国际站，搜索`iOS icon`，里面有设置好的渐变模版，非常方便。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202502201413798.png)

## 前景元素

颜色设置好后，就要加入对应的元素。

这里推荐两个网站，一个是之前提过的Canva.com，另外一个是阿里巴巴的图标网站[iconfont.cn](https://www.iconfont.cn/collections/index?spm=a313x.collections_index.i1.d33146d14.5a4d3a81RtStyi&type=3)。

两个网站都是免费的，在sketch或者Canva软件中，都可以直接将元素拉入。

之后的步骤，按照上面`生成标准图标`的步骤一样就好了。

这是我做的一个示例。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202502201439702.png)

这里就多多发挥创意啦，总之是元素和颜色的组合。

# 官方指引

关于App设计的[官方指引](https://developer.apple.com/cn/design/human-interface-guidelines/app-icons#Best-practices)，总之就是要简洁啦。