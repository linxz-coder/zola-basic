+++
title = "kotlin的for循环"
date = 2025-01-14
authors = ["小中"]
[taxonomies]
tags = ["kotlin"]

+++

基本使用

```kt
for (item in shoppingList){
    println(item)
    if (item == "RAM"){
        break
    }
}
```

获取index

```kt
for (index in 0 until shoppingList.size){
    println(index)
}
```
