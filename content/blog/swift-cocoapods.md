+++
title = "swift第三方库/包管理器cocoapods"
date = 2024-11-26
+++

[cocoapods](https://cocoapods.org/)

## 安装cocoapods

```swift
sudo gem stall cocoapods -V

pod setup --verbose
```

可选：国内安装速度慢，可以换成腾讯源：

```swift
# 先删除默认源
gem sources --remove https://rubygems.org/

# 添加国内镜像源
gem sources --add https://gems.ruby-china.com/

# 安装 CocoaPods
sudo gem install cocoapods
```

### 查看是否安装成功

```swift
pod --version
```
