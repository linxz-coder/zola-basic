# 站内关键词搜索

搜索随正常的 `zola build` 一起生成，无需服务器、API key、npm 依赖或发布后的爬虫。
Cloudflare Pages 原有构建命令不变。旧搜索 Action 已改为构建与搜索回归检查。

- 文章标题优先，其次是正文中的各级小标题，最后是正文。每篇文章只显示一次。
- 中文按子串匹配；英文忽略大小写、全半角。空格分隔的关键词必须全部出现，可分布在不同字段。
- 同一优先级先排完整短语匹配，再排较新的文章。小标题结果直接跳到对应锚点。
- 索引覆盖各栏目已发布页面及有正文的栏目页。设置 `[extra] search_exclude = true` 可排除页面或整个栏目。

## 加载方式

页面只加载约 8 KB 的搜索交互脚本（ES module，延后执行）和约 4 KB 的样式。
输入非空关键词后，才启动 Worker、下载搜索引擎和 `/search-index/` 索引。
JSON 解析、文本准备和匹配全部在 Worker 中执行。中文输入法组合期间不查询。
同页后续查询复用已加载的索引；新页面第一次搜索会重新验证缓存，及时获取新文章。

`templates/search-index.html` 使用 Zola 的栏目树生成 JSON。虽然输出路径是
`search-index/index.html`，Cloudflare Pages 的 `static/_headers` 会将响应设为
`application/json` 并禁止搜索引擎收录。前端也始终以 JSON 读取，并用文本节点显示结果。

## 验证

```sh
zola build
ZOLA_SEARCH_DIR=public npm test
```

检查浏览器网络请求：打开首页、只聚焦搜索框时，均不应请求索引或 Worker；
输入关键词后才出现请求。还应检查手机端、键盘上下选择、Esc 关闭和断网后的重试。
修改搜索模块协议时，一起更新 `base.html`、`search.js` 和 `search-worker.js` 中的资源版本号。

## 手机端交互

手机端聚焦搜索时展开独立面板，顶部输入框和取消按钮固定，结果区域单独滚动。
面板高度跟随可见视口，适应软键盘弹出；关闭后恢复原页面的滚动位置。
标题和摘要最多各两行，小标题最多一行，摘要源文本不超过 90 字符（另含省略号）。

Safari 触摸链接时会先触发 `focusout`，且 `relatedTarget` 可能为 `null`。
这种情况下必须保留结果，等待原生链接点击；只在明确焦点移出、点击外部或取消时关闭。
不要在 `pointerdown` 中强制跳转，否则滚动、长按或新标签打开会受到影响。

已安装 Python Playwright 时可验证触摸和桌面交互：

```sh
python3 -m playwright install chromium webkit
python3 tests/search-browser.py --url http://127.0.0.1:18766/
```

该测试实际点击文章和小标题链接，并检查返回、取消、滚动恢复和缩小视口。
浏览器的手机模拟不等于实体 iPhone；软键盘采用可见区域缩小的方式检查布局。
