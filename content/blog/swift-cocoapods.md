+++
title = "swift第三方库/包管理器cocoapods"
date = 2024-11-26
+++

[cocoapods](https://cocoapods.org/)

## 安装cocoapods

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

### 如果显示ruby的版本太久，比如2.x.x版本，需要升级：

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

### 可选：国内安装速度慢，可以换成国内源：

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

### 查看是否安装成功

```swift
pod --version
```
