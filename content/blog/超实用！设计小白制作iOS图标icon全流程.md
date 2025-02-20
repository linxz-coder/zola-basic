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

## AI生图

有人问，AI可以生图，为什么还要找参考图？因为AI本质上是一个`模式学习机器`，你的数据集越精确，AI生成的效果越好。文字和图片对比，自然是图片的学习更接近你要的结果。

比如我通过只文字prompt，生成的结果如下：

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202502200936029.png)

虽然效果还可以，但是它与上面参考的iOS图标还是有差距。首先，它没有自动做出图标的圆角矩形图案。不过，许多软件都可以自动圆角，倒也无碍，只不过可以预览到最终效果是最好的。第二，我尝试生成的图标效果并不好，因为元素过杂又不集中，在App群里面辣眼睛。

通过参考图给AI，生成结果如下：

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202502200952858.png)

可以看出，有了参考，AI生图的水平上了一个档次。

这样，我们可以下载初始图标，进入下一个步骤。

## 蒙版编辑

这里我要介绍一个蒙版的概念。简单来说，就是你创造一个图形，可以把你的图像都塞到图形里面。一般的设计软件都支持蒙版操作，以下介绍一下Sketch的操作。

首先，a键创建一个画布，选中icon类别，我一般选择是1024x1024的。

r创建一个矩形，设置圆角。再把图片拉进去。

cmd+g将图片和矩形分组，图片上方，矩形在下方。右键点击矩形，`用作蒙版`。

通常需要shift+拉动，将图像刚好拉满整个形状，如下图：

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202502201226278.png)

直接导出即可。

## 生成标准图标

登入[wuruihong](https://icon.wuruihong.com/)，进行Icon的裁剪。

首先，拉入图像，选择对应的平台。

一般icon会进行5%的内补白，自动圆角我一般选择20%。不过，我们经过圆角处理，这个选项也可以忽略。补白的地方默认是透明的。

选择完成后，点击`开始生成`。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202502201229740.png)

现在，预览效果后就可以下载了。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202502201231039.png)

是不是很简单呢？

