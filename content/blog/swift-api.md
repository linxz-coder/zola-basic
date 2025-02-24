+++
title = "swift如何make api call?"
date = 2024-11-25
+++

# GET请求四步：

url - session - task - task.resume()

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411251511651.png)

# POST请求

第一项url内容要求更多：url+method+header+content，其他一致。

# GET请求-获取一句名言案例

## 创建ViewModel

需要是一个class, 而且遵循ObservableObject的protocol，方便在视图间调用。

把response变量用@Published暴露出来。

```swift
class ViewModel: ObservableObject {
    @Published var responseText = ""
}
```

## 使用ViewModel

```swift
@StateObject var viewModel = ViewModel()

```swift
Button {
    viewModel.fetchData()
} label: {
    Text("获取一句名言")
}
```

## ViewModel四步连接

### 创建url

```swift
guard let url = URL(string: "https://api.apiopen.top/api/sentences") else { return }
```

### 创建session

```swift
let session = URLSession(configuration: .default)
```

### 创建task

```swift
let task = session.dataTask(with: url) { data, response, error in
            // 错误处理
            guard error == nil else {
                print("Error: \(error!.localizedDescription)")
                return
            }
            
            // 检查响应状态
            guard let httpResponse = response as? HTTPURLResponse,
                  httpResponse.statusCode == 200 else {
                print("Invalid response")
                return
            }
            
            guard let data = data else {
                print("No data received")
                return
            }
            
            // 解析 JSON 数据
            guard let json = try? JSONSerialization.jsonObject(with: data, options: []) as? [String: Any],
                  let result = json["result"] as? [String: Any],
                  let content = result["name"] as? String else {
                print("JSON Parsing Error or unexpected structure")
                return
            }
            
            //测试返回值
            print(json)
            
            DispatchQueue.main.async {
                self.responseText = content  // 更新界面上的文字内容
            }
        }
```

### 开始task

因为task创造时属于挂起状态，所以启用时有`恢复`的意思，这符合操作系统的用词习惯，因此这里用的是resume。

```swift
task.resume()
```

### 完整代码参考

```swift
import SwiftUI

class ViewModel: ObservableObject {
    @Published var responseText = ""
    
    //MARK: - GET请求
    func fetchData(){
        //创建url
        guard let url = URL(string: "https://api.apiopen.top/api/sentences") else { return }
        
        //创建session
        let session = URLSession(configuration: .default)
        
        //创建task
        let task = session.dataTask(with: url) { data, response, error in
            // 错误处理
            guard error == nil else {
                print("Error: \(error!.localizedDescription)")
                return
            }
            
            // 检查响应状态
            guard let httpResponse = response as? HTTPURLResponse,
                  httpResponse.statusCode == 200 else {
                print("Invalid response")
                return
            }
            
            guard let data = data else {
                print("No data received")
                return
            }
            
            // 解析 JSON 数据
            guard let json = try? JSONSerialization.jsonObject(with: data, options: []) as? [String: Any],
                  let result = json["result"] as? [String: Any],
                  let content = result["name"] as? String else {
                print("JSON Parsing Error or unexpected structure")
                return
            }
            
            //测试返回值
            print(json)
            
            DispatchQueue.main.async {
                self.responseText = content  // 更新界面上的文字内容
            }
        }
        
        task.resume()
    }
}
```

[参考项目-LoveTalkApi](https://github.com/linxz-coder/LoveTalkApi)

# POST案例-JSONUpload

```swift
//MARK: - POST请求
    func postData(title:String, content:String) {
            //创建url
            guard let url = URL(string: "https://jsonplaceholder.typicode.com/posts") else { return }
            
            //创建请求
            //1.url
            var request = URLRequest(url: url)
            //2.method
            request.httpMethod = "POST"
            //3.header
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")
            
            //4.content(data)
            let postData: [String: Any] = [
                "title": title,
                "content": content,
                "userId": 1
            ]
            
            //将数据转换为JSON格式
            guard let jsonData = try? JSONSerialization.data(withJSONObject: postData) else {
                print("Failed to convert data to JSON")
                return
            }
            
            request.httpBody = jsonData
            
            //创建session
            let session = URLSession(configuration: .default)
            
            //创建task
            let task = session.dataTask(with: request) { data, response, error in
                // 错误处理
                guard error == nil else {
                    print("Error: \(error!.localizedDescription)")
                    return
                }
                
                // 检查响应状态
                guard let httpResponse = response as? HTTPURLResponse,
                      httpResponse.statusCode == 201 else {  // POST成功通常返回201
                    print("Invalid response")
                    return
                }
                
                guard let data = data else {
                    print("No data received")
                    return
                }
                
                // 解析返回的 JSON 数据
                guard let json = try? JSONSerialization.jsonObject(with: data, options: []) as? [String: Any],
                      let title = json["title"] as? String else {
                    print("JSON Parsing Error or unexpected structure")
                    return
                }
                
                //测试返回值
                print(json)
                
                DispatchQueue.main.async {
                    self.responseText = "发布成功：\(title)"  // 更新界面上的文字内容
                }
            }
            
            task.resume()
        }
```

## uploadView代码示例

关键设置@ObservableObject观察viewModel的值

```swift
import SwiftUI

