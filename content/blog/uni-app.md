+++
title = "uni-app介绍"
date = 2024-11-11
+++

开发移动端跨端应用。优点是支持小程序和H5。

[uni-app官网](https://zh.uniapp.dcloud.io/resource.html)

[官方示例代码](https://github.com/dcloudio/hello-uniapp)

# uni-app技术栈
![uni-app技术](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411111713411.png)

# 视频教程
[黑马教程](https://www.bilibili.com/video/BV1Bp4y1379L?vd_source=52e547e5d9000389c9906e8cf67193c7)

[课件](https://github.com/shuhongfan/vue-rabbit)

[咸虾米uni-app教程](https://www.bilibili.com/video/BV1Yg4y127Fp?t=102.1)
[咸虾米项目](https://gitee.com/qingnian8/univue3)
[咸虾米免费api接口](https://api.qingnian8.com/apis/)

# uni-app和原生小程序区别

每个页面是.vue文件，使用Vue.js规范。而不是.wxml文件。

## 属性绑定

`src="{{url}}"` 升级成 `:src="url"`

## 事件绑定

`bindtap="eventName"` 升级成 `@tap="eventName"`，支持（）传参。

## 支持Vue 常用指令

v-for, v-if, v-show, v-model等。

## 调用接口能力

建议前缀wx替换成uni，支持多端开发。
