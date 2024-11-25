+++
title = "xcode运行时出现-1错误"
date = 2024-11-25
+++

xcode使用MacOS的command line tool调试时出现错误：

```
Message from debugger: Error 1
Program ended with exit code: -1
```

解决方案：
修改项目设置 signing & Capabilities - macOS - signin to Run Locally
![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411251143314.png)

[参考链接](https://stackoverflow.com/questions/65986495/getting-message-from-debugger-error-1-for-simple-project-in-xcode-11-0-11a)

