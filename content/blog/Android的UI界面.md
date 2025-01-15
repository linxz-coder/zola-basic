+++
title = "Android的UI界面"
date = 2025-01-15
authors = ["小中"]
[taxonomies]
tags = ["安卓"]

+++

主要有Jetpack Compose组成。

# 纵向和横向排列

```kt
@composable
fun UnitConverter( modifier: Modifier = Modifier){
	Column {
		Row{
		}
	}

}
```

# 文本框

textField, BasicTextField, OutlineTextField

单行文本用`OutlineTextField`，使用方式：

```kt
OutlinedTextField(value = "", onValueChange = {
    // Here goes what should happen, when the value changes
})
```

# 按钮和弹出界面

实现按button，弹出界面(Toast)的功能。

```kt
Button(onClick = { Toast
    .makeText(context, "Thanks for clicking!",
        Toast.LENGTH_LONG).show() })
{
    Text("Click Me!")
}
```

## 做一个带箭头的button

```kt
Box{
    Button(onClick = {}){
        Text("Select")
        Icon(Icons.Default.ArrowDropDown, contentDescription = "Arrow Down")
    }
}
```

# 对齐

横向和纵向对齐

```kt
Column(
    modifier = Modifier.fillMaxSize(),
    verticalArrangement = Arrangement.Center,
    horizontalAlignment = Alignment.CenterHorizontally
) {}
```
