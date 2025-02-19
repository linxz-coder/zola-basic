+++
title = "Electron打包Mac应用的方案"
date = 2025-02-19
authors = ["小中"]
[taxonomies]
tags = ["electron"]

+++

没有Apple Developer账号怎么办？

禁用签名，再打包

```bash
export CSC_IDENTITY_AUTO_DISCOVERY=false cnpm run build:mac
```

软件会保存在dist文件夹里。

参考image-compress应用的方案

注意：在Mac只能打包Mac应用，如果要打包.exe需要用Windows电脑或者虚拟机。
