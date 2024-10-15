+++
title = "如何用 Minimax 做 Function calling？"
date = 2023-09-11
+++

# 什么是 Function calling?

Function calling 是将自创函数作为调用ChatGPT等大模型的参数，补足大模型的能力不足。在函数中我们可以做任何事情，例如获取网络上的数据，查询自己的数据库等。

Minimax 是少数可以做 Function calling 的国产大模型，在这个例子中，我设置了一个天气 function，输出一个固定值（实际应用中应接入天气应用的 api），以下介绍使用它 Function calling 的方法：

```python
import requests
import json

group_id="your-id"
api_key="your-key"

content = "深圳天气如何"

# 1. 定义自己的function实现


def getweather(location):
    weather = "晴天，28度"
#     print(weather)
    return weather


# 2. 使用functions选项调用ccp接口

url = f"https://api.minimax.chat/v1/text/chatcompletion_pro?GroupId={group_id}"
headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}
payload = {
    "bot_setting": [
        {
            "bot_name": "MM智能助理",
            "content": "MM智能助理是一款由MiniMax自研的，没有调用其他产品的接口的大型语言模型。MiniMax是一家中国科技公司，一直致力于进行大模型相关的研究。",
        }
    ],
    "reply_constraints": {"sender_type": "BOT", "sender_name": "MM智能助理"},
    "plugins": [],
    "functions": [
        {
            "name": "get_weather",
            "description": "获取天气信息",
            "parameters": {
                "type": "object",
                "properties": {"location": {"type": "string", "description": "要获得天气的地点"}},
                "required": ["location"],
            },
        }
    ],
    "sample_messages": [],
    "messages": [
        {"sender_type": "USER", "sender_name": "小明", "text": content}
    ],
    "model": "abab5.5-chat",
    "tokens_to_generate": 1000,
    "temperature": 0.01,
    "top_p": 0.95,
    "stream": False,
}

response = requests.post(url, headers=headers, json=payload)

print(response.status_code)
# print(response.text)

# 3. 解析ccp接口的响应，并调用自己的function

json_resp = response.json()

if "function_call" not in json_resp:
    print("\n")
    print("======================")
    print("没有经过function call: ")
    print(json_resp['reply'])
    print("======================")
    
else:
    arguments = json.loads(json_resp["function_call"]["arguments"])
    func_resp = getweather(arguments["location"])
    print("\n")
    print("======================")
    print("function call 结果: ")
    print(func_resp)
    print("======================")
    
    answer = func_resp

    # 4. second llm response
    prompt = f'''
    根据知识库答案，用有趣的语气回答用户问题。
    用户问题{content}
    知识库答案{answer}
    '''
    
    payload2 = {
    "bot_setting": [
        {
            "bot_name": "米豆",
            "content": "我是米豆，专门解答各种问题",
        }
    ],
    "messages": [{"sender_type": "USER", "sender_name": "小中", "text": prompt}],
    "reply_constraints": {"sender_type": "BOT", "sender_name": "米豆"},
    "model": "abab5.5-chat",
    "tokens_to_generate": 1034,
    "temperature": 0.01,
    "top_p": 0.95,
    }
    
    headers2 = {"Content-Type": "application/json", "Authorization": "Bearer " + api_key}
    response2 = requests.request("POST", url, headers=headers2, json=payload2)

    print(response2.text)
```

输出结果示例：

```bash
200
======================
function call 结果: 
晴天，28度
======================
{"created":1694415844,"model":"abab5.5-chat","reply":"深圳的天气非常棒哦，阳光明媚，温度适宜，大约28度左右，非常适合外出游玩呢！","choices":[{"finish_reason":"stop","messages":[{"sender_type":"BOT","sender_name":"米豆","text":"深圳的天气非常棒哦，阳光明媚，温度适宜，大约28度左右，非常适合外出游玩呢！"}]}],"usage":{"total_tokens":203},"input_sensitive":false,"output_sensitive":false,"id":"014deee3fe3960f8a40499a642b5c796","base_resp":{"status_code":0,"status_msg":""}}
```

提取内容：

```python
json.loads(response2.text)['reply']
```

输出结果：

```bash
'深圳的天气非常棒哦，阳光明媚，温度适宜，大约28度左右，非常适合外出游玩呢！'
```

# function name 比 description 更重要

如果你的 function calling 有时灵，有时不灵，那就是 function name 的问题。

我有个自闭症搜索应用，用到 minimax 的 function calling，改了无数 description，达不到想要的效果。咨询了客服，原来是改变 function_name 有奇效！

例子：把`函数 name 从 “autism_expert” 修改为 “Autism_Problem_Search”` 能够更好地搜索到自闭症知识库。


