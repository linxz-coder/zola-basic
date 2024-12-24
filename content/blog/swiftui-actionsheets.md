+++
title = "SwiftUI里的actionSheets"
date = 2024-12-24
+++

# actionSheet已经弃用

请用[confirmationDialog](https://developer.apple.com/documentation/avkit/videoplayer/confirmationdialog(_:ispresented:titlevisibility:actions:)-7tvlw)

# actionSheets和alert的主要区别

actionSheets允许设计更多的按钮。底部菜单而不是中间菜单。

# 示例代码

```swift
Vstack{}
.confirmationDialog("Do you really want to delete the item?", isPresented: $showConfirmationDialog, titleVisibility: .visible) {
    if(who=="me"){
        Button("Delete"){backgroundColor = .red}
    }else{
        Button("Share"){backgroundColor = .yellow}
        Button("Report"){backgroundColor = .blue}
    }
} message: {
    Text("The action cannot be undone.")
    }
```
