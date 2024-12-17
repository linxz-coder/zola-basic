+++
title = "Binding和@Binding的区别"
date = 2024-12-17
+++

均用在SwiftUI中。

# @Binding的介绍

用于父子视图的通信。使用方法：

1. 在子视图定义binding变量。
2. 子视图Binding变量必须作为父子通信的形参。
3. 父视图的State变量必须作为父子通信的实参，且要加上$符号。

```swift
import SwiftUI

struct BindingView: View {
    
    @State var backgroundColor: Color = Color.green
    @State var title: String = "Title"
    
    
    var body: some View {
        ZStack{
            backgroundColor
                .edgesIgnoringSafeArea(.all)
            
            VStack {
                Text(title)
                    .foregroundColor(.white)
                ButtonView(backgroundColor: $backgroundColor, title: $title)
            }
        }
    }
}

#Preview {
    BindingView()
}

struct ButtonView: View {
    
    @Binding var backgroundColor: Color
    @State var buttonColor: Color = Color.blue
    @Binding var title: String
    
    var body: some View {
        Button(action: {
            backgroundColor = Color.orange
            buttonColor = Color.pink
            title = "Change my parent's title!"
        }, label: {
            Text("Button")
                .foregroundColor(.white)
                .padding()
                .padding(.horizontal)
                .background(buttonColor)
                .cornerRadius(10.0)
        })
    }
}

```

# Binding的介绍

本视图下，变量变化时，需要做操作的情况。（比如操作数据库）

```swift
Toggle(item.title, isOn: Binding(
	get : { item.done },
	set: { newValue in
		if let thawedItem = item.thaw() {
			try? thawedItem.realm?.write{
				thawedItem.done = newValue
			}
		}
	}
))
```

说明：

Binding()是一个元素，取代本应在此$variable。

get和set是参数。

get是指获取.done的值，以更新View。

set是指获取值后，即newValue，进行后续的操作。本例中后续将这个值赋给.done，以更新数据库数据。



