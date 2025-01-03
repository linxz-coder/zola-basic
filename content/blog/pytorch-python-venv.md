+++
title = "李沐教pytorch第一课-被虚拟环境逼疯"
date = 2023-05-16
+++

# 前言

这是B站李沐《动手学pytorch》课程的笔记，本文是第一课的笔记-环境安装。本文可能会解决：

1.虚拟环境是什么？

2.软件依赖是什么？

3.深度学习框架是什么？

4.import pytorch报错

5.安装pytorch报错

如果你在学习机器学习，一定听说过tensorflow, pytorch, 百度飞桨等框架，这些框架的作用是方便你调用模型。

# 1.为什么不用Python?

没错，python是机器学习的编程语言，也可以制作模型，不过需要从0开始。

以造车做比喻，Python相当于原材料，框架相当于做好用Python做好了底盘和轮胎，直接用框架效率更高。

# 2.安装框架的方式

```bash
pip install pytorch
```

那么，这样就万事大吉了吗？当然没有。

你将遇到机器学习的第一个拦路虎——软件兼容（或者叫“软件依赖”）。

# 3.软件不兼容

当你兴冲冲地打开Jupyter notebook，准备大战身手时，你会发现——用不了。你输入：

```bash
import torch
```

报错，不断地报错。

于是你上网找答案，大神们告诉你计算机里面的Python版本错了，需要重新安装，有人却说是pytorch的版本太新，你的Python不兼容。

等等，到底是谁的错？

其实，并不是谁的错，就是婚姻结束，往往不是一个人的错误，是搭配在一起的错误。一般低级版本的Python配不上高级的pytorch，高级的Python不兼容低级的pytorch。

于是，你找解决方法，发现方法是———搭建虚拟环境。

# 4.啥是虚拟环境？

环境即不同软件生存的地方。

比如你的电脑安装了python，pytorch，photoshop等，它们共同存在于这个环境当中。那么，如果他们不能共存怎么办？

比如上文说到的，高级程序看不起低级程序，不肯合作来运行软件咋办？

那么，我们就搭建一个虚拟环境。让高级的程序和高级的程序在一起，低级和低级在一起。当然，电脑兼容不一定是这样搭配，总之，我们是把适合在一起的程序放到一起。

怎么放呢？

下面我们搭建一个虚拟环境（默认安装了conda或Anaconda）：

```bash
conda create --name my_env python=3.9 -y
```

代码解释：

conda是用来装软件的工具，和pip是一样的，只要安装了Anaconda就可以使用此命令

（一般安装jupyter notebook就会装这个软件，不展开讲）

1. create –name 创建名为xx的虚拟环境
2. my_env 虚拟环境的名字，可以随便起，英文的即可
3. python=3.9 指定环境中python的版本，如果需要低版本的python，就更换版本号
4. -y yes，即不用征求你的同意，不会跳出来选择让你“点击下一步”

# 5.启动虚拟环境

安装完虚拟环境了，可以启动了，输入一下代码：

```bash
conda activate my_env
```

此时，如果你在进入terminal(或shell），前面会出现一个括号，显示你已进入虚拟环境，类似如此：

```bash
(d2l) lxz/Desktop >
```

# 6.在虚拟环境中干啥？
## 6.1 安装软件

虚拟环境就是一个空壳，现在你可以往里填东西。填什么东西呢？即那些互相兼容的软件（或者软件版本），你可以自由搭配软件，比如：

```bash
pip install torch==1.12.0

pip install torchvision==0.13.0

pip install d2l==0.17.6
```

没错，以上代码是李沐《动手学深度学习》的安装代码，==后面代表是版本号，解决的是前文提到的兼容问题。

为什么版本号有大有小呢？因为不同软件开发的团队不同，版本号也用的不一致。我们只需要知道上面这三个软件对应三个版本号能够兼容即可。

如何能知道哪些版本的软件兼容呢？答案是我也不知道。

软件行业是动态发展的，每天都几乎有新版本出现，淘汰旧版本。如果停留在旧版本的软件，就跟不上潮流。就像iPhone 4的很多程序无法在iPhone 14手机上运行一样，因为ios程序已更迭多代。

## 6.2 执行代码

如果安装完所需的框架和软件包，就可以愉快地玩耍了。用以下代码打开jupyter notebook:

```bash
jupyter notebook
```

# 7.退出虚拟环境
最后，要退出本环境，回到最初的设定，执行代码：

```bash
conda deactivate
```
