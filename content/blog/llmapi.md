+++
title = "如何调用大模型LLM的api？"
date = 2024-10-11
+++

# 国产
<u>简要说明</u>:

我选择的大多是兼容OpenAI的API，为了跨区域跨平台的使用方便。官方还有其他的调用方式，我就不一一罗列了。

## deepseek 深度求索
```python
# python3
# Please install OpenAI SDK first：`pip3 install openai`
from openai import OpenAI

client = OpenAI(api_key="your-api-key", base_url="https://api.deepseek.com")

response = client.chat.completions.create(
    model="deepseek-chat",
    messages=[
        {"role": "system", "content": "You are a helpful assistant"},
        {"role": "user", "content": "你是什么模型？你属于哪个公司开发的？"},
    ],
    stream=False
)

print(response.choices[0].message.content)
```

[deepseek文档](https://platform.deepseek.com/api-docs/zh-cn/)

## siliconflow 硅基流动
```python
from openai import OpenAI

client = OpenAI(api_key="your-api-key", base_url="https://api.siliconflow.cn/v1")

response = client.chat.completions.create(
    model='alibaba/Qwen1.5-7B-Chat',
    messages=[
        {'role': 'user', 'content': "写一个hello world的js代码"}
    ],
    stream=True,
)

for chunk in response:
    print(chunk.choices[0].delta.content, end='')

print(response.choices[0].message.content)
```

## chatGLM 智谱
### 兼容OpenAI的调用
```python
from openai import OpenAI 

client = OpenAI(
    api_key="your-api-key",
    base_url="https://open.bigmodel.cn/api/paas/v4/"
) 

completion = client.chat.completions.create(
    model="glm-4",  
    messages=[    
        {"role": "system", "content": "你是一个很有帮助的AI助手"},    
        {"role": "user", "content": "你是谁？"} 
    ],
    top_p=0.7,
    temperature=0.9
 ) 

print(completion.choices[0].message.content)
```


### 同步调用

```python
#pip install --upgrade zhipuai
from zhipuai import ZhipuAI
client = ZhipuAI(api_key="your-api-key") # 填写您自己的APIKey
response = client.chat.completions.create(
    model="glm-4",  # 填写需要调用的模型名称
    messages=[
        {"role": "user", "content": "作为一名营销专家，请为我的产品创作一个吸引人的slogan"},
        {"role": "assistant", "content": "当然，为了创作一个吸引人的slogan，请告诉我一些关于您产品的信息"},
        {"role": "user", "content": "智谱AI开放平台"},
        {"role": "assistant", "content": "智启未来，谱绘无限一智谱AI，让创新触手可及!"},
        {"role": "user", "content": "创造一个更精准、吸引人的slogan"}
    ],
)
print(response.choices[0].message)
```

### 异步调用

```python
from zhipuai import ZhipuAI

client = ZhipuAI(api_key="your-api-key") # 请填写您自己的APIKey
response = client.chat.asyncCompletions.create(
    model="glm-4",  # 填写需要调用的模型名称
    messages=[
        {
            "role": "user",
            "content": "请你作为童话故事大王，写一篇短篇童话故事，故事的主题是要永远保持一颗善良的心，要能够激发儿童的学习兴趣和想象力，同时也能够帮助儿童更好地理解和接受故事中所蕴含的道理和价值观。"
        }
    ],
)
print(response)
```

### SSE调用（流式输出）
```python
from zhipuai import ZhipuAI
client = ZhipuAI(api_key="your-api-key") # 请填写您自己的APIKey
response = client.chat.completions.create(
  model="glm-4",  # 填写需要调用的模型名称
    messages=[
        {"role": "user", "content": "你好！你叫什么名字"},
    ],
    stream=True,
    )
for chunk in response:
    print(chunk.choices[0].delta)
```

[智谱文档](https://open.bigmodel.cn/dev/api#sdk_example)

## 月之暗面 monnshot
```python
from openai import OpenAI
 
client = OpenAI(
    api_key = "your-api-key",
    base_url = "https://api.moonshot.cn/v1",
)
 
completion = client.chat.completions.create(
    model = "moonshot-v1-8k",
    messages = [
        {"role": "system", "content": "你是 Kimi，由 Moonshot AI 提供的人工智能助手，你更擅长中文和英文的对话。你会为用户提供安全，有帮助，准确的回答。同时，你会拒绝一切涉及恐怖主义，种族歧视，黄色暴力等问题的回答。Moonshot AI 为专有名词，不可翻译成其他语言。"},
        {"role": "user", "content": "你好，我叫李雷，1+1等于多少？"}
    ],
    temperature = 0.3,
)
 
print(completion.choices[0].message.content)
```

[月之暗面文档](https://platform.moonshot.cn/docs/api/chat#%E5%85%AC%E5%BC%80%E7%9A%84%E6%9C%8D%E5%8A%A1%E5%9C%B0%E5%9D%80)

## 阿里通义千问 qwen
```python
# 如果下述命令报错，请将pip替换为pip3
#!pip install -U openai
import os
os.environ["DASHSCOPE_API_KEY"]= 'your-api-key'
from openai import OpenAI
import os
import json
client = OpenAI(
    api_key=os.getenv("DASHSCOPE_API_KEY"), # 如果您没有配置环境变量，请在此处用您的API Key进行替换
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1",  # 填写DashScope SDK的base_url
)
completion = client.chat.completions.create(
    model="qwen-plus",
    messages=[{'role': 'system', 'content': 'You are a helpful assistant.'},
              {'role': 'user', 'content': '现在的人可以有多少个老婆？'}]
    )
#print(completion.model_dump_json())

data=json.loads(completion.model_dump_json())
# Extract the content
content = data['choices'][0]['message']['content']
print(content)
```

## minimax
```python
import requests

group_id="your-group-id"
api_key="your-api-key"

url = "https://api.minimax.chat/v1/text/chatcompletion_pro?GroupId=" + group_id
headers = {"Content-Type":"application/json", "Authorization":"Bearer " + api_key}

payload = {
    "bot_setting":[
        {
            "bot_name":"MM智能助理",
            "content":"MM智能助理是一款由MiniMax自研的，没有调用其他产品的接口的大型语言模型。MiniMax是一家中国科技公司，一直致力于进行大模型相关的研究。",
        }
    ],
    "messages":[{"sender_type":"USER", "sender_name":"小明", "text":"帮我用英文翻译下面这句话：我是谁"}],
    "reply_constraints":{"sender_type":"BOT", "sender_name":"MM智能助理"},
    "model":"abab6.5s-chat",
    "tokens_to_generate":2048,
    "temperature":0.01,
    "top_p":0.95,
}

response = requests.request("POST", url, headers=headers, json=payload)

print(response.status_code)
print(response.text)

import json
# 将JSON字符串转换为Python字典
data = json.loads(response.text)
string = data['choices'][0]['messages'][0]['text']
print(string)
```

[minimax文档](https://platform.minimaxi.com/document/ChatCompletion%20Pro?key=66718f6ba427f0c8a57015ff)

## 百川
```python
from openai import OpenAI

client = OpenAI(
    api_key="your-api-key",
    base_url="https://api.baichuan-ai.com/v1/",
)

completion = client.chat.completions.create(
    model="Baichuan2-Turbo",
    messages=[
        {"role": "user", "content": "西游记里有多少妖怪？"}
    ],
    temperature=0.3,
    stream=False,
)

#for chunk in completion:
#    print(chunk.choices[0].delta)

print(completion.choices[0].message.content)
```

[百川文档](https://platform.baichuan-ai.com/docs/api#python-client)