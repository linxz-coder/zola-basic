+++
title = "如何调用 embedding 模型？(openai、minimax、SentenceTransformer）"
date = 2023-09-15
+++

embedding 模型有哪些？

主要有 OpenAI、Minimax、SentenceTransformer 库的all-MiniLM-L6-v2模型。下面一一介绍：

# OpenAIEmbeddings

通过 langchain 调用：

```python
from langchain.embeddings.openai import OpenAIEmbeddings
embedding_function = OpenAIEmbeddings(openai_api_key="your-api-key")
````

# MinimaxEmbeddings

国产模型，收费。

通过 langchain 调用：

```python
import os

os.environ["MINIMAX_GROUP_ID"] = "your-groupid"
os.environ["MINIMAX_API_KEY"] = "your-api-key"

from langchain.embeddings import MiniMaxEmbeddings
embeddings = MiniMaxEmbeddings()
```

# SentenceTransformer ( all-MiniLM-L6-v2 )

Python 库，免费使用。

通过 langchain 调用：

```python
from langchain.embeddings.sentence_transformer import SentenceTransformerEmbeddings

embedding_function = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")
db = Chroma.from_documents(docs, embedding_function)
query = "血压高怎么办"
docs = db.similarity_search(query)
print(docs[0].page_content)
```

[SentenceTransformers 库介绍](https://cloud.tencent.com/developer/article/1955337)
