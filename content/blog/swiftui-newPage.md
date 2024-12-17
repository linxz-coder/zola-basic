+++
title = "swiftUI 如何添加新页面？"
date = 2024-12-17
+++

# 添加新变量

在view的前面添加@State变量。

```swift
@State private var showingAddSheet = false
```

# 添加.sheet

在NavigationStack或者NavigationView的属性添加.sheet

```swift
NavigationStack{}
.sheet(isPresented: $showingAddSheet){
	AddItemView(isPresented: $showingAddSheet)
}
```

# 完整代码参考

```swift
import SwiftUI
import RealmSwift

struct ContentView: View {
    @ObservedResults(Item.self) var items
    @State private var showingAddSheet = false
    
    var body: some View {
        NavigationStack {
            VStack {
                HStack {
                    Text("待办清单")
                        .font(.largeTitle)
                        .padding(.leading, 20)
                    
                    Spacer()
                    
                    Button {
                        print("Button tapped")
                        showingAddSheet.toggle()
                    } label: {
                        Image(systemName: "plus")
                            .font(.system(size: 22))
                            .foregroundColor(.blue)
                    }
                    .padding(.trailing, 20)
                }
                .padding(.top, 60)
                .padding(.bottom, 10)
                
                // 列表内容
                List {
                    ForEach(items, id: \.self) { item in
                        Toggle(item.title, isOn: Binding(
                            get: { item.done },
                            set: { newValue in
                                if let thawedItem = item.thaw() {
                                    try? thawedItem.realm?.write {
                                        thawedItem.done = newValue
                                    }
                                }
                            }
                        ))
                        .toggleStyle(CheckboxToggleStyle())
                        .frame(height: 60)
                        .swipeActions(edge: .trailing, allowsFullSwipe: true) {
                            Button(role: .destructive) {
                                if let thawedItem = item.thaw() {
                                    try? thawedItem.realm?.write {
                                        thawedItem.realm?.delete(thawedItem)
                                    }
                                }
                            } label: {
                                Label("删除", systemImage: "trash")
                            }
                        }
                    }
                }
            }
            .navigationBarHidden(true)  // 隐藏默认导航栏
        }
        .sheet(isPresented: $showingAddSheet) {
            AddItemView(isPresented: $showingAddSheet)
        }
    }
}

#Preview {
    ContentView()
}
```

# 参考项目

[Todoey-swiftui-realm](https://github.com/linxz-coder/Todoey-swiftui-realm)



