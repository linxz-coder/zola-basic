+++
title = "kotlin的list"
date = 2025-01-14
authors = ["小中"]
[taxonomies]
tags = ["kotlin"]

+++

增删查改

```kt
fun main() {
    // Immutable list
    val iShoppingList = listOf("Processor", "RAM", "Graphics Card", "SSD")

    // Mutable list
    val shoppingList = mutableListOf("Processor", "RAM", "Graphics Card RTX3060", "SSD")

    // Add items
    shoppingList.add("Cooling System")

    // Delete items
    shoppingList.remove("Graphics Card RTX3060")
    shoppingList.add("Graphics Card RTX4090")

    // Modify items
    /* 方法一: index */
    shoppingList[4] = "Graphics Card RT 7800XT"
    /* 方法二: set */
    shoppingList.set(3, "Water Cooling")

    // find items
    val hasSSD = shoppingList.contains("SSD")
    println(hasSSD)
    
    println(shoppingList)
}
```


