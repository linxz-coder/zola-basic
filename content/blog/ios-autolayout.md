+++
title = "ios-autoLayout 自适应画面"
date = 2024-11-14
+++

如何实现ios的自适应画面？

综合运用`constraints`和`alignment`。

# 调整背景图-constraints

作用：调整四周的距离。

上下左右都调整成0，并点击红色工字线激活。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411141134324.png)

## 激活constraint

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411141137548.png)

为了上下全屏，去掉`安全区域`（如菜单区域），选择`superview`。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411141145465.png)

注意，如果不奏效，留意`constraints`的值是否为0。

# 调整logo位置-alignment

让logo居中显示，点击右下角`Align`，勾选horizon和vertical选项，均为0即可。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411141412458.png)

# 改变两个图片的相对距离

constraint下面可以点选，选中其他图片，再填写距离的数字，比如30px，就可以了。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411141424916.png)


# constraint 和 alignment的区别

**constraint是绝对距离，指离边框的距离。**

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411141416506.png)

但是横向的有可能问题：

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411141416638.png)

**alignment指从中心向外侧的偏移，适用于不同屏幕状态的居中或者保持元素间的相对距离。**

![alignment-diff](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411141418480.png)
