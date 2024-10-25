+++
title = "如何连接supabase普通数据库？"
date = 2024-10-25
+++

以下的代码以jupyter notebook格式为例，文件是.ipynb格式。可以自己改造成.py格式的python文件。

注意：国内连接不畅，有时候需要多连几遍才会成功。

# 准备连接

```python
import os

# 设置环境变量
os.environ["SUPABASE_URL"] = "your-url"
os.environ["SUPABASE_KEY"] = "your-key"
```

```python
import os
from supabase import create_client, Client

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)
```

# show table

```python
response = supabase.table("chat_logs").select("*").execute()
response
```

# Insert data

```python
from datetime import datetime

# 示例数据
data = [
    {
        "chat_id": "chat123",
        "chat_title": "First Chat",
        "sequence": 1,
        "user_message": "Hello, how are you?",
        "ai_response": "I am fine, thank you!",
        "timestamp": datetime.now().isoformat()
    },
    {
        "chat_id": "chat124",
        "chat_title": "Second Chat",
        "sequence": 2,
        "user_message": "What's the weather like?",
        "ai_response": "It's sunny today.",
        "timestamp": datetime.now().isoformat()
    },
    {
        "chat_id": "chat125",
        "chat_title": "Third Chat",
        "sequence": 3,
        "user_message": "Tell me a joke.",
        "ai_response": "Why don't scientists trust atoms? Because they make up everything!",
        "timestamp": datetime.now().isoformat()
    }
]
```

```python
response = supabase.table("chat_logs").insert(data).execute()
print(response)
```





