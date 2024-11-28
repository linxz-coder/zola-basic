+++
title = "ios如何自定义聊天气泡-UITableView-cells"
date = 2024-11-28
+++

在Views文件夹新建一个Cocoa Touch Class，记得勾选.xlb文件，以获取UI界面。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411271749617.png)

在里面添加元素。

聊天软件一般是需要一个气泡view和ImageView(可以在Image属性里改成Avatar头像)

这两个需要组成一个stack，stack的constraints设计成上下左右各10px。

ImageView强制宽和高40x40.

在气泡view里面加上Label，constraints同样设计成上下左右各10px。

如图：

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411271826856.png)

## label允许换行

将`lines`属性设置成`0`即可。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411280958333.png)

此时，对齐会显得奇怪，将stack的对齐方式(alignment)设置成`Top`即可。

## 给气泡view加上弧度

在MessageCell的`awakeFromNib`加上以下内容即可：

```swift
messageBubble.layer.cornerRadius = messageBubble.frame.size.height / 8
```

调整弧度：调整分母即可。分母越大，弧度越小。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411281122261.png)



