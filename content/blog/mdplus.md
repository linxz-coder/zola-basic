+++
title = "如何在vscode中使用markdown快捷snippet"
date = 2024-09-27
+++

由于我使用的是[zola博客](@/blog/zola.md)，所以我在vscode中写markdown的时候，固定要添加头部信息，比如标题、日期等。这些信息在zola中是必须的。

以下是在vscode设置快捷snippet的方法：

## 设置快捷snippet
打开vscode，按下`Ctrl+Shift+P`，输入`snippets`，选择`Preferences: Configure User Snippets`，即`配置代码片段.

注意：如果你开启PicGo（一个图床工具），那么`Ctrl+Shift+P`会被占用，你可以在PicGo的设置中，将快捷键改为其他的。

打开后，选择markdown，然后添加如下代码：
```json
"Markdown Frontmatter": {
    "prefix": "zfm",
    "body": [
        "+++",
        "title = \"$1\"",
        "date = ${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE}",
        "+++",
        "$0"
    ],
    "description": "Insert Markdown frontmatter"
}
```

这个配置文件的意思是，当你在markdown文件中输入`zfm`，然后按下`Tab`键，就会自动插入如下内容：
```markdown
+++
title = ""
date = {当前日期}
+++
```

不过，实践下来，我发现输入`zfm`后，按下`Tab`键，不会自动插入内容。搜索一圈后，在[stackoverflow](https://stackoverflow.com/questions/32703317/how-to-activate-markdown-user-snippets-in-visual-studio-code)上找到解决方法。

方案就是按下`Ctrl+Space`，然后选择`zfm`，然后按下`Tab`键，就会自动插入内容了。

不过，我的电脑上，按下`Ctrl+Space`后，会弹出输入法的选择框，需要改动快捷键。

打开菜单-首选项-键盘快捷方式，搜索`suggestion trigger`或者`触发建议`，然后修改快捷键为`Ctrl+Alt+Space`。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202409271039336.png)

↓

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/20240927104236.png)

现在，你输入`zfm`后，按下`Ctrl+Alt+Space`，然后按下`Tab`键，就会自动插入内容了。
