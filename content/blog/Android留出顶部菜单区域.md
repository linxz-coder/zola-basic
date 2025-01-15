+++
title = "Android留出顶部菜单区域"
date = 2025-01-15
authors = ["小中"]
[taxonomies]
tags = ["安卓"]

+++

`Modifier.statusBarsPadding()`

```kt
Column(
    Modifier
        .fillMaxSize()
        .statusBarsPadding(), // 留出顶部区域
	  verticalArrangement = Arrangement.Center
 ){}
```
