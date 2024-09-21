+++
title = "本地Markdown文档上传wordpress网站"
date = 2024-09-21
+++

## 前言
需要用的软件叫做`Publish Markdown`，启用`xmlrpc`方式。所以需要验证一下。

输入以下网址：

your-wordpress.com/xmlrpc.php

结果要出现：
```plaintext
XML-RPC server accepts POST requests only.
```

## 安装步骤
### 下载软件
https://github.com/jzj1993/PublishMarkdown/releases

软件图片：
![本地图](/Users/lxz/Downloads/图片/1.png)

### 设置软件
输入网址：

your-wordpress.com/xmlrpc.php

另外，你的用户名和密码。

注意，密码不是wordpress的后台密码，是应用程序密码。

获取密码：
在wordpress后台，打开’用户’-‘个人资料’，拉到最下面，输入密码名称（随便取），点击’新增的应用程序密码’即可。

#### wordpress端：
![本地图](/Users/lxz/Downloads/图片/2.png)


#### 软件端：
![本地图](/Users/lxz/Downloads/图片/3.png)

### 新建文章
可以开始写文章啦。
记得加一些注释在前面，注释使用”—“来前后框住的。
比如，我的这个文章注释是这样的:
```plaintext
---
title: 本地Markdown文档上传wordpress网站
url: wp-markdown
category:
- 后端学习
tags:
- wordpress
- markdown
---
```
之后再接着写其他内容。

注释怎么写，可以看看”帮助“-”示例文档“。
其他东西，就是markdown的语法了。

> 这里的**url**建议填上。因为这个软件是靠url来区分是不是同样一篇文档的。如果涉及修改文档，就要写一样的url。而这个url，不是一般的网址形式，就是一个单词，自己写就行。之后不要重复。

### 上传文章
上传前注意保存command + s （我是mac党，windows是ctrl）

上传快捷键command + p，也可以手动选择”文件“-”发布“。

里面都是简单的选项，选择完成就发布成功啦。

### 一点问题
我作者软件仓库里面看到issue有人提出，是不是没办法上传“特色图片”（题图），作者也没有回应。
这个功能，估计需要动手能力强的wper来出力了，或者我有空研究一下。待续。

### 最后
我也收集了除这个软件外的解决方案，或许未来会动手实现一下，立个flag。
https://blog.csdn.net/IAMoldpan/article/details/83317463
