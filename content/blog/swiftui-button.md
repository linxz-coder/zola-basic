+++
title = "swiftUI如何做button？"
date = 2024-12-17
+++

# button两种基本生成方式

文字Button用形式一，其他类型（如图片）Button用形式二。

## 形式一：Button(String){action}

```swift
Button("Press me!") {
                title = "Button was pressed."
}
.accentColor(.red) //button颜色
```

## 形式二：Button {action} label: {design}

```swift
            Button {
                title = "Button #2 was pressed"
            } label: {
                //Text("Button #2")
                Image(systemName: "plus")
            }
```

# button属性

## 形状

Circle()
	.frame(width: 75, height: 75)

Capsule()
	.stroke(.gray, lineWidth:2)

### 覆盖形状

Circle()
	.frame(width: 75, height: 75)
	.overlay{
		Image(systemName: "heart.fill")	
	}

## 边距
.padding()

### 左右边距
.padding(.horizontal, 20)

## 字体
.font(.headline)

.fontWeight(.semibold)

## 颜色
.foregroundColor(.white)

.background(.blue)

### 自定义颜色

注意：swiftUI中，RGB颜色是从0到1的数，所以都要除以255

.foregroundColor(Color(red: 139/255, green: 33/255, blue: 17/255))

## 圆角
.cornerRadius(10)

## 阴影
.shadow(radius: 10)

# 案例

```swift
import SwiftUI

struct ButtonBootCamp: View {
    
    @State var title: String = "This is my title."
    
    var body: some View {
        VStack(spacing:20) {
            Text(title)
            
            // 文本Button
            Button("Press me!") {
                title = "Button was pressed."
            }
            .accentColor(.red) //button颜色
            
            // 形状Button
            Button {
                title = "Button #2 was pressed"
            } label: {
                //Text("Button #2")
                Image(systemName: "plus")
            }
            
            // 测试Button属性1
            Button {
                title = "Button #3 was pressed"
            } label: {
                Text("save".uppercased())
                    .font(.headline) //加粗
                    .fontWeight(.semibold)
                    .foregroundColor(.white)
                    .padding()
                    .padding(.horizontal, 20)
                    .background(.blue)
                    .cornerRadius(10)
                    .shadow(radius: 10)
            }
            
            //测试Button属性2
            Button {
                title = "Button #4 was pressed."
            } label: {
                Circle()
                    .fill(.white)
                    .frame(width: 75, height: 75)
                    .shadow(radius: 10)
                    .overlay {
                        Image(systemName: "heart.fill")
                            .font(.largeTitle) //增大图标
                            .foregroundColor(Color(red: 139/255, green: 33/255, blue: 17/255))
                    }
            }
            
            //测试Button属性3
            Button {
                title = "Button #5 was pressed."
            } label: {
                Text("Finish".uppercased())
                    .font(.caption)
                    .bold()
                    .foregroundColor(.gray)
                    .padding()
                    .padding(.horizontal, 10)
                    .background(
                        Capsule()
                            .stroke(.gray,lineWidth: 2)
                    )
            }
        }
    }
}

#Preview {
    ButtonBootCamp()
}
```



