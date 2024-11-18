+++
title = "ios开发 - storyboard和code的交互"
date = 2024-11-13
+++

# 什么时候需要使用代码，而不是UI界面编辑？

当我们需要动态修改图片时，比如用户按下一个按钮，改变界面上的图片。

# 代码文件

ViewController.swift

# 如何把main界面和代码界面融合？

在main界面右上角，选择三条杠的菜单，点击`assistant`，右侧就会出现对应的代码界面。

快捷键cmd+option+control + 回车

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411131131621.png)

按住control键，就可以把`元素改成代码形式`拖入代码文件中。

这样就会出现IBOutlet（Interface Builder Outlet）的代码：

```swift
 @IBOutlet weak var diceImageView1: UIImageView!
```

# 如何查看mian storyboard的代码形式？

右键 - open as - source code

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411131140691.png)

# main和swift代码变量名不相符时：
选择元素-右键-删除连接-重新连接即可

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411131145664.png)

## iOS-IBAction最好的重命名方式
选中变量名-右键-refactor-rename

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411131148343.png)

## 怎么知道哪个变量名代表哪个元素？

移动到代码前面的小点点即可知道。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411131152989.png)

# 改变变量属性的语法

who.what=newValue

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/20241113115432.png)

# 怎么知道有多少种属性
cmd+option+5可以打开属性窗口，上面的名字就是属性。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/20241113115709.png)

# viewDidLoad是啥意思？

页面一加载，就会执行以下代码。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411131205815.png)

# ios-button的点击事件设置

生成一个IBAction（系统会根据Button来自动判断），而不是IBOutlet。属性设置如下：

type - UIButton

Event - Touch Up Inside

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411131444165.png)

# IBOutlet和IBAction的区别

方向不同。

IBOutlet是从代码侧影响UI侧；

IBAction是从UI侧影响代码侧。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411131451751.png)
