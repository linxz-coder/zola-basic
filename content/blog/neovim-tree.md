+++
title = "如何给neovim配置文件树-用lazy.nvim插件"
date = 2024-10-11
+++

首先，我的文件夹结构是

~/.config/nvim/init.lua，
~/.config/nvim/lua/plugins.lua，
~/.config/nvim/lua/colorscheme.lua
~/.config/nvim/lua/keymaps.lua

# 安装nvim-tree插件 - 利用lazy.nvim插件管理包

我们要安装的插件是[nvim-tree.lua](https://github.com/nvim-tree/nvim-tree.lua?tab=readme-ov-file)，不同插件管理包的[安装方法](https://github.com/nvim-tree/nvim-tree.lua/wiki/Installation)。

我会把`nvim-tree.lua`放在`~/.config/nvim/lua`目录下，然后在`plugins.lua`中添加如下内容：

```lua
 -- nvim-tree 配置
    {
        "nvim-tree/nvim-tree.lua",
        version = "*",
        lazy = false,
        dependencies = {
            "nvim-tree/nvim-web-devicons",
        },
        config = function()
            require("nvim-tree").setup {}
        end,
    },
```

因为我把所有的插件都放在`lazy`中，而`lazy`占据了整个`plugins.lua`文件，所以放出整个`plugins.lua`文件以供参考：

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

require("lazy").setup({
    -- 主题
    "tanvirtin/monokai.nvim",

    -- 新添加的 nvim-tree 配置
    {
        "nvim-tree/nvim-tree.lua",
        version = "*",
        lazy = false,
        dependencies = {
            "nvim-tree/nvim-web-devicons",
        },
        config = function()
            require("nvim-tree").setup {}
        end,
    },
    
    -- LSP manager
	"williamboman/mason.nvim",
	"williamboman/mason-lspconfig.nvim",
	"neovim/nvim-lspconfig",


	-- Vscode-like pictograms
	{
		"onsails/lspkind.nvim",
		event = { "VimEnter" },
	},
	-- Auto-completion engine
	{
		"hrsh7th/nvim-cmp",
		dependencies = {
			"lspkind.nvim",
			"hrsh7th/cmp-nvim-lsp", -- lsp auto-completion
			"hrsh7th/cmp-buffer", -- buffer auto-completion
			"hrsh7th/cmp-path", -- path auto-completion
			"hrsh7th/cmp-cmdline", -- cmdline auto-completion
		},
		config = function()
			require("config.nvim-cmp")
		end,
	},
	-- Code snippet engine
	{
		"L3MON4D3/LuaSnip",
		version = "v2.*",
	},
})
```

# 设置快捷键F2快速打开/关闭文件树

在`keymaps.lua`中添加如下内容：

```lua
vim.keymap.set('n', '<F2>', ':NvimTreeToggle<CR>', { noremap = true, silent = true })
```

noremap = tree 代表非递归映射，不会层层引用；silent = true 代表不显示命令行的信息。

这样，按`F2`就可以打开或关闭文件树。

# 快速导航窗口

在`keymaps.lua`中添加如下内容：

```lua
-- Better window navigation
vim.keymap.set('n', '<C-h>', '<C-w>h', opts)
vim.keymap.set('n', '<C-j>', '<C-w>j', opts)
vim.keymap.set('n', '<C-k>', '<C-w>k', opts)
vim.keymap.set('n', '<C-l>', '<C-w>l', opts)
```

这样，按`Ctrl+h`、`Ctrl+j`、`Ctrl+k`、`Ctrl+l`就可以在窗口之间快速导航。h是左，j是下，k是上，l是右。

# 文件改名
只要导航到文件夹窗口，按`r`即可。
