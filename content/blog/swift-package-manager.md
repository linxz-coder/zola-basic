+++
title = "如何让swift package manager走代理？"
date = 2024-11-29
+++

# 命令行代理

```swift
export all_proxy=http://127.0.0.1:1087
```

# 更新SPM的依赖库

自动更新成代理命令行网络代理模式

```swift
xcodebuild -resolvePackageDependencies -scmProvider system
```

# 输入网址自动下载

file - add package dependencies

比如，输入`https://github.com/hackiftekhar/IQKeyboardManager.git`，马上就会显示对应的包。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411290958557.png)

# 关闭xcode

设置完代理后，可能也找不到包，这个时候关闭xcode，重新打开软件，再添加包即可。

# 参考链接

[掘金](https://juejin.cn/post/6946451335948697636)




