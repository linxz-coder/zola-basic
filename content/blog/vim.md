+++
title = "linux知识-如何使用vim/neovim编辑器？"
date = 2023-10-14
+++

阿里云内置vim编辑器，用来编辑文件很方便。在这里写一些简单的操作。

输入`i`进入插入模式，可以插入信息

按下`esc`进入一般模式

# 复制粘贴

在一般模式下

`y` - 复制

`yy` - 复制一行

`7yy` - 复制七行（在第一行的位置输入7yy）

`p` - 粘贴文本

## 复制部分文本
按`v`进入可视模式，选择多行，按`y`或者`"+y`（复制到系统剪贴板）

## 复制当页
`yG`复制当页的内容。如果复制不全，按command-缩小页面

## 复制全文
`ggVG` - 选中全文

`ggVGy` - 复制全文

`"+y` - 复制到系统剪贴板

# 删除
`dd` - 删除行

`7dd` - 删除七行

## 全部删除
`dG`

# 返回上一步
一般模式下，按`u`

# 多行缩进
按`v`或者V进入visual模式

上下键选中多行

`shift+<` 左缩进

`shift+>` 右缩进

# 与上一行缩进保持一致

v进入visual模式

按`↓`来选中需要缩进的行

按`=`保持与未选中的上一行一样的距离

# 查找
输入`/`，输入查找内容，按回车

`n`是查找下一个，`N`是查找上一个。

# 移到最后一行
输入大写`G`即可

# 光标移到首行
输入`gg`
