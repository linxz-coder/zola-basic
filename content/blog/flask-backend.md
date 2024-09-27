+++
title = "如何用python-flask框架假设一个api后端"
date = 2024-09-21
+++

## 写一个简单的python flask的api

```python
# mock_server.py
from flask import Flask, request, Response, jsonify
from flask_cors import CORS
import time
import json

app = Flask(__name__)
CORS(app)

# 模拟数据库
mock_responses = {
    "default": "这是一个默认的回答。我可以回答各种问题，请随意提问！",
    "你好": "你好！很高兴见到你。我是一个AI助手，有什么我可以帮助你的吗？",
    "天气": "今天天气晴朗，温度适宜。不过我是一个AI，没有实时的天气数据，建议您查看专业的天气预报哦。",
    "时间": lambda: f"现在的时间是 {time.strftime('%H:%M:%S')}。请注意，这是基于服务器时间的，可能与您的本地时间有所不同。",
}

def get_response(content):
    # 检查是否有完全匹配的关键词
    if content in mock_responses:
        response = mock_responses[content]
        return response() if callable(response) else response
    
    # 检查是否包含某个关键词
    for key, value in mock_responses.items():
        if key in content:
            response = value
            return response() if callable(response) else response
    
    # 如果没有匹配，返回默认回答
    return mock_responses["default"]

@app.route('/api/python', methods=['POST'])
def mock_api():
    data = request.json
    content = data.get('content', '')
    chat_history = data.get('chatHistory', '[]')
    
    # 这里可以使用 chat_history 来实现更复杂的上下文相关回答
    # 现在我们只是简单地打印它
    print(f"Received chat history: {chat_history}")

    response = get_response(content)

    def generate():
        for i in range(0, len(response), 5):
            chunk = response[i:i+5]
            yield chunk
            time.sleep(0.1)  # 模拟延迟

    return Response(generate(), mimetype='text/plain')

if __name__ == '__main__':
    app.run(port=5328, debug=True)
```

## 架设python虚拟环境并安装flask
```bash
python -m venv venv
source venv/bin/activate
pip install flask flask-cors
```

## 运行mock_server.py
```bash
python mock_server.py
```

现在，你可以用`curl`或者`postman`等工具来测试这个api了。
```bash
curl -X POST http://127.0.0.1:5328/api/python -H "Content-Type: application/json" -d '{"content": "你好"}'
```
注意，postman也是直接输入以上的curl命令即可。