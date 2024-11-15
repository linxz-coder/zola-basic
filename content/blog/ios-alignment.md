+++
title = "ios如何对齐元素？"
date = 2024-11-15
+++

比如，可以让所有元素其分为三等分的View组件。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411151042050.png)

我们可以插入三个view组件，作为3个container。

## 方式一：插入View组件

1. 输入`UIView`可以找到`View`组件，插入即可。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411151045858.png)


2. 把logo拉到View组件的下方，使得我们可以看到logo

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411151048438.png)

## 方式二：顶部菜单选择

Editor - Embed in - View

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411151115147.png)


## 方式三：底部菜单选择

Embed in - View

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411151117261.png)

# 如何给View容器改名字？

cmd+option+1打开右边菜单 - identity inspector - 改变Label的值即可。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/20241115111957.png)

# 如何对齐三个View容器 - stack view

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411151132336.png)

# 设置stack view的constraints

设置离`safe area`的值，不要设置离view的值。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411151150087.png)

# 修改bottom的constraints，使之相对于`safe area`

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411151157620.png)

# 修正stack的纵向对齐

打开inspectors窗口，找到属性，选择`Fill Equally`，也可以调整间距`Spacing`。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411151200776.png)

# 如何对齐两个骰子元素？

思路：先stackview，再相对于父容器居中对齐即可。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411151217241.png)

# 如何消除container的颜色？
选择三个View，换成default的颜色即可。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411151220375.png)

# 如何改变constraints的最小宽度？

右下角点击`constraints`，设定一个固定宽度和高度。

点击左侧菜单，弹出的inspectors菜单内，调整`Relation`到`Greater than or Equal`。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411151426157.png)

