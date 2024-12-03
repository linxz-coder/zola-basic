+++
title = "如何让iOS App在Mac上运行？"
date = 2024-12-03
+++

如何让iOS App在Mac上运行？

1. 项目设置 - 添加"Mac Catalyst"

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202412031713599.png)

2. 确定`Signing & Capabilities`里面的`Signing Certificate`是`Development`状态。而不是run locally。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202412031717928.png)

3. 在预览前选择`My Mac(Mac Catalyst)`就可以实现Mac的预览了。
