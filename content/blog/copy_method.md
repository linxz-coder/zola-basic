+++
title = "浅拷贝和深拷贝的区别"
date = 2024-11-07
+++

浅拷贝和深拷贝

# 浅拷贝 shallow_copy：
只复制指针，不复制值。因此两个变量会指向同一个地址。修改一个对象，会影响另一个对象。

![shallow_copy](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411071010817.png)

# 深拷贝 deep_copy：
复制值，两者指针分别指向不同的地址。修改一个对象，不会影响另一个对象。

![deep_copy](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411071010313.png)

## 参考资料
[rust的所有权解释](https://kaisery.github.io/trpl-zh-cn/ch04-01-what-is-ownership.html)

