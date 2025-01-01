+++
title = "小程序text-area不限制字数"
date = 2025-01-01
authors = ["小中"]
[taxonomies]
tags = ["小程序"]
+++

[解决默认只能输入140个字符的问题](https://developers.weixin.qq.com/community/develop/doc/5d39f76fa8af76f7078dd913e1795acd)

设置`maxlength`属性为-1即可。

```wxml
<textarea maxlength="-1"></textarea>
```