+++
title = "如何使用SD（stable diffusion）？"
date = 2024-09-30

+++

如何生成SD上的美女图？

没错，stable diffusion。

SD模型对显卡的要求劝退了不少人，其实，SD可以在云端上跑，完全不用本地的显卡。

首先，你需要科学上网。因为会借助谷歌的账号来登录google colab。

## 第一步 模型网址
点开这个网址：  
https://github.com/camenduru/stable-diffusion-webui-colab

下拉网页，找到chilloutmix模型，点击"stable"版本。  
（注：适合生成亚洲脸的模型）
<br><br>

## 第二步  谷歌登录
进入谷歌colab页面，点击sign in：  

如果你没有谷歌账号，点击create account：  

如果已有谷歌账号，可能需要你进行两步验证。
方法：谷歌会把验证信息发到你手机上的youtube app，点击确认即可：  
<br><br>

## 第三步 运行模型
点击左上角类似”播放”的按钮，就可以开始跑模型了，一般需要等待8-10分钟：

下拉页面，直到生成几个url。随便点击一个url即可到达SD的部署界面：  
<br><br>

## 第四步 开始玩了
这就是基础的SD模型界面，在左上角输入prompt，点击"Generate"，就会在右下角出图，出图需要等待1-2分钟。  
<br><br>

## 第五步 高玩技巧
如果你需要更多的prompt技巧，可以到下面网站去：
https://prompthero.com/stable-diffusion-prompts

如果你想要实现人脸控制，比如lora或者ControlNet模型，可以在C站去：
https://civitai.com/

