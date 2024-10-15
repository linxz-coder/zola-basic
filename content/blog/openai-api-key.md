+++
title = "如何在 openai 的应用填入 api key？"
date = 2023-09-06
+++

# Python 篇

有三种方法：直接填、环境变量设置、.env文件设置

## 直接填

优点是简单直接，不过若是设置在应用中，会有暴露的风险。另外一个缺点是假设多次调用 api，需要填写多遍。

官方例子：

```Python
import openai
openai.api_key = "your-api-key"

openai.Completion.create(
  model="text-davinci-003",
  prompt="Say this is a test",
  max_tokens=7,
  temperature=0
)
```

langchain 例子：

```python
from langchain.embeddings.openai import OpenAIEmbeddings
embedding_function = OpenAIEmbeddings(openai_api_key="your-api-key")
```

## 环境变量设置

如果你用 jupyter notebook 调试代码，推荐使用这种方式，因为便捷。同样，在应用环境中，会有泄露 api 的风险。例子：

```python
import os
os.environ["OPENAI_API_KEY"] = "your-api-key" # 放入python 的环境变量
```

注意：如果你需要使用import openai，请确保它在这段代码的后面，否则它不会读取到该环境变量。

```python
!echo $OPENAI_API_KEY # 在 jupyter notebook 里面可以用此命令看看是否设置成功
```

```python
# import openai here if nedded
embedding_function = OpenAIEmbeddings()
```

## .env 文件设置

方法是在同一文件夹内新建 .env 文件，输入 OPENAI_API_KEY = “your-api-key”。

如果你是在应用环境中，推荐你使用这种方式，能够保证 api-key 不泄露。

另外，如果你是需要上传代码到 github 去，需要在.gitignore 文件里面去掉.env 文件

调用代码如下：

```python
import os
import openai

from dotenv import load_dotenv, find_dotenv
_ = load_dotenv(find_dotenv()) # read local .env file；
print(_)

openai.api_key = os.getenv("OPENAI_API_KEY")
print(openai.api_key)

embedding_function = OpenAIEmbeddings()

# _ 代表之后不会再使用到的变量名，你可以用任何自己喜欢的变量名
# 如果能够找到.env且文件不为空, _的值应为True，可以检验是否读取成功
```

## 其他说明

我经常看到有些教程会让你把 api-key 放到系统的环境变量（mac电脑的话，就是放在用户文档中的.bashrc或者.zshrc文件夹中，通常是隐藏文件夹），代码是：

```python
!export OPENAI_API_KEY=xxx #注意等号左右不能有空格
```

我非常不推荐。

首先，我们的 api-key 因为可能泄露或者分配用途不同原因，经常会变，这样做 api-key 的更改很麻烦。其次，这个命令在 jupyter 设置后，因为不是全局系统变量，所以只能在 bash 或者 shell 环境下生效，在 python 环境并不生效，等于设置了个寂寞。

## Azure openai 调用

azure 调用方式和 openai 不同，复杂一点：

```python
embeddings = OpenAIEmbeddings(deployment='text-embedding-ada-002', # your deployment name
                            openai_api_base='https://xxx.openai.azure.com', # your resource name
                            openai_api_type='azure',
                            openai_api_key='your-api-key',
                            chunk_size=1)
```

chunk_size = 1 是必要的，否则会报错。

```python
from langchain.llms import AzureOpenAI
from langchain.chains import RetrievalQA
from langchain import PromptTemplate

#一般的chain_type是stuff

qa = RetrievalQA.from_chain_type(
    llm=AzureOpenAI(
        deployment_name="your-deployment-name", 
        openai_api_version='2023-05-15',
        openai_api_key="your-api-key",
        temperature=0,
        best_of=1,
        n=1,
        streaming=True), 
    chain_type="map_rerank", 
    retriever=retriever,
    verbose=False,
)
```

# Javascript 篇

未来会新增 js 的设置教程，未完待续。
