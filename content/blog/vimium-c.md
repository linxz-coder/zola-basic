+++
title = "不用鼠标浏览网页-Vimium C介绍"
date = 2024-09-27
+++

# Vimium C介绍
Vimium C 是一款 Chrome 浏览器插件，可以让你不用鼠标浏览网页，提高浏览效率。

它其实是`Vimium`的扩展，也就是进化版，两者是一个东西。

# 安装
在 Chrome 应用商店搜索`Vimium C`，点击安装即可。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202409271608289.png)

# 使用
安装完成后，点击插件图标，会显示快捷键列表。

基本操作如下：

**`f`** : 列出网页上可以点击的元素，输入对应的字母即可点击。这比以前的tab tab tab高效多了。

**`d`** : 对应scroll down，向下滚动半页。

**`j`** : 对应scroll down little bit，向下滚动一行。

**`u`** : 对应scroll up，向上滚动半页。

**`k`** : 对应scroll up little bit，向上滚动一行。

**`x`** : 关闭当前标签页。与Ctrl + w效果一样。

**`shift+x`** : 恢复关闭的标签页。与Ctrl + shift + t效果一样。

**`gg`** : 跳转到页面顶部。

**`G`** : 跳转到页面底部。

以上就是我常用的按键，更多功能可以查看插件的快捷键列表。

# 排除特定网站

如果需要排除特定网站，需要输入`:https://www.youtube.com/`这样的形式，如果需要排除所有快捷键，则后面内容留空即可。

这样一来，可以解决特定网站快捷键冲突的问题。

![vimium-c-exclude](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411181532247.png)

# 项目地址
项目是开源的。

[项目github地址](https://github.com/gdh1995/vimium-c/blob/master/README-zh.md)


