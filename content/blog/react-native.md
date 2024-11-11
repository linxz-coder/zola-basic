+++
title = "React Native介绍"
date = 2024-11-11
+++

2015年Facebook提出的开源框架。

允许通过React语法，开发iOS和Android原生应用

# 移动App的开发模式

## 原生 VS 混合

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411110947600.png)

![img2](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411110952201.png)

[官网](https://reactnative.dev)

[中文网](https://reactnative.cn)

[Github](https://github.com/facebook/react-native)

# 框架

- Expo
    - 简单

- React native
    - 原生
    - 需要配置的条件有点多

React native 和 Expo的关系，相当于React和nextjs的关系，是在原有基础上，继续封装。

## Expo
[Expo官网](https://expo.dev/)

# 竞争对手
- Flutter（Google推出）
    - https://flutter.dev/
    - https://flutter.cn/
- Uniapp（基于Vue.js，推荐）
- Weex（基于Vue.js，阿里出品，很少维护）
- Xamarin
- Cordova
- Ionic
- NativeScript

## React Native, Weex, Flutter对比
![compare-mobile](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411110948208.png)

# Expo环境安装

[React Native官网环境搭建](https://reactnative.cn/docs/environment-setup)

# 安装图片优化工具
```bash
npm install -g sharp-cli
```

# 全局安装expo
```bah
npm install -g expo-cli
```

# 查看expo版本
```bash
expo -V
```

# 开始新项目
```bash
expo init <projectName>
```

# 运行
```bash
yarn start
yarn android
yarn ios
yarn web
```
# React native基础环境搭建

因为React Natice还在测试阶段，还没有1.0版本，所以经常会变，建议参考官方教程：
[官方搭建环境教程](https://reactnative.cn/docs/environment-setup)

# 安装Node.js
版本必须>=12

# 配置国内npm资源镜像
```bash
npm config set registry https://registry.npm.taobao.org
```

# 安装yarn
facebook推出的

```bash
npm install -g yarn
```

# 安装React Native脚手架

```bash
npm install -g react-native-cli
```

# 为什么需要搭建三种环境

注意，Windows下只能搭建Android开发环境

![reactnative-env](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411111000615.png)

# 搭建Android环境

## 安装JDK
参考Java JDK的安装
目前不支持高于Java17的JDK版本

更新：直接按照[官方教程](https://reactnative.cn/docs/environment-setup)用Homebrew安装。

```bash
brew install --cask zulu@17

# Get path to where cask was installed to double-click installer
brew info --cask zulu@17
```

安装完需要进到文件夹双击安装包，进行java17的安装。

## 安装Android Studio
下载Android Studio
这是[下载官网](https://developer.android.google.cn/studio/),需要科学上网。

安装完占8个G的空间

## 安装Android SDK
虽然Android Studio会安装最新的SDK，但是React Native需要Android 14的SDK

## 配置环境变量

通过setting-Languages & Framework-Android SDK查看sdk的位置：
```bash
/Users/lxz/Library/Android/sdk
```

### 配置ANDROID_HOME环境变量

```bash
# 如果你不是通过Android Studio安装的sdk，则其路径可能不同，请自行确定清楚
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
source $HOME/.zshrc
```

 
### 查看命令是否生效
```bash
echo $ANDROID_HOME
```

### 删除旧版本的react-native cli
```bash
npm uninstall -g react-native-cli @react-native-community/cli
```

### 新建项目
```bash
npx @react-native-community/cli@latest init AwesomeProject
```

最新版本可能失效，参考[cli官方版本](https://github.com/react-native-community/cli/releases)。

如果遇到`latest错误`，需要指定版本：
```bash
npx @react-native-community/cli@latest init MyApp --version 0.75.2
```

[官网参考](https://github.com/react-native-community/cli/issues/2486)

### to many files错误
需要在根目录创建一个.vscode文件夹，再创建settings.json文件，输入以下配置：
```bash
{
    "files.watcherExclude": {
      "**/node_modules/**": true,
      "**/dist/**": true
    }
  }

```

### gradle下载错误
在android文件夹下，找到build.gradle，加上阿里源：
```bash
    repositories {
        maven { url 'https://maven.aliyun.com/repository/gradle-plugin' }
        google()
        mavenCentral()
    }
```

### 添加代理设置

找到gradle.properties文件，添加一下代码进去：

```bash
# 添加代理设置
systemProp.http.proxyHost=127.0.0.1
systemProp.http.proxyPort=1087  
systemProp.https.proxyHost=127.0.0.1
systemProp.https.proxyPort=1087

```

## 安装vscode插件
ES7 React/Redux/GraphQL/React-Native

# 搭建iOS环境
## 安装Watchman
Facebook推出的，监控文件变化的工具。

## 安装Xcode

## 安装CocoaPods

# 初始化React Native项目
## 创建项目
### 初始化项目
```bash
react-native init <myproject>
```

### 进入项目
```bash
cd myproject
```

### 运行项目

Andorid项目直接运行：
```bash
yarn android
```

iOS项目需要先安装pod依赖，再运行
```bash
cd ios && pod install && cd ../
yarn ios
```

## 安装VS CODE插件

## 调试工具


# 网络视频教程
[小马教程](https://www.youtube.com/watch?v=Mq1UDQgrdhw&list=PLliocbKHJNwsDq9eICd1XYhL3EgfITibA)

[拉勾教育](https://www.bilibili.com/video/BV1Pt4y1n7bD/?spm_id_from=333.337.search-card.all.click)


