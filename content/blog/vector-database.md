+++
title = "向量数据库汇总"
date = 2023-08-25
+++

# 为什么有向量数据库？

1. 语言模型 LLM 有输入 token 的限制，导致对话上下文限制，因此我们要做到一个方法尽可能压缩上下文，向量是个好方式，因为它占内存小；
2. 目前 LLM 模型的调用需要收费，特别是 GPT-4，上下文数量一多，价格非普通人可以承受。

# 向量检索方式

1. 【知识库向量】
2. 【问题向量】
3. 【问题向量】匹配【知识库向量】
4. 匹配相应文本 -> 输出文本

其中，【知识库向量】就会存放在向量数据库中。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/vector-database1.png)

# 向量数据库

本文列举常见的向量数据库(vector store)，分为国外和国内的。

| 数据库名称     | 推荐度   | 特点                 | 可视化程度  | 收费                 | 易于修改程度 |
| -------------- | -------- | -------------------- | ----------- | -------------------- | ------------ |
| Supabase       | ⭐⭐⭐⭐⭐   | 可视化、低代码、易维护 | ⭐⭐⭐⭐⭐      | 免费：2个数据库；收费：$25/月 | ⭐⭐⭐⭐⭐        |
| Chroma         | ⭐⭐⭐     | 开源、本地             | ⭐⭐         | 免费                 | 不能修改      |
| Pinecone       | ⭐⭐⭐⭐⭐   | 仅云                   | ⭐⭐⭐⭐⭐      | 免费：1个index；收费：$70/月 | ⭐⭐⭐⭐⭐        |
| Milvus-Zilliz  | ⭐⭐⭐     | 本地+云                | ⭐⭐⭐⭐⭐      | 收费：$65/月          | 不能修改      |
| Qdrant         | ⭐⭐      | 本地+云                | ⭐⭐⭐        | 收费：$9/月           | 不能修改      |
| Weaviate       | ⭐⭐      | 界面复杂；本地+云      | ⭐          | 收费：$25/月          | 不能修改      |

国外部分：

## supabase

地址：https://supabase.com/

是否兼容langchain: 是

特点：可视化、低代码、易维护

文档：清晰易懂，带视频

截图：

![supabase](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/supabase1.jpg)

国内部分：

另外有各自的操作指南。（未完待续）

# 参考资料

[guangzhengli.com](https://guangzhengli.com/blog/zh/vector-database/)

特别推荐读一下这篇文章，非常专业和细致。

[榜单](https://benchmark.vectorview.ai/vectordbs.html)

我根据这份榜单选择的向量数据库

