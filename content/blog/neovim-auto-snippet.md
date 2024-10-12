+++
title = "Neovim自动补全snippet（代码）插件"
date = 2024-10-12
+++

首先，我们选用的插件是[LuaSnip](https://github.com/L3MON4D3/LuaSnip?tab=readme-ov-file)，采用的插件管理包是`lazy`。

# 安装
在我的~/.config/nvim/lua/plugins.lua文件中添加如下代码：

```lua
require("lazy").setup({
     -- 代码片段snippet 
    -- 安装LuaSnip
    {
        "L3MON4D3/LuaSnip",
        -- follow latest release.
        version = "v2.*", -- Replace <CurrentMajor> by the latest released major (first number of latest release)
        -- install jsregexp (optional!).
        build = "make install_jsregexp",
        dependencies = { "rafamadriz/friendly-snippets" },
        config = function()
            -- 安装Vscode-like snippet
            require("luasnip.loaders.from_vscode").lazy_load()
        end,
    },
})
```
注意，我们还添加了一个依赖[rafamadriz/friendly-snippets](https://github.com/rafamadriz/friendly-snippets?tab=readme-ov-file)，通过`luasnip.loads.from_vscode`来访问Vscode-like的代码片段。

## 在nvim-cmp的依赖中添加LuaSnip
这一步是为了让nvim-cmp支持LuaSnip的代码片段。
我之前没想到这一步，浪费了很多时间，因为代码片段依赖代码补全插件，如果不通过cmp来触发，那么代码片段永远不会出现。
我在[这里](https://sbulav.github.io/vim/neovim-setting-up-luasnip/)得到了启发。

```lua
-- Auto-completion engine
{
    "hrsh7th/nvim-cmp",
    dependencies = {
        "lspkind.nvim",
        "hrsh7th/cmp-nvim-lsp", -- lsp auto-completion
        "hrsh7th/cmp-buffer", -- buffer auto-completion
        "hrsh7th/cmp-path", -- path auto-completion
        "hrsh7th/cmp-cmdline", -- cmdline auto-completion
        "saadparwaiz1/cmp_luasnip", --自动补全代码snippet，这里是关键
    },
    config = function()
        require("config.nvim-cmp")
    end,
},
```

现在，当你输入html5的时候，就会触发代码片段，html5的代码片段（模版）了。

## 参考资料
[reddit讨论](https://www.reddit.com/r/neovim/comments/1191vuw/lazyvim_react_and_js_snippets_what_do_you_use_and/)

[别人配置好的dotfiles](https://github.com/miraculusik/dotfiles/blob/main/.config/nvim/init.lua)