+++
title = "swift第三方库/包管理器cocoapods"
date = 2024-11-26
+++

[cocoapods](https://cocoapods.org/)

# 安装cocoapods

加上`-V`，指verbose，可以看到安装过程，不然会看到屏幕突然停住。

```swift
sudo gem stall cocoapods -V

pod setup --verbose
```

如果因为网络原因，可以引入代理：

```swift
export http_proxy=http://127.0.0.1:1087
export https_proxy=http://127.0.0.1:1087
```

如果想保持代理长期有效，可以考虑放到~/.zshrc里面。

## 如果显示ruby的版本太久，比如2.x.x版本，需要升级：

安装rvm

```bash
curl -sSL https://get.rvm.io | bash -s stable
```

重新加载 RVM

```bash
source ~/.rvm/scripts/rvm
```

安装ruby新版本

```bash
rvm install 3.2.2 --with-openssl-dir=$(brew --prefix openssl@3)
```

验证ruby版本

```bash
ruby -v
```

重新安装cocoapods

```bash
sudo gem install cocoapods -V
```

## 可选：国内安装速度慢，可以换成国内源：

这个是网上找的方法，我实践下来不如代理好用。也装不了。

```swift
# 先删除默认源
gem sources --remove https://rubygems.org/

# 添加国内镜像源
gem sources --add https://gems.ruby-china.com/

# 安装 CocoaPods
sudo gem install cocoapods
```

[解决方案](https://juejin.cn/post/6987549601343471623)

## 查看是否安装成功

```swift
pod --version
```

# 使用cocoapods

## 生成Podfile

```bash
pod init
```

我们要安装[CLTypingLabel](https://cocoapods.org/pods/CLTypingLabel)这个包。

找到Podfile，右键用xcode来打开

```bash
platform :ios, '9.0'

target 'Flash Chat iOS13' do
  use_frameworks!

  # Pods for Flash Chat iOS13
  
  pod 'CLTypingLabel'

end
```

## 安装包

```bash
pod install
```

### 安装显示版本不兼容

需要到项目配置页，修改项目配置到`Xcode 16.0`。

[参考教程](https://github.com/CocoaPods/CocoaPods/issues/12671)

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411271018883.png)


## 使用

打开.xcworkspace文件，白色的（非原来蓝色的）文件。之后的项目在这里操作。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411271025068.png)

### build失败

如果提示sandbox问题，可以在target - build setting里面-查找enable_user，将yes改为no即可。

[stackoverflow](https://stackoverflow.com/questions/76590131/error-while-build-ios-app-in-xcode-sandbox-rsync-samba-13105-deny1-file-w)

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411271044605.png)

## 卸载包

1. 把配置改回正常，比如把CLTyping类别改回UILabel类别
2. Podfile删除该包
3. 重新pod install即可



# 其他包管理器选择

## Swift Package Manager

如何看出是否可以用SPM？如果项目有Package.swift，就可以用

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411271137984.png)

引入：

File - Add Package dependency

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411271149802.png)

## Carthage
