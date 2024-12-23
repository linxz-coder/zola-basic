+++
title = "SwiftUI的sheets"
date = 2024-12-23
+++

基本使用：

```swift
import SwiftUI

struct SheetsBootcamp: View {
    
    @State var showSheet: Bool = false
    
    var body: some View {
        ZStack{
            Color.green
                .edgesIgnoringSafeArea(.all)
            
            Button {
                showSheet.toggle()
            } label: {
                Text("Button")
                    .foregroundStyle(.green)
                    .font(.headline)
                    .padding(20)
                    .background(.white)
                    .cornerRadius(10)
            }
            //MARK: - Sheet逻辑
            .sheet(isPresented: $showSheet) {
                //DO NOT ADD CONDITIONAL LOGIC
                SecondScreen()
            }
            
            //MARK: - 全屏画面逻辑
//            .fullScreenCover(isPresented: $showSheet) {
//                SecondScreen()
//            }

        }
    }
}

struct SecondScreen: View {
    
    @Environment(\.dismiss) var dismiss
    
    var body: some View {
        ZStack(alignment: .topLeading){
            Color.red
                .edgesIgnoringSafeArea(.all)
            
            Button {
                dismiss()
            } label: {
                Image(systemName: "xmark")
                    .foregroundStyle(.white)
                    .font(.largeTitle)
                    .padding(20)
            }

        }
    }
}

#Preview {
    SheetsBootcamp()
//    SecondScreen()
}
```
