+++
title = "xcode设置环境变量，存储TOKEN"
date = 2024-11-20
+++

# 创建Config.xcconfig文件

```swift
GITHUB_API_TOKEN = <your-token>
```

# 创建示例文件Config.xcconfig.example

```swift
GITHUB_API_TOKEN = your_github_token_here
```

# 创建.gitignore文件

```bash
# 实际配置有可能在项目文件下面
Zola-Mobile/Config.xcconfig

# 忽略实际配置文件
Config.xcconfig

# 但保留示例文件
!Config.xcconfig.example
```

# info.plist里面添加key-value对
key: GITHUB_API_TOKEN
value: $(GITHUB_API_TOKEN)

![info-plist](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411201453396.png)

# Configurations设置Debug加上环境文件：

注意：你通常不想在release（正式版）里面加上环境文件，通常是用户自己输入token，因此这里选择`Debug`就够了。

![info-plist](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411201455858.png)