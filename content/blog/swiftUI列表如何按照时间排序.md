+++
title = "swiftUI列表如何按照时间排序"
date = 2025-03-10
authors = ["小中"]
[taxonomies]
tags = ["swiftui"]

+++

正常的列表形式是

`ForEach(chatViewModel.sessions) { session in ... }`

加上排序方式是：

`ForEach(chatViewModel.sessions.sorted(by: { $0.timestamp > $1.timestamp }))`

完整代码参考：

```swift
ForEach(chatViewModel.sessions.sorted(by: { $0.timestamp > $1.timestamp }))  { session in
                        Label(session.title, systemImage: "figure.american.football")
                            .tag(session)
                        //右键修改标题
                            .contextMenu {
                                Button{
                                    editingTitle = session.title
                                    selectedSession = session
                                    showingTitleEditor = true
                                }label:{
                                    Label("修改标题", systemImage: "pencil")
                                }
                            }.labelStyle(.titleAndIcon) //右键菜单显示图标
                    }
```
