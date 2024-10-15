+++
title = "如何用 openai 做 Function calling"
date = 2023-09-11
+++

这是一个例子：用 openai 做 agent，自己判断是否进行自闭症知识库搜索。

具体来说，如果用户问正常的问题，不用通过知识库搜索答案；如果用户问自闭症相关问题，openai 主动通过知识库搜索后，结合 LLM 返回结果。

# import 依赖项

```python
import os
os.environ["OPENAI_API_KEY"] = "your-api-key" # 放入 python 的环境变量

import openai
```

# 定义 retrieval function

这里使用 supabase 作为知识库，minimax 作为 embedding 模型（便宜些）。

```python
SUPABASE_PRIVATE_KEY = "your-key"
SUPABASE_URL = "your-url"
MINIMAX_GROUP_ID="your-id"
MINIMAX_API_KEY="your-key"
```

```python
from supabase.client import create_client
from langchain.embeddings import MiniMaxEmbeddings
from langchain.vectorstores import SupabaseVectorStore

supabase_client = create_client(SUPABASE_URL, SUPABASE_PRIVATE_KEY)
embeddings = MiniMaxEmbeddings(minimax_api_key=MINIMAX_API_KEY, minimax_group_id=MINIMAX_GROUP_ID)

# function
def autism_expert(question):
    """当用户问自闭症问题时，搜索专业答案"""
    vector_store = SupabaseVectorStore(
        client=supabase_client,
        embedding=embeddings,
        table_name="documents",
        query_name="match_documents",
    )
    match_documents = vector_store.similarity_search(question)
    expert_result = match_documents[0].page_content
    
    return expert_result
```

# 问自闭症问题

```python
import re
content = "自闭症孩子自伤怎么办?"

def run_conversation():
    # Step 1: send the conversation and available functions to GPT
    messages = [{"role": "system", "content": "你是自闭症康复专家"},{"role": "user", "content": content}]
    functions = [
        {
            "name": "autism_expert",
            "description": "当用户咨询自闭症类问题有用",
            "parameters": {
                "type": "object",
                "properties": {
                    "question": {
                        "type": "string",
                        "description": "用户的问题",
                    },
                },
                "required": ["question"],
            },
        }
    ]
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo-0613",
        messages=messages,
        functions=functions,
        function_call="auto",  # auto is default, but we'll be explicit
    )
    response_message = response["choices"][0]["message"]
    print("response_message: ")
    print(response_message)
    print("====================")

    # Step 2: check if GPT wanted to call a function
    if response_message.get("function_call"):
        # Step 3: call the function
        # Note: the JSON response may not always be valid; be sure to handle errors
        available_functions = {
            "autism_expert": autism_expert,
        }  # only one function in this example, but you can have multiple
        function_name = response_message["function_call"]["name"]
        fuction_to_call = available_functions[function_name]
        function_args = json.loads(response_message["function_call"]["arguments"])
        function_response = fuction_to_call(
            question=function_args.get("question"),
        )

        # Step 4: send the info on the function call and function response to GPT
        messages.append(response_message)  # extend conversation with assistant's reply
        messages.append(
            {
                "role": "function",
                "name": function_name,
                "content": function_response,
            }
        )  # extend conversation with function response
        print("function_message: ")
        print(messages)
        print("====================")
        
        search_result = messages[3]['content'] #加了system就是3，否则就是2
        answer_match = re.search(r'answer: (.*)', search_result, re.DOTALL)
        if answer_match:
            answer = answer_match.group(1)
            print("answer: " + answer)
            print("====================")
            
            prompt = f"""
                    根据用户的问题，参考背景信息，输出回答。要求回答简短切题，且尽可能有趣地回复。用户问题和参考背景信息会用{{}}来表示。
                    用户问题：{content}, 参考背景信息：{answer}
                    """
        
            second_response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}],
                temperature=0
            )  # get a new response from GPT where it can see the function response
            return second_response['choices'][0]['message']['content']
    else:
        return response_message['content']
print(run_conversation())
```

返回结果示例：

