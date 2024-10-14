+++
title = "如何绕过wordpress编辑器上传图片"
date = 2023-10-22
+++

有段时间，托管wordpress的服务器系统负载过大，CPU使用率总是显示100%，几乎不能编辑任何文章。

后来，我发现了是系统性能问题，我是1G内存的阿里云轻量服务器，购买了2G内存的腾讯云轻量服务器解决了这个问题。

其实，系统负载过大大部分时间是图片上传问题，我有个办法可以绕过wordpress的编辑器上传图片，就不会让服务器系统过载，从而导致死机。

# 安装Add From Server插件

在wordpress后台，下载 Add From Server 这个插件，直接把图片上传到服务器，再通过插件转移到媒体库，直接引用媒体库图片即可。

可参考：

```bash
scp -r  /Users/lxz/Downloads/from-server root@your-server-IP:/var/www/html/wp-content/uploads
```

## 参考资料
[wordpress论坛](https://wordpress.org/support/topic/wordpress-image-upload-error-post-processing-of-the-image-failed/)
