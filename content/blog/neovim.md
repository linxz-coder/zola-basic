+++
title = "如何使用neovim"
date = 2024-10-10
+++

# 什么是neovim
neovim是vim的一个分支，给程序员写代码的IDE，喜欢vim的程序员可以用它来`取代vscode`。

# 快速注释
点击`gcc`可以注释或者取消注释，`gc+enter`可以达到一样的效果。

# 安装neovim

可以选择直接下载安装包，也可以用`brew`安装。

```bash
brew install neovim
```

这是[安装教程](https://github.com/neovim/neovim/blob/master/INSTALL.md)。

# 使用neovim

安装结束后，直接输入`nvim`就可以打开neovim。

不过，现在的neovim还不是完全体，需要安装插件，比如可以查看文件树的`nerdtree`插件。

# 安装插件

## 安装插件管理器vim-plug

安装插件需要用到`vim-plug`，可以点击[github教程](https://github.com/junegunn/vim-plug)，安装方法如下：

```bash
sh -c 'curl -fLo "${XDG_DATA_HOME:-$HOME/.local/share}"/nvim/site/autoload/plug.vim --create-dirs \
       https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim'
```

这里规定，插件都放在`~/.local/share/nvim/plugged`目录下。

安装完`vim-plug`后，可以在`~/.config/nvim/init.vim`中添加插件，比如：

```bash
call plug#begin('~/.local/share/nvim/plugged')

Plug 'preservim/nerdtree'

call plug#end()
```

## 安装插件nerdtree

配置完插件后，可以用`nvim`打开neovim，在最下方输入`:PlugInstall`来安装插件。

## 快捷键绑定

在`~/.config/nvim/init.vim`中添加快捷键绑定，比如：

```bash
map <F2> :NERDTreeToggle<CR>
```

这样，按`F2`就可以打开或关闭文件树。

## 文件树nerdtree的使用

### 新建文件
新建文件按`m`-`a`，如果是文件夹要在后面加/，比如src/

### 删除文件
在文件上按`m`-`d`，然后按`y`确认删除。

# 参考资料
[neovim的配置](https://z.wiki/tech/neovim.html)