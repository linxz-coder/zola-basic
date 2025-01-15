+++
title = "什么是Android的lazy columns？"
date = 2025-01-15
authors = ["小中"]
[taxonomies]
tags = ["安卓"]

+++

懒加载。

只加载用户滑动到的内容，其他暂时不加载。

```kt
LazyColumn(
    modifier = Modifier.fillMaxSize().padding(16.dp)
) {
    items(sItems){
    }
}
```
