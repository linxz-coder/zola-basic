+++
title = "SwiftUI滑动删除功能"
date = 2025-02-19
authors = ["小中"]
[taxonomies]
tags = ["swiftUI"]

+++

使用.swipeActions

```swift
List(students){ student in
                HStack{
                    Text(student.name ?? "Unknown")
                    Spacer()
                    Button("Edit"){
                        selectedStudent = student
                        isShow.toggle()
                    }
                }.swipeActions(allowsFullSwipe: true) {
                    Button(role: .destructive) {
                        moc.delete(student)
                        try? moc.save()
                    } label: {
                        Label("删除", systemImage: "trash")
                    }

                }
            }
```
