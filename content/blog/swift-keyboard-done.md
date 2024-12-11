+++
title = "swiftUI键盘Done标签实现"
date = 2024-12-11
+++

# 定义@FocusState

```swift
@FocusState var isFocused: Bool
```

# 添加NavigationView

注意，因为键盘视图要用到.toolbar，它的实现需要依赖NavigationView

```swift
NavigationView {
	...你的代码
}
```

# 添加focused属性和toolbar

.focused属性用来定义键盘是否消失，false状态下键盘消失。

因为要加一个空白将按钮推到右边，所以用`ToolbarItemGroup`，而不是`ToolbarItem`。

```swift
TextField("Title", text: $text)
	.focused($isFocused)
	.toolbar{
		ToolbarItemGroup(placement: .keyboard) {
                        Spacer()
                        Button("Done") {
                            isFocused = false
                        }
                    }
	}
```

# 右上角Done按钮

如果键盘上面的按键被利用了，可以把Done按键放到右上角。

这个if条件指键盘出来时，才出现Done按钮。这样一来，键盘不出现时，navigationBarTrailing即右上角区域可以有其他东西，比如品牌logo，设置按钮等。

```swift
ToolbarItem(placement: .navigationBarTrailing) {
                        if isFocused {
                            Button("Done") {
                                isFocused = false
                            }
                        }
                    }
```

# 最小实现代码示例

```swift
import SwiftUI

struct ContentView: View {
    @FocusState var isFocused: Bool
    @State var text = ""
    
    var body: some View {
        NavigationView {  // 添加NavigationView

            TextField("Title", text: $text)
                .font(.largeTitle)
                .multilineTextAlignment(.center)
                .focused($isFocused)
                .padding()
                .toolbar {
                    //右上角Done标签
                    ToolbarItem(placement: .navigationBarTrailing) {
                        if isFocused {
                            Button("Done") {
                                isFocused = false
                            }
                        }
                    }
                    //键盘上Done标签
                    ToolbarItemGroup(placement: .keyboard) {
                        Spacer()
                        Button("Done") {
                            isFocused = false
                        }
                    }
                }
        }
    }
}

#Preview {
    ContentView()
}

```


# ios如何同时收起键盘和光标：

```swift
            DispatchQueue.main.async {
                searchBar.resignFirstResponder()
            }
```

## DispatchQueue.main.async 的作用：

强制代码块在主线程上异步执行。 因为涉及到UI的更新，一定要在主线程上操作，否则可能产生问题。

searchBar.resignFirstResponder() 用于取消 searchBar 的第一响应者状态，通常会导致键盘收起。该操作本身需要在主线程上完成，否则可能不会生效。

## ios程序的多线程

每个线程都是一个Thread。

网络请求通常都是在Background运行，以致不影响到main Thread。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202412111424361.png)
