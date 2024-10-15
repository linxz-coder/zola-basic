+++
title = "如何调用 Chroma?"
date = 2023-09-05
+++

本文介绍如何调用流行的向量数据库 Chroma 的两种方式，分别是 Chroma in langchain 和 Chroma official。

# Chroma in langchain

## embedding 存储向量

以 csv 文档 为例：

### 1.读取文档

```python
from langchain.document_loaders import CSVLoader  #读取csv文档
loader = CSVLoader('./your_path/example.csv')
documents = loader.load()
```

### 2.处理文档

```python
from langchain.text_splitter import CharacterTextSplitter
# split it into chunks
text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
docs = text_splitter.split_documents(documents)
```

### 3.向量化

```python
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Chroma

embedding_function = OpenAIEmbeddings(openai_api_key="your-api-key")

db = Chroma.from_documents(docs, embedding_function, persist_directory="./your-local-directory")
db.persist() #save locally

db.get() #check status
```

## retrieval 读取数据库

读取本地已保存的数据库文件：

```python
embedding_function = OpenAIEmbeddings(openai_api_key="your-api-key")
db = Chroma(embedding_function=embedding_function, persist_directory="./your-local-directory")
```

注意，可不输入 embedding_function，但 langchain 默认调用的 embedding_function 是 SentenceTransformerEmbeddings，向量的维数与 openai 维数不一致，若用 OpenAIEmbeddings 会导致出错。

## 执行相似度查询

```python
query = "感到头晕怎么办？"
docs = db.similarity_search(query)
print(docs[0].page_content) # 返回查询结果
```

注意，以上我在 openai 的 function 直接写入了 api-key，其实这对于上传代码或者生产环境都不大安全。放 api-key 还有更好的办法，可参考我的文章：《如何在 openai 的应用填入 api key？》

# Chroma official

## embedding 存储向量

### 1.create chromadb

```python
import chromadb
from chromadb.config import Settings

chroma_client = chromadb.Client()

client = chromadb.Client(
     Settings(
         persist_directory="your-directory", # Directory to store persisted Chroma data. 
         chroma_db_impl="duckdb+parquet",
     )
)
```

### 2.create collection

```python
embedding_function = OpenAIEmbeddings(openai_api_key="your-api-key")
question_collection = chroma_client.create_collection(name='question', embedding_function=embedding_function)
```

### 3.get embedding

假设你的数据结构是 csv 格式，有 ‘id’、’question’ 、 ‘answer’ 列。

```python
import pandas as pd
from openai.embeddings_utils import get_embedding

df = pd.read_csv('your-directory/example.csv')
df['ada_v2'] = df["question"].apply(lambda x : get_embedding(x, engine = 'text-embedding-ada-002')) # get embedding from 'question', and store in 'ada_v2'

df.to_csv("new_example.csv") # new document including 'ada_v2'
```

### 4.add embedding to collection

需要把 csv 文档 embedding 列的string格式改成list，把 id 列的格式改成string

```python
from ast import literal_eval

# Read vectors from strings back into a list
df['ada_v2'] =df.ada_v2.apply(literal_eval)

# Set vector_id to be a string
df['id'] = df['id'].apply(str)
```

```python
question_collection.add(
    ids=df.id.tolist(),
    embeddings=df.ada_v2.tolist(),
)
```

### 5.check collection

```python
question_collection # return Collection(name=question)
question_collection.get() # check the number of ids
question_collection.peek() # check everything
```

## retrieval 读取数据库

```python
def query_collection(collection, query, max_results, dataframe):
    results = collection.query(query_texts=query, n_results=max_results, include=['distances']) 
    df = pd.DataFrame({
                'id':results['ids'][0], 
                'score':results['distances'][0],
                'question': dataframe[dataframe.id.isin(results['ids'][0])]['question'],
                })
    
    return df
```

```python
query = "经常感觉心慌气短，尤其在走路时上述症状加重，是气胸的后遗症吗？"

question_query_result = query_collection(
    collection=question_collection,
    query=query,
    max_results=10,
    dataframe=df,
)

question_query_result
```

搜索结果示例如下，分数越低，代表向量距离越近，也就是越接近的结果。

![chroma](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/chroma1.png)

## 参考资料
1. [langchain.vectorstores.chroma 介绍](https://api.python.langchain.com/en/latest/vectorstores/langchain.vectorstores.chroma.Chroma.html?highlight=chroma#langchain.vectorstores.chroma.Chroma)

2. [chroma 官网](https://docs.trychroma.com/getting-started?lang=py)