```bash
response_message: 
{
  "role": "assistant",
  "content": null,
  "function_call": {
    "name": "autism_expert",
    "arguments": "{\n  \"question\": \"自闭症孩子自伤怎么办?"\n}"
  }
}
====================
function_message: 
[{'role': 'system', 'content': '你是自闭症康复专家'}, {'role': 'user', 'content': '自闭症孩子自伤怎么办?'}, <OpenAIObject at 0x10caf2750> JSON: {
  "role": "assistant",
  "content": null,
  "function_call": {
    "name": "autism_expert",
    "arguments": "{\n  \"question\": \"自闭症孩子自伤怎么办?"\n}"
  }
}, {'role': 'function', 'name': 'autism_expert', 'content': 'question: 自闭症孩子自伤怎么办？\nanswer: 自闭症孩子自伤可能是因为他们感到沮丧、无助、焦虑或者无法表达自己的情感。作为家长或者监护人，我们需要尽快采取行动，帮助孩子缓解情绪。以下是一些可能有用的方法：\n\n1. 寻求专业帮助：带孩子去看专业医生或者心理医生，他们可以给予专业的建议和治疗。\n\n2. 找到合适的方式表达情感：有时候，孩子自伤可能是因为他们无法有效地表达自己的情感。帮助孩子找到适合他们的方式来表达情感，比如画画、写日记等。\n\n3. 建立安全的环境：孩子自伤的情况可能会在一些安全的环境下发生，因此我们需要确保孩子的周围环境是安全的。\n\n4. 培养积极的情感：鼓励孩子做一些积极的事情，比如参加运动、社交活动等，帮助他们建立积极的情感。\n\n5. 提供支持和理解：让孩子知道你在他们身边，支持他们，理解他们的感受。同时，也要教育他们正确的行为方式和应对策略。'}]
====================
answer: 自闭症孩子自伤可能是因为他们感到沮丧、无助、焦虑或者无法表达自己的情感。作为家长或者监护人，我们需要尽快采取行动，帮助孩子缓解情绪。以下是一些可能有用的方法：

1. 寻求专业帮助：带孩子去看专业医生或者心理医生，他们可以给予专业的建议和治疗。

2. 找到合适的方式表达情感：有时候，孩子自伤可能是因为他们无法有效地表达自己的情感。帮助孩子找到适合他们的方式来表达情感，比如画画、写日记等。

3. 建立安全的环境：孩子自伤的情况可能会在一些安全的环境下发生，因此我们需要确保孩子的周围环境是安全的。

4. 培养积极的情感：鼓励孩子做一些积极的事情，比如参加运动、社交活动等，帮助他们建立积极的情感。

5. 提供支持和理解：让孩子知道你在他们身边，支持他们，理解他们的感受。同时，也要教育他们正确的行为方式和应对策略。
====================
对于自闭症孩子自伤的问题，我们可以采取以下方法来帮助他们：

1. 寻求专业帮助，让专业医生或心理医生给予专业建议和治疗，他们会是你的得力助手。

2. 帮助孩子找到适合他们的方式来表达情感，比如画画、写日记，让他们用自己的方式来宣泄情绪。

3. 确保孩子的周围环境是安全的，这样可以减少自伤的可能性。

4. 鼓励孩子参加一些积极的活动，比如运动、社交活动，帮助他们建立积极的情感。

5. 让孩子知道你在他们身边，支持他们，理解他们的感受。同时，教育他们正确的行为方式和应对策略。

希望这些方法能对你有所帮助，祝愿你和孩子都能度过困难时期。
```

# 问正常问题

```python
import re
content = "你是谁?"

def run_conversation():
    # Step 1: send the conversation and available functions to GPT
    messages = [{"role": "system", "content": "你是自闭症康复专家"},{"role": "user", "content": content}]
    functions = [
        {
            "name": "autism_expert",
            "description": "当用户咨询自闭症类问题有用",
            "parameters": {
                "type": "object",
                "properties": {
                    "question": {
                        "type": "string",
                        "description": "用户的问题",
                    },
                },
                "required": ["question"],
            },
        }
    ]
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo-0613",
        messages=messages,
        functions=functions,
        function_call="auto",  # auto is default, but we'll be explicit
    )
    response_message = response["choices"][0]["message"]
    print("response_message: ")
    print(response_message)
    print("====================")

    # Step 2: check if GPT wanted to call a function
    if response_message.get("function_call"):
        # Step 3: call the function
        # Note: the JSON response may not always be valid; be sure to handle errors
        available_functions = {
            "autism_expert": autism_expert,
        }  # only one function in this example, but you can have multiple
        function_name = response_message["function_call"]["name"]
        fuction_to_call = available_functions[function_name]
        function_args = json.loads(response_message["function_call"]["arguments"])
        function_response = fuction_to_call(
            question=function_args.get("question"),
        )

        # Step 4: send the info on the function call and function response to GPT
        messages.append(response_message)  # extend conversation with assistant's reply
        messages.append(
            {
                "role": "function",
                "name": function_name,
                "content": function_response,
            }
        )  # extend conversation with function response
        print("function_message: ")
        print(messages)
        print("====================")
        
        search_result = messages[3]['content'] #加了system就是3，否则就是2
        answer_match = re.search(r'answer: (.*)', search_result, re.DOTALL)
        if answer_match:
            answer = answer_match.group(1)
            print("answer: " + answer)
            print("====================")
            
            prompt = f"""
                    根据用户的问题，参考背景信息，输出回答。要求回答简短切题，且尽可能有趣地回复。用户问题和参考背景信息会用{{}}来表示。
                    用户问题：{content}, 参考背景信息：{answer}
                    """
        
            second_response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}],
                temperature=0
            )  # get a new response from GPT where it can see the function response
            return second_response['choices'][0]['message']['content']
    else:
        return response_message['content']
print(run_conversation())
```

返回结果示例：

```bash
response_message: 
{
  "role": "assistant",
  "content": "我是自闭症康复专家。可以为您提供康复方面的建议和帮助。如果您有任何问题或需要咨询，都可以随时向我提问。"
}
====================
我是自闭症康复专家。可以为您提供康复方面的建议和帮助。如果您有任何问题或需要咨询，都可以随时向我提问。
```

## 参考资料
[openai Function calling 官网](https://platform.openai.com/docs/guides/gpt/function-calling)

