+++
title = "Android项目的目录结构"
date = 2025-01-13
authors = ["小中"]
[taxonomies]
tags = ["安卓"]

+++

视图中可以选择项目或者`Android`形式。

如果是项目，则显示所有文件。

Android的话，则展示项目分类。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202501131153658.png)

# 文件解释

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202501131154941.png)

.gradle和.idea不需要理，编译过程自动生成的。

## app文件夹

代码写在这里面。

### build

项目生成文件，不用管。

### libs

我们使用的第三方的jar包

### src

源代码

1. androidTest - 手机测试代码


2. main
代码和资源文件。
AndroidManifest.xml会配置安卓四大组件。
java文件夹是java代码。
res文件夹是资源，比如图片资源、布局资源、图标等。values有颜色资源，字符串资源和主题资源。

3. test[unitTest] - 电脑测试代码

### proguard-rules.pro

配置文件。配置混淆规则，打正式包才会用到。

## gradle文件夹

配置gradle版本，是编译器。

[gradle的所有版本](https://services.gradle.org/distributions/)

## .build.gradle

全局的编译配置，注意和app里面的同名文件区分。后者是项目级别的。

## gradle.properties

jvm配置信息等。

## gradlew

gradlew和gradiew.bat是创建项目自动生成的，不用管。

## local properties

sdk的配置路径	

## settings.gradle

项目使用哪些模块，比如用了`app`模块



