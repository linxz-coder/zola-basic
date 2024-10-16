+++
title = "如何用 openai stream 做 Function calling？"
date = 2023-09-15
+++

前段时间介绍了[如何用 openai 做 Function calling](@/blog/openai-functon-calling.md)，有朋友就问，如果我需要采用流式输出(stream)，那要怎么办呢？

今天就介绍一下 stream + Function calling。

思路其实和 no stream 的时候一样，同样是“如果用户问正常的问题，不用通过知识库搜索答案；如果用户问自闭症相关问题，openai 主动通过知识库搜索后，结合 LLM 返回结果。”

区别主要是 stream 会回复数个 response ，包含数个delta结果，而正常的 response 只有一个，choices 的结果也只有一个。

no stream 结果：

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
```

stream 结果：

```bash
res: 
[1] {
[1]   "id": "chatcmpl-7yxY0oU9KIhBSe9Ju1CcXouszL2zd",
[1]   "object": "chat.completion.chunk",
[1]   "created": 1694762936,
[1]   "model": "gpt-3.5-turbo-0613",
[1]   "choices": [
[1]     {
[1]       "index": 0,
[1]       "delta": {
[1]         "role": "assistant",
[1]         "content": null,
[1]         "function_call": {
[1]           "name": "autism_expert",
[1]           "arguments": ""
[1]         }
[1]       },
[1]       "finish_reason": null
[1]     }
[1]   ]
[1] }
```

因此，我们的任务是在 stream 开始时便分流，如果 openai 判断不用过知识库（即没有function_call 参数），直接输出结果，并设置一个 flag，让它不用再走知识库。 如果判断需要走知识库，在 stream 结束后提取知识库的内容，根据知识库回答，调整 prompt，并再次唤起 LLM。

主要代码如下：

# 前端 Message.tsx

```javascript
"use client"
import React from 'react';
import { useState, useEffect } from 'react';

export default function Message({ai, user, content}: {ai: boolean, user: boolean, content: string}){
  
  
  const [resultText, setResultText] = useState('');  // 使用useState来保存结果

  useEffect(() => {

  if (ai && content) {
    const generate = async () => {
      try {
        // Fetch the response from the OpenAI API with the signal from AbortController
          const response = await fetch("http://localhost:5328/api/python", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ content: content }),
          });
          
          // 处理streaming response
          const reader = response.body.getReader();
          const decoder = new TextDecoder("utf-8");

          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              break;
            }
            // Massage and parse the chunk of data
            const chunk = decoder.decode(value);
            console.log("Original chunk:", chunk);
            setResultText(prevText => prevText + chunk);  // 使用setState更新状态
            // console.log("Result text:", resultText);
          }
        } catch (error) {
              console.error("Error occurred while generating:", error.message);
        }
      };
      generate();
    }

    }, [ai, content]);

    let messageContent = user ? content : (ai ? resultText : '有什么可以帮你的吗？');

    
    return (
        <div className={`flex ${user ? 'flex-row-reverse' : ''}`}>
          <img 
            src="robot_ai.png"
            className="w-10 h-10 rounded-full"  
          />
    
          <div className="flex flex-col ml-4">
            <div className="px-4 py-2 rounded-lg">
              <p>{messageContent}</p>
            </div>
    
            <div className="text-gray-500 text-sm mt-2 flex justify-between invisible group-hover:visible">
              <div>时间</div>
              <div className="flex">
                {/* <CopyButton /> */}
              </div>
            </div>
          </div>
        </div>
      )
}
```

# 后端 index.py

```python
# index.py
from flask import Flask, request, Response
import os, json, re
from dotenv import load_dotenv
from flask_cors import CORS
import openai

from supabase.client import create_client
from langchain.embeddings import MiniMaxEmbeddings
from langchain.vectorstores import SupabaseVectorStore

load_dotenv()  # 加载 .env 文件中的变量

app = Flask(__name__)
CORS(app, origins="*")
openai.api_key = os.getenv("OPENAI_API_KEY")  # 从环境变量中获取 API 密钥
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_PRIVATE_KEY = os.getenv("SUPABASE_PRIVATE_KEY")
MINIMAX_API_KEY = os.getenv("MINIMAX_API_KEY")
MINIMAX_GROUP_ID = os.getenv("MINIMAX_GROUP_ID")


supabase_client = create_client(SUPABASE_URL, SUPABASE_PRIVATE_KEY)
embeddings = MiniMaxEmbeddings(minimax_api_key=MINIMAX_API_KEY, minimax_group_id=MINIMAX_GROUP_ID)


@app.route("/api/python", methods=["POST"])
def generate():

    content = request.json.get('content')

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
        #print("expert_result: " + expert_result)
        
        return expert_result

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

        flag_executed = False

        for res in openai.ChatCompletion.create(
            model="gpt-3.5-turbo-0613",
            messages=messages,
            functions=functions,
            function_call="auto",  # auto is default, but we'll be explicit
            stream=True
        ):
            print("res: ")
            print(res)
            print("====================")
            delta = res.choices[0].delta
            # print("delta: ")
            # print(delta)
            # print("====================")

            if "function_call" not in delta and 'content' in delta:
                print("delta.content")
                print(delta.content)
                print("====================")
                if 'content' in delta:
                    yield delta.content
                    flag_executed = True
            
        if not flag_executed:
            function_name = "autism_expert"
            fuction_to_call = autism_expert
            function_response = fuction_to_call(
                question=content,
            )

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

            search_result = messages[2]['content'] 
            answer_match = re.search(r'answer: (.*)', search_result, re.DOTALL)
            if answer_match:
                answer = answer_match.group(1)
                print("answer: " + answer)
                print("====================")
            
            prompt = f"""
            根据用户的问题，参考背景信息，输出回答。要求回答简短切题，且尽可能有趣地回复。用户问题和参考背景信息会用{{}}来表示。
            用户问题：{content}, 参考背景信息：{answer}
            """
            
            for chunk in openai.ChatCompletion.create(
                model='gpt-3.5-turbo',
                messages=[
                    {'role': 'user', 'content': prompt}
                ],
                temperature=0,
                stream=True  # this time, we set stream=True
            ):
                # 有的chunk没有content
                if 'content' in chunk.choices[0].delta:
                    print(chunk.choices[0].delta.content)
                    yield chunk.choices[0].delta.content
                   
    return Response(run_conversation(), mimetype='text/event-stream')

if __name__ == '__main__':
    app.run(port=5328,debug=True)
```


