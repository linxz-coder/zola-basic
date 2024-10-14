+++
title = "如何给neovim加代码片段(snippet)"
date = 2024-10-14
+++

注意：前提是你安装了`luasnip`的插件，我用的插件管理器是`lazy`，可以参考我之前的[neovim设置](@/blog/neovim-theme.md)，这里就不再赘述。

# 创建代码片段文件夹
```bash
mkdir -p ~/.config/nvim/lua/snippets
touch ~/.config/nvim/lua/snippets/markdown.lua
```

打开 ~/.config/nvim/lua/snippets/markdown.lua 文件，添加以下内容：
```bash
local ls = require("luasnip")
local s = ls.snippet
local t = ls.text_node
local i = ls.insert_node
local f = ls.function_node

local date = function() return {os.date('%Y-%m-%d')} end

ls.add_snippets("markdown", {
  s("zfm", {
    t("+++"),
    t({"", "title = \""}), i(1), t("\""),
    t({"", "date = "}), f(date),
    t({"", "+++", ""}),
    i(0),
  }),
})
```

# 修改plugins.lua
找到LuaSnip的配置部分，并修改如下：

```bash
{
    "L3MON4D3/LuaSnip",
    version = "v2.*",
    build = "make install_jsregexp",
    dependencies = { "rafamadriz/friendly-snippets" },
    config = function()
        -- 加载Vscode-like snippet
        require("luasnip.loaders.from_vscode").lazy_load()
        -- 加载自定义snippets
        require("snippets.markdown")
    end,
},
```

:wq保存并退出。

现在，当你在Markdown文件中输入 zfm 并触发补全（通常是按Tab键），应该会自动展开为你定义的frontmatter模板。


