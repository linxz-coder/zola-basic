+++
title = "zola如何采用主题"
date = 2024-09-21
+++

## 安装主题
```bash
cd themes
git clone <theme repository URL>
```

可以参考官方教程：
https://www.getzola.org/documentation/themes/installing-and-using-themes/

## 使用主题
在config.toml中添加theme字段<br>
注意：要放在最上方。不要在[extra]下面。
```toml
theme = "Seje2"
```

## 使用主题会遇到的问题
1. content通常要复制点东西.
   我实践下来，应该是把themes文件夹里面content文件夹里面的东西复制到项目的content文件夹里面。
   注意：需要参考主题本身的教程。

2. 文件通常带有标签tag，要修改config.toml。
   ```toml
   base_url = "https://example.com"
   taxonomies = [
    {name = "tags"},
   ]
   ```
   注意taxonomies所在的位置，在base_url的下面。

3. 通常要修改config.toml。
   自定义变量要放在[extra]下面：
    ```toml
    [extra]
    seje2_menu_links = [
    {url = "$BASE_URL", name = "Home"},
    {url = "$BASE_URL/categories", name = "Categories"},
    {url = "$BASE_URL/tags", name = "Tags"},
    {url = "https://google.com", name = "Google"},
    ]
    ```

## 下载主题
https://www.getzola.org/themes/

官方主题库，里面有主题和安装方法。
