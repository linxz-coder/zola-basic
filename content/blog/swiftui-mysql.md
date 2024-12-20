+++
title = "SwiftUI获取mysql数据"
date = 2024-12-20
+++

SwiftUI获取mysql数据

# 架设一个python后端

```python
from flask import Flask, jsonify
import mysql.connector

app = Flask(__name__)

# 连接数据库的函数
def get_db_connection():
    return mysql.connector.connect(
        host='xxx', # 替换成你的数据库地址
        user='lxz',  # 替换成你的数据库用户名
        password='xxx',  # 替换成你的数据库密码
        database='chat_history'  # 替换成你的数据库名称
    )

# 获取前10个ai_response内容的接口
@app.route('/get_ai_responses', methods=['GET'])
def get_ai_responses():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    
    # 查询前10条ai_response内容
    cursor.execute('SELECT ai_response FROM chat_logs LIMIT 10')
    results = cursor.fetchall()
    
    # 提取ai_response列
    ai_responses = [row['ai_response'] for row in results]
    
    # 关闭连接
    cursor.close()
    connection.close()

    return jsonify(ai_responses)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
```

这个后端以数组的形式输出数据库`ai_response`列的前十个内容。

# 设置一个ViewModel连接

方式和api连接的方式一样。

除了要注意`decode`的方式，需要根据后端返回的结果修改，可以先用Postman测试一下返回的结果，再看这么接数据。

```swift
import SwiftUI

class ViewModel: ObservableObject {
    @Published var responseText: [String]? = []
    
    //MARK: - GET请求
    func fetchAIResponses(){
        //创建url
        guard let url = URL(string: "http://127.0.0.1:5001/get_ai_responses") else { return }
        
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
            
            // 解析 JSON 数据 - 数组
            guard let content = try? JSONDecoder().decode([String].self, from: data) else {
                print("JSON Parsing Error or unexpected structure")
                return
            }
            
            //测试返回值
            print(content)
            
            DispatchQueue.main.async {
                self.responseText = content  // 更新界面上的文字内容
            }
        }
        
        task.resume()
    }
}
```

# 前端代码 - ContentView

```swift
import SwiftUI

struct ContentView: View {
    
    @StateObject var viewModel = ViewModel()
    
    var body: some View {
        
        VStack {
            if let responses = viewModel.responseText{
                List(responses, id: \.self) { response in
                    Text(response)
                }
                .listRowSpacing(20)
            } else {
                Text("没有数据")
            }
            
            Button {
                viewModel.fetchAIResponses()
            } label: {
                Text("点击获取数据库数据")
            }

        }
        
    }
}

#Preview {
    ContentView()
}
```
