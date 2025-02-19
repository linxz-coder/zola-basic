+++
title = "SwiftUI打包.dmg步骤"
date = 2025-02-19
authors = ["小中"]
[taxonomies]
tags = ["swiftUI"]

+++

以下是没有Apple Developer证书的方法

在`Signing & Capabilities`里面选中 macOS，

Signing Certificate 选择 `Sign to Run Locally`。

构建发布版本：
* 在 Xcode 菜单中选择 "Product" > "Archive"
* 等待构建完成
* 在弹出的 Archives 窗口中，选择最新的归档
* 点击 "Distribute App"，选择`Custom`
* 选择 "Copy App"
* 选择保存位置

这样就可以打开你的App了。
