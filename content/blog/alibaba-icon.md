+++
title = "怎么用阿里巴巴矢量图标库"
date = 2024-12-25
+++

公司设计的icon，最好也上传到此。

# 登录

用手机号+密码登录

# 搜索适合的icon

点击购物车图标（添加入库）

# 添加到项目

选择右上角购物车图标，选择`添加至项目`。如果没有的话，自己新建一个。

# 创作在线连接

点击`查看在线连接`。点击连接进入网址。

# import到主css中

创建一个iconfont的文件夹，并创建一个css文件叫iconfont.scss，将刚才网址的代码复制进去。


在主css文件中导入。

```css
@import "./iconfont/iconfont.scss"; /* 导入css，必须以分号结尾 */
```

# 在项目中使用

```css
<text class="iconfont icon-icon"></text>
```

# 如果出现渲染层错误的提示

项目设置 - 选中Base 64，重新生成链接，复制到iconfont.scss里面，清除缓存-重新编译
