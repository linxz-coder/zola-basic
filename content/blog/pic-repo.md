+++
title = "如何使用picGO的图床功能？（七牛云图床）"
date = 2024-09-21
+++

# 为什么选择picGO？
图床选择很多，但我觉得picGO最好。

一是因为它上传简单且快，只要把图片拉到顶部菜单就完成上传，剪切板可以用`cmd+shift+p`来上传。

二是因为可以用国内的图床，比如我这次要介绍的七牛云图床。

# 下载picGO
[github下载地址](https://github.com/Molunerfinn/PicGo/releases)

选择正式版下载，下载完成后安装。

# 解决【文件已损坏】错误
mac下载后，会遇到【文件已损坏】错误，解决方法如下：
在`terminal`中输入以下命令：
```shell
sudo spctl --master-disable
```
会提示输入密码。

随后，放行picGo，输入：
```shell
xattr -cr /Applications/PicGo.app
```

现在就可以打开了。


[解决参考链接](https://github.com/Molunerfinn/PicGo/blob/dev/FAQ.md)

# 配置七牛云图床
![img](https://pic.linxz.online/20240920232518.png)

可以参考官网教程：

## 获取AccessKey和SecretKey
登录[七牛云官网](https://portal.qiniu.com/home)，进行注册和登录。

点击【个人头像】-【密钥管理】，将两个key分别复制下来。

[picGO官网](https://picgo.github.io/PicGo-Doc/zh/guide/#%E4%B8%8B%E8%BD%BD%E5%AE%89%E8%A3%85)

## 获取Bucket名字
点击【对象存储】-【空间管理】，新建一个空间，这个空间名就是`Bucket`的名字。

## 获取存储区域
新加坡对应`as0`。国内地址需要备案，所以我选了个东南亚的。
存储区域代号看[千牛云对象存储区域](https://developer.qiniu.com/kodo/1671/region-endpoint-fq)。

## 获取域名
千牛云创建完【对象存储】（即图床）后，会给你一个临时的域名，可用30天。

稳妥起见，最好准备自己的域名。

点击自己的对象存储空间-【域名管理】，点击【绑定域名】。

注意，这里的域名不能输入整个域名，而是二级域名。

比如我的网址`linxz.online`是整个域名，我尝试过绑定，不能成功访问。

而`cdn.linxz.online`、`image.linxz.online`这样的才是二级域名。

推荐绑定证书（HTTPS）的方式，因为有些网站会拒绝展示HTTP内容，图片会显示不出来。

其他的选项保持默认就好。

HTTPS需要单独提供证书，我的做法是在服务器申请好证书，然后直接把`fullchain.cer`和`linxz.online.key`里面的值复制到七牛云里面。

![img](https://pic.linxz.online/20240920233153.png)

## 配置外链域名
点击【文件管理】，选择你的域名即可。

# 上传图片
我一般是剪切，用`cmd+shift+p`的快捷键上传，地址会自动复制到剪贴板。

还有就是，可以直接把图片拖到右上角`picGo`的图标上，也会自动完成上传，并复制链接。

当然，也可以登录七牛云网站，可以直接在七牛云的【文件管理】上传。

## 七牛云图床测试
![img](https://pic.linxz.online/robot_reading.png)

# 其他选择-picX
注意，picX上传到github服务器上，国内访问速度较慢。

## 上传图片网址
https://picx.xpoet.cn/#/upload

## 测试效果
### pic-X 
注意：以下是github图床，地址是`raw.githubusercontent.com`的地址：

![img](https://raw.githubusercontent.com/linxz-coder/picx-images-hosting/master/20240918/qiaohu.3uu8vtvx6uy0.webp)

## 注意：要去github拿个token
https://github.com/settings/tokens


配置过程就不啰嗦了，跟`picGo`差不多。

# 其他选择-imgur
由于我的七牛云图床是亚太地区的，经常有图片打不开，用国内的需要备案，很麻烦，所以我又找了一个图床。
这个是国外的图床，需要代理。
需要先注册，[注册地址](https://imgur.com/account/settings/apps)

获取你的`Client ID`，然后在`picGo`中配置。

[教程](https://blog.csdn.net/rzfanfan/article/details/120289904)

## 设置问题
如果不用代理，可能不能上传，所以需要设置代理。我用的端口是1087。如果没有，就不推荐用了。

![img](https://i.imgur.com/8eBQcuk.png)

<!-- ![img](https://i.imgur.com/gDViYZc.jpeg) -->