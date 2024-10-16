+++
title = "如何使用 LangSmith"
date = 2023-09-20
+++

LangSmith 是一个 LangChain 工具，方便查看 LangChain 各模块运行的状态。以下是使用方法：

# 安装包

在控制台输入或jupyter notebook输入（ notebook 前面需要加!号）

```bash
pip install -U langchain
```

# 设置环境变量

其中，project 的名称是你的 LangSmith 官网自己设置的名称。

```python
import os

os.environ["LANGCHAIN_TRACING_V2"] = "true"
os.environ["LANGCHAIN_ENDPOINT"] = "https://api.smith.langchain.com"
os.environ["LANGCHAIN_API_KEY"] = "your-langchain-key"
os.environ["LANGCHAIN_PROJECT"] = "memory_test"
os.environ["OPENAI_API_KEY"] = "your-openai-key"
```

# 试运行

```python
from langchain.chat_models import ChatOpenAI

llm = ChatOpenAI()
llm.predict("谁是最漂亮的人")
```

# 运行结果

项目页：

![langsmith1](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/langsmith1.png)

详情页：

![langsmith2](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/langsmith2.png)

