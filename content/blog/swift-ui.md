+++
title = "SwiftUI介绍"
date = 2024-12-02
+++

2019年推出。

为了让初学者更快掌握swift。

与swiftUI相对的，就是稳定的UIKit。

特点：

1. 拖动图标，自动生成代码。
2. 复用component
3. live preview
4. 多平台:Mac, watch等等

# 如何开始swiftUI项目？

Interface 改成 `swiftUI`即可。

## 将代码小窗口去掉

Editor - minimap, 勾选去掉即可。

## 拖动元素改变字体

通过`object library`（+号）查找font关键词即可。将它拖动到代码侧。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202412021433170.png)

## 设置背景色

查找color，将颜色和其他元素设置成zstack，可以通过ctrl+单击选中元素，选择`ZStack`即可。

```swift
import SwiftUI

//content部分
struct ContentView: View {
    var body: some View {
        ZStack{
            //设置背景色，覆盖safe area
            Color(.systemTeal).edgesIgnoringSafeArea(.all)
		//其他元素
		...
	}
```

## 并列两个元素

选择vstack。放到一起：

```swift
import SwiftUI

//content部分
struct ContentView: View {
    var body: some View {
        ZStack{
            //设置背景色，覆盖safe area
            Color(.systemTeal).edgesIgnoringSafeArea(.all)
            
            //修改字体颜色
            VStack {
                Text("I am Rich")
                    .font(.system(size: 40))
                    .fontWeight(.bold)
                    .foregroundColor(Color.white)
                Image("diamond")
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: 200, height: 200, alignment: .center)
            }
        }
    }
}

//preview部分
#Preview {
    ContentView()
}
```

# UI颜色灵感

[flatuicolors](https://flatuicolors.com/)

## 颜色转换 hext to rgb

[rapidtables](https://www.rapidtables.com/convert/color/hex-to-rgb.html)

# 字体选择

[google字体](https://fonts.google.com/)

## 添加自定义字体

重点：在Info里面添加字体信息。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202412021543589.png)

# 如何复用元素

ctrl + 单击 -> Extract Subview

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202412021628235.png)

# swiftUI的list

```swift
List{
	//元素
}
```

# 如何刷新预览

cmd + option + P

# swift获取api

```swift
    func fetchData(){
        guard let url = URL(string: "https://hn.algolia.com/api/v1/search?tags=front_page") else {return}
        let session = URLSession(configuration: .default)
        let task = session.dataTask(with: url) {(data, response, error) in
            guard error == nil else {return}
            let decoder = JSONDecoder()
            guard let safeData = data else {return}
            do{
                let result = try decoder.decode(Results.self, from: safeData)
            } catch {
                print(error)
            }
        }
        task.resume()
    } 
```
