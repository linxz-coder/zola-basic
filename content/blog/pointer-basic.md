+++
title = "指针pointer的本质——一个快捷方式"
date = 2024-05-05
+++

最近在学C语言，发现“指针”真的很重要。

弄懂指针，才能清楚内存控制，才能弄懂链表。它是所有知识的线索。

指针的本质是指向地址的地址。是一个快捷方式。

指针是为了方便和灵活操作内存。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/pointer-basic1.png)

比如0x1004的位置，存放了0x1000的位置。

通过*p指针，能够找到0x1000的值。

因此p=0x1000, *p=4

address of p是0x1004，value of p是0x1000。

address of *p是0x1000，value of *p是4。