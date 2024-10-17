+++
title = "有多少种 embedding 模型？"
date = 2023-10-12
+++

答：我不知道。google 不知道。GPT 也不知道。

这是 GPT 搜索网络后，给我的答案。看得出它很努力，通过许多网站找到这些模型：

我的 prompt:
列出主流的embedding model，列出10个

GPT 回答：

```bash
Here is a list of 10 mainstream embedding models as of 2023, sourced from different references:

ST5-XXL, GTR-XXL, SGPT-5.8B-msmarco: These models are mentioned in the Massive Text Embedding Benchmark (MTEB) by Hugging Face as multi-billion parameter models dominating on MTEB, with SGPT-5.8B-msmarco specifically noted for producing 4096-dimensional embeddings​1​.

New Embedding Model by OpenAI: Mentioned by OpenAI as a more powerful tool for natural language processing and code tasks, achieving better or similar performance as the old Davinci models at a much lower price​2​.

GTE (General Text Embedding): A general-purpose text embedding model trained with multi-stage contrastive learning as per a submission on Arxiv​3​.

TF-IDF (Term Frequency-Inverse Document Frequency): A statistical measure used to evaluate the importance of a word in a document or corpus.

Word2Vec: A group of related models that are used to produce word embeddings.

GloVe (Global Vectors for Word Representation): An unsupervised learning algorithm for obtaining vector representations for words.

FastText: An open-source, free, lightweight library that allows users to learn text representations and text classifiers.

ELMO (Embeddings from Language Models): A novel way to represent words in vectors or embeddings.

CoVe (Context Vectors): Learns a representation of words by training on a large corpus of text.

BERT (Bidirectional Encoder Representations from Transformers) and RoBERTa (A Robustly Optimized BERT Pretraining Approach): Models that learn word representations bidirectionally, which is considered more powerful than unidirectional or independently learned word representations​4​.

These models represent a mix of traditional, evolving, and novel approaches to text embeddings, each with its own strengths and use cases across different NLP tasks and applications.
```

These models represent a mix of traditional, evolving, and novel approaches to text embeddings, each with its own strengths and use cases across different NLP tasks and applications.

# 自测三种模型

我自己用过三个模型openai、minimax、SentenceTransformers，测试的是中文结果搜索。总的来说，openai 的 ada 模型表现最好，几乎每次都能命中我想要的答案。minimax 效果次之，但也够用。SentenceTransformers （即SBERT）的效果最差。

SentenceTransformers是免费的，其他两个模型不是。

SentenceTransformers是768维的，openai和minimax是1536维的。

## 如何调用以上三种模型？

可以参考我之前的[文章](@/blog/embedding-models.md)。

# 同维度模型不能混用

需要注意的是，即使维度相同（比如openai和minimax都是1536维），embedding模型不能混用。比如你用openai的模型embedding，但是用minimax模型来query，效果往往不好。我猜想是每家embedding都是用不同的算法，以致搜索出来的向量位置是不一样的。

# langchain的名单

langchain 提供了一系列能用的[text_embedding模型](https://python.langchain.com/docs/integrations/text_embedding)，这应该算是比较完整的主流榜单了。

## 参考链接

[SentenceTransformers 官方文档](https://www.sbert.net/search.html?q=768&check_keywords=yes&area=default)