struct UploadView: View {
    
    @Environment(\.dismiss) var dismiss
    @ObservedObject var viewModel: ViewModel
    
    @State private var title = "" // 标题输入
    @State private var content = "" // 内容输入
    
    var body: some View {
        
        Form {
            Section(header: Text("输入数据")) {
                TextField("标题", text: $title)
                TextEditor(text: $content)
                    .frame(height: 100)
            }
        }
        .navigationTitle("数据上传")
        .navigationBarItems(
            trailing: Button("提交") {
                viewModel.postData(title: title, content: content)
                dismiss()
                // 清空输入
                title = ""
                content = ""
            }
        )
    }
}


#Preview {
    UploadView(viewModel: ViewModel())
}
```

## ContentView代码

```swift
import SwiftUI

struct ContentView: View {
    
    @StateObject var viewModel = ViewModel()
    
    var body: some View {
        NavigationView {
            VStack {
                
                Text(viewModel.responseText)
                    .font(.largeTitle)
                
                Button {
                    viewModel.fetchData()
                } label: {
                    Text("获取一句名言")
                        .font(.headline)
                        .padding()
                        .padding(.horizontal)
                        .background(.blue)
                        .foregroundStyle(.white)
                        .cornerRadius(10)
                }
                
                NavigationLink {
                    UploadView(viewModel: viewModel)
                } label: {
                    Text("上传数据")
                        .font(.headline)
                        .padding()
                        .padding(.horizontal)
                        .background(.green)
                        .foregroundStyle(.white)
                        .cornerRadius(10)
                }
                
            }
            .padding()
        }
    }
}

#Preview {
    ContentView()
}
```

# 其他案例代码：

```swift
import Foundation

struct WeatherManager {
    let weatherURL =
    "https://api.openweathermap.org/data/2.5/weather?appid={your-api-key}&&units=metric&lang=zh_cn"
    
    func fetchWeather(cityName: String){
        let urlString = "\(weatherURL)&q=\(cityName)"
        performRequest(urlString: urlString)
    }
    
    func performRequest(urlString: String){
        //1.Create a url
        if let url = URL(string: urlString){
            //2.Create a URLSession
            let session = URLSession(configuration: .default)
            
            //3.Give the session a task
            let task = session.dataTask(with: url, completionHandler: handle(data:response:error:))
            
            //4.Start the task
            task.resume()
        }
    }
    
    func handle(data: Data?, response: URLResponse?, error: Error?) -> Void{
        if error != nil{
            print(error!)
            return
        }
        
        if let safeData = data {
            let dataString = String(data: safeData, encoding: .utf8)
            print(dataString!)
        }
        
    }
}

```

应用闭包+json解析：

```swift
import Foundation

struct WeatherManager {
    let weatherURL =
    "https://api.openweathermap.org/data/2.5/weather?appid={your-api-key}&&units=metric&lang=zh_cn"
    
    func fetchWeather(cityName: String){
        let urlString = "\(weatherURL)&q=\(cityName)"
        performRequest(urlString: urlString)
    }
    
    func performRequest(urlString: String){
        //1.Create a url
        if let url = URL(string: urlString){
            //2.Create a URLSession
            let session = URLSession(configuration: .default)
            
            //3.Give the session a task
            let task = session.dataTask(with: url) {(data, response, error) in
                if error != nil{
                    print(error!)
                    return
                }
                
                if let safeData = data {
                    self.parseJSON(weatherData: safeData) //在closure里面要加self.
                    
                    //测试响应
                    //let dataString = String(data: safeData, encoding: .utf8)
                    //print(dataString!)
                }
            }
            
            //4.Start the task
            task.resume()
        }
    }
    
    func parseJSON (weatherData: Data){
        let decoder = JSONDecoder()
        do{
            let decoderData = try decoder.decode(WeatherData.self, from: weatherData)
            print(decoderData.main.temp)
            print(decoderData.weather[0].description)
        } catch{
            print(error)
        }
    }
}

```

在Model文件夹中定义数据结构：
```swift
import Foundation

struct WeatherData: Decodable {
    let name: String
    let main: Main
    let weather: [Weather]
    
}

struct Main: Decodable{
    let temp: Double
}

struct Weather: Decodable{
    let description: String
}
```

api返回示例：

```json
{
    "coord": {
        "lon": -0.1257,
        "lat": 51.5085
    },
    "weather": [
        {
            "id": 804,
            "main": "Clouds",
            "description": "阴，多云",
            "icon": "04n"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 10.62,
        "feels_like": 10.06,
        "temp_min": 9.39,
        "temp_max": 11.19,
        "pressure": 997,
        "humidity": 89,
        "sea_level": 997,
        "grnd_level": 993
    },
    "visibility": 10000,
    "wind": {
        "speed": 3.6,
        "deg": 210
    },
    "clouds": {
        "all": 100
    },
    "dt": 1732517346,
    "sys": {
        "type": 2,
        "id": 2075535,
        "country": "GB",
        "sunrise": 1732520140,
        "sunset": 1732550395
    },
    "timezone": 0,
    "id": 2643743,
    "name": "London",
    "cod": 200
}
```


