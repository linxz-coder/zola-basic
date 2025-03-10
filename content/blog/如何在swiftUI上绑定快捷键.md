+++
title = "如何在swiftUI上绑定快捷键"
date = 2025-03-10
authors = ["小中"]
[taxonomies]
tags = ["swiftui"]

+++

使用`.keyboardShortcut()`即可。比如`Button{}.keyboardShortcut("n", modifiers: .command)`代表这个button的快捷方式是`cmd+n`。


## 完整代码

```swift
        .toolbar {
            ToolbarItem(placement: .primaryAction) {
                Button {
                    chatViewModel.createNewSession()
                    userFinishedInput = false
                    message = ""
                } label : {
                    Label("新会话", systemImage: "plus.circle")
                        .font(.callout)
                }
                .keyboardShortcut("n", modifiers: .command)
            }
        }
```
