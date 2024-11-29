+++
title = "ViewController生命周期lifeCycle"
date = 2024-11-29
+++

viewDidLoad, viewWillAppear, viewDidAppear, viewWillDisappear, viewDidDisappear

注意：viewDidLoad只会运行一次，即首次启动时运行，之后不会再运行。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411291602509.png)

[ViewController-lifeCycle介绍视频](https://www.bilibili.com/video/BV12F4113794?spm_id_from=333.788.player.switch&vd_source=52e547e5d9000389c9906e8cf67193c7&p=132)


# ios Application lifeCycle 生命周期

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411291603831.png)

[Application lifeCycle介绍视频](https://www.bilibili.com/video/BV12F4113794?spm_id_from=333.788.player.switch&vd_source=52e547e5d9000389c9906e8cf67193c7&p=133)

体现在AppDelegate.swift和SceneDelegate.swift两个文件中。

SceneDelegate主要处理不同窗口的优先度的。因为iPad可以允许多窗口运行，它要知道哪些窗口是靠前的。iOS12前是没有这个文件的，因为不允许多窗口运行。

## AppDelegate

didFinishLaunchingWithOptions：App开始

didDiscardSceneSessions： 用户往上推出这个程序

## SceneDelegate

sceneWillResignActive: 用户接电话等中断时的操作，比如可以停止播放音乐。

sceneDidEnterBackground：用户打开了另外的app，app进入后台。

sceneWillEnterForeground：App重新进入前台。
