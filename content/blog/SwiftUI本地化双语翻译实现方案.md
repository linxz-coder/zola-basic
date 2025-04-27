+++
title = "SwiftUI本地化双语翻译实现方案"
date = 2025-04-27
authors = ["小中"]
[taxonomies]
tags = ["swiftUI"]

+++

# 在主App里创建language变量

```swift
import SwiftUI

@main
struct LanguageTestApp: App {
    @State private var language = "zh"
    
    var body: some Scene {
        WindowGroup {
            ContentView(language: $language)
        }
    }
}
```

# 在视图内使用language变量

主要用`NSLocalizedString`实现功能，bundle负责引导到对应的语言包。

```swift
import SwiftUI

struct ContentView: View {
    @Binding var language: String
    @State var selection: String?
    
    
    var body: some View {
        
        let lprojName = language == "zh" ? "zh" : "en"
        let bundle = Bundle.main.path(forResource: lprojName, ofType: "lproj").flatMap { Bundle(path: $0) } ?? Bundle.main
        
        NavigationSplitView {
            List(selection: $language) {
                Text("中文")
                    .tag("zh")
                
                Text("English")
                    .tag("en")
                
            }
            .onChange(of: language) {
                language = language
            }
        } detail: {
            VStack(alignment: .leading, spacing: 20) {
                Text(NSLocalizedString("language_example",tableName: "Localizable", bundle: bundle, comment: "Language Example"))
                
                Text(NSLocalizedString("sample_text",tableName: "Localizable", bundle: bundle, comment: "Sample text"))
                    .font(.body)
                    .lineSpacing(6)
                    .padding()
                    .frame(maxWidth: .infinity, alignment: .leading)
            }
            .navigationTitle(NSLocalizedString("content",tableName: "Localizable", bundle: bundle,  comment: "Content"))
            .padding()
        }
    }
}

#Preview("中文") {
    ContentView(language: .constant("zh"))
}

#Preview("English") {
    ContentView(language: .constant("en"))
}
```

# 设置对应的语言包

创建新文件，文件名是Localizable.strings。中文的放到`zh.lproj`文件夹，英文的放到`en.lproj`文件夹。

在不同的`Localizable`放入对应的翻译，比如英文的：

```swift
"language_selection" = "Language Selection";
"language_example" = "English Example";
"content" = "Content";
"sample_text" = "The English language is a West Germanic language that originated from Anglo-Frisian dialects brought to Britain in the mid 5th to 7th centuries AD by Anglo-Saxon migrants. With its rich vocabulary and global influence, English has become one of the world's most widely spoken languages, serving as a lingua franca in many international contexts.";
```

中文的：

```swift
"language_selection" = "语言选择";
"language_example" = "中文示例";
"content" = "内容";
"sample_text" = "中国有着五千年的悠久历史和灿烂文化。从古至今，中华文明以其独特的哲学思想、文学艺术、科学技术等多方面成就闻名于世。汉字作为世界上最古老的文字之一，不仅是交流的工具，更承载着中华民族的智慧和情感。";
```

# 疑问：为什么不用官方的简单形式？

我在搜索[官方教程](https://developer.apple.com/documentation/swiftui/localizedstringkey)的时候，发现直接用`NSLocalizedString(key)`的实现，就可以实现本地化，不用创建这么多文件和依赖。但是官方实现有个条件，即需要`用户将系统设置语言调整`。而我的方案，只需要简单点击按钮，即可实现双语切换。这样可以方便在设置页做个“语言切换”按钮。

另外，官方其实给出了[最新的本地化方法](https://developer.apple.com/documentation/xcode/localizing-and-varying-text-with-a-string-catalog)，使用`Localizable.catalog`，但问题同上，需要用户自己设置环境，所以我没有研究，以后有时间再迁移到新方案去。

# 参考教程

[hackingWithSwift](https://www.hackingwithswift.com/example-code/uikit/how-to-localize-your-ios-app)
