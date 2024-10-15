+++
title = "如何连接OpenAI的api？做自己的ChatGPT!"
date = 2023-05-18
+++

# 1. 申请OpenAI的api_key

前提是你已拥有ChatGPT的账号，api_key的[申请地址](https://platform.openai.com/account/api-keys)。

# 2. 安装OpenAI的python包

在命令行中输入：

```bash
pip install openai
```

# 3. 连接OpenAI的api

连接api key的方法有两种.

方法一：

```python
import os
os.environ["OPENAI_API_KEY"] = "替换成你的api_key"
```

方法二：

```python
import openai
openai.api_key = "替换成你的api_key"
```

以上两种选其一即可。

# 4. 完成prompt

```python
response = openai.ChatCompletion.create(

    model='gpt-3.5-turbo',

    messages=[

        {'role': 'user', 'content': '小学生春游去植物园，写篇300字的文章。'}

    ],

    temperature=0,

)

print(response.choices[0].message["content"])
```

content内的内容替换成你的prompt，即可完成。

注意：

1. 这里的model是gpt-3.5-turbo，即免费版本，如果你是plus，可以选gpt-4。
2. 这里的role是user，即用户，这是最简单的prompt方式，另外可选的还有system 和 assistant。其他的role会放到下一篇文章中介绍。

# 更新

以上内容因为旧编辑器格式原因，还没来得及修改，可以直接看下面的：

## chat model 和 instruct model

chat model 是用来优化聊天的，因此更加啰嗦；

instruct model 是用来命令的，因此比较简洁。

关于 instruct model，你可以想象，让大模型做一个函数。对任意输入，做有限输出。

两种 model 有不同 call 的方式：

### chat model

```python
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": "你好"}],
        temperature=0,
    )

    return response.choices[0].message['content']
```

### instruct model

```python
    response = openai.Completion.create(
        model="gpt-3.5-turbo-instruct",
        prompt="你好",
        temperature=0,
    )

    return response.choices[0].text
```

## 参考资料
openai的[completion教程](https://platform.openai.com/docs/api-reference/completions/create?lang=python)
