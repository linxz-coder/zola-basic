+++
title = "Neovim如何预览markdown文件？"
date = 2024-10-13
+++

注意：我使用的插件管理器是`lazy`，lazy集成在~/.config/nvim/lua/plugins.lua里面。

# 安装markdown-preview插件
在~/.config/nvim/lua/plugins.lua里面添加如下代码：
```lua
  {
    "iamcco/markdown-preview.nvim",
    cmd = { "MarkdownPreview", "MarkdownPreviewStop" },
    build = function() vim.fn["mkdp#util#install"]() end,
    init = function()
      vim.g.mkdp_filetypes = { "markdown" }
   end,
   ft = { "markdown" },
  },
```

按:wq退出，重新按nvim进入就会自动安装插件。

# 测试预览效果
这个插件的使用方式是:MarkdownPreview和:MarkdownPreviewStop来分别表示预览和预览结束。
我点击了，没有任何反应。

# 查看日志
我询问了claude，让我通过`:messages`来查看日志。显示`Cannot find module 'tslib'`，这是因为缺少了一个node.js的模块。

## 安装tslib模块
```bash
cd ~/.local/share/nvim/lazy/markdown-preview.nvim/app
npm install tslib
```
安装完后，你发现还是无法运行。

## 查看package.json文件
查看 ~/.local/share/nvim/lazy/markdown-preview.nvim/package.json 文件，手动添加依赖：
```bash
"dependencies": {
  "tslib": "^2.3.0"
}
```
这样一来，问题就解决了。

# 正式使用
:MarkdownPreview就是预览。

:MarkdownPreviewStop就是预览结束。

# 其他
claude提示我，还可以进一步让预览自动化，但我还没设置，代码参考：
```lua
vim.g.mkdp_auto_start = 0  -- 在打开 markdown 文件时自动打开预览窗口
vim.g.mkdp_auto_close = 1  -- 在离开 markdown 缓冲区时自动关闭预览窗口
vim.g.mkdp_refresh_slow = 0  -- 实时预览
vim.g.mkdp_command_for_global = 0  -- 使命令在全局范围内可用
vim.g.mkdp_open_to_the_world = 0  -- 预览服务器可以被任意计算机访问
vim.g.mkdp_open_ip = ''  -- 在网络中预览时使用的 IP 地址
vim.g.mkdp_browser = ''  -- 指定预览使用的浏览器
vim.g.mkdp_echo_preview_url = 0  -- 在命令行回显预览页面的 URL
vim.g.mkdp_browserfunc = ''  -- 自定义打开预览页面的函数名
```
