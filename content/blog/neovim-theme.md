+++
title = "如何改变neovim主题？"
date = 2024-10-11
+++

# 安装插件管理器
neovim有许多插件管理器，比如vim-plug、lazy.vim、packer.nvim等，我这里选择最流行的[lazy.vim](https://github.com/folke/lazy.nvim)

新建 ~/.config/nvim/lua/plugins.lua 文件并放入如下内容。下面的模板只完成了 lazy.nvim 自身的安装，还没有指定其他第三方插件.

```lua
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not (vim.uv or vim.loop).fs_stat(lazypath) then
  vim.fn.system({
    "git",
    "clone",
    "--filter=blob:none",
    "https://github.com/folke/lazy.nvim.git",
    "--branch=stable", -- latest stable release
    lazypath,
  })
end
vim.opt.rtp:prepend(lazypath)

require("lazy").setup({})
```

然后再 ~/.config/nvim/init.lua 文件中添加如下内容

```lua
require("plugins")
```

此时你重启 Nvim 会发现黑屏没显示，这是因为 lazy.nvim 在安装自己，静待片刻即可☕️。等待 Dashboard 出现之后，可以输入 :Lazy 试试，如果看到了弹出了 lazy.nvim 的窗口，那就安装成功了🎉

Tip：用 :q 退出 lazy.nvim 的窗口

# 主题配置

注意：

macOS 自带的 Terminal.app 只支持 ANSI 256，在安装完 monokai 主题后，你可能会发现显示整个画面变成蓝色。使用颜色支持更丰富的 Terminal 可以解决这个问题（比如 iTerm2、Kitty）

这里用的主题是[monokai.nvim](https://github.com/tanvirtin/monokai.nvim)，在 plugins.lua 进行修改。

```lua
... -- 省略其他行
require("lazy").setup({
    "tanvirtin/monokai.nvim",
})
```

:wq保存更改并重启就可以看到 lazy.nvim 在帮我们安装插件了，新建并编辑 ~/.config/nvim/lua/colorscheme.lua 文件

```lua
-- define your colorscheme here
local colorscheme = 'monokai_pro'

local is_ok, _ = pcall(vim.cmd, "colorscheme " .. colorscheme)
if not is_ok then
    vim.notify('colorscheme ' .. colorscheme .. ' not found!')
    return
end
```

最后在 init.lua 文件里面导入就行.

```lua
... -- 省略其他行
require('colorscheme')
```

## 参考资料
[MartinLwx's blog - 从零开始配置 Neovim(Nvim)](https://martinlwx.github.io/zh-cn/config-neovim-from-scratch/)

注：还可以参考此教程的`代码补全`部分。