+++
title = "什么是SwiftUI的State？"
date = 2024-12-17
+++

类似react的useState，该变量一旦变化，就重新渲染View。

```swift
import SwiftUI

struct StateBootCamp: View {
    
    //@State:告诉View，监督这个变量，它变化，view就变化
    //类似useState
    @State var backgroundColor: Color = .green
    @State var myTitle: String = "my Title"
    @State var count: Int = 0
    
    var body: some View {
        ZStack{
            //background
            backgroundColor
                .edgesIgnoringSafeArea(.all)
            
            VStack(spacing: 20){
                Text(myTitle)
                    .font(.title)
                Text("Count: \(count)")
                    .font(.headline)
                    .underline()
                
                HStack(spacing:20){
                    Button("Button 1") {
                        backgroundColor = .red
                        myTitle = "Button 1 was Pressed."
                        count += 1
                    }
                    
                    Button("Button2") {
                        backgroundColor = .purple
                    }
                }
            }
            .foregroundStyle(.white)
        }
    }
}

#Preview {
    StateBootCamp()
}

```
