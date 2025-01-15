+++
title = "Android的下拉列表"
date = 2025-01-15
authors = ["小中"]
[taxonomies]
tags = ["安卓"]

+++

需要配置`iExpanded`来显示下拉状态。

使用DropdownMenu和DropdownMenuItem来设置。

`onDismissRequest = { iExpanded = false }`代表点击空白区域收起列表。

示例代码

```kt
var iExpanded by remember { mutableStateOf(false) }

// Input Box
Box{
    // Input Button
    Button(onClick = { iExpanded = true }){
        Text(inputUnit)
        Icon(Icons.Default.ArrowDropDown, contentDescription = "Arrow Down")
    }
    DropdownMenu(expanded = iExpanded, onDismissRequest = { iExpanded = false }) {
        DropdownMenuItem(
            text = { Text("Centimeters") },
            onClick = {
                iExpanded = false
                inputUnit = "Centimeters"
                conversionFactor = 0.01
                convertUnits()
            }
        )
        DropdownMenuItem(
            text = { Text("Meters") },
            onClick = {
                iExpanded = false
                inputUnit = "Meters"
                conversionFactor = 1.0
                convertUnits()
            }
        )
        DropdownMenuItem(
            text = { Text("Feet") },
            onClick = {
                iExpanded = false
                inputUnit = "Feet"
                conversionFactor = 0.3048
                convertUnits()
            }
        )
        DropdownMenuItem(
            text = { Text("Millimeters") },
            onClick = {
                iExpanded = false
                inputUnit = "Millimeters"
                conversionFactor = 0.001
                convertUnits()
            }
        )
    }
}

``
