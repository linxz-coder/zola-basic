+++
title = "swiftUI在Preview时如何设定binding参数？"
date = 2025-01-25
authors = ["小中"]
[taxonomies]
tags = ["swiftUI"]

+++

设置一个固定值`.constant()`即可。

```swift
#Preview {
    ColorSelectedView(selectedColor: .constant(.blue))
}
```
