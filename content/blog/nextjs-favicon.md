+++
title = "如何改变 nextjs app 的网页标签favicon？"
date = 2023-09-21
+++

如何改变 nextjs 的 title？涉及图标和文字。

# 图标

将图标放在 app 文件夹下的 favicon.ico

![nextjs-favicon1](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/nextjs-favicon1.png)

注意，必须是.ico的格式，可以在这个[网站](https://favicon.io/favicon-converter/)转换图片格式。

# 文字

改变 app 下的 layout.tsx，如下图：

![nextjs-favicon2](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/nextjs-favicon2.png)

主要改变 title 里面的内容。

最后效果如下：

![nextjs-favicon3](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/nextjs-favicon3.png)



