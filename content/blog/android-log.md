+++
title = "Android的日志"
date = 2024-11-16
+++

五个等级。

• Log.e：表示错误信息，比如可能导致程序崩溃的异常。

• Log.w：表示警告信息。

• Log.i：表示一般消息。

• Log.d：表示调试信息，可把程序运行时的变量值打印出来，方便跟踪调试。

• Log.v：表示冗余信息。

代码：

```java
Log.d("ning", "OnCreate");
```

在左下角点击`LogCat`窗口可以打开，查看日志。

可以筛选日志：

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411152325422.png)
