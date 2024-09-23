import meilisearch

# 确保这些值是正确的
MEILISEARCH_HOST = "http://localhost:7700"
MEILISEARCH_API_KEY = "VEw9h1k99fgUolpnU6htXtLp20eEFYqte0WRxsWfjaY"

client = meilisearch.Client(MEILISEARCH_HOST, MEILISEARCH_API_KEY)

try:
    # 尝试一个简单的操作来测试连接
    health = client.health()
    print(f"Meilisearch is healthy: {health}")
    
    # 如果连接成功，尝试获取文档
    index = client.index('docs')
    documents_result = index.get_documents({'limit': 1000})
    
    # 打印文档结果的详细信息
    print(f"Total: {documents_result.total}")
    print(f"Limit: {documents_result.limit}")
    print(f"Offset: {documents_result.offset}")
    
    # 打印每个文档的信息
    for doc in documents_result.results:
        print(f"Document attributes: {dir(doc)}")
        print(f"ID: {doc.id if hasattr(doc, 'id') else 'No ID'}")
        print(f"Title: {doc.title if hasattr(doc, 'title') else 'No title'}")
        print(f"Content preview: {doc.content[:100] if hasattr(doc, 'content') and doc.content else 'No content'}...")
        print("---")

    # 尝试一个简单的搜索查询
    search_query = "vue"
    search_results = index.search(search_query)
    print(f"\nSearch results for '{search_query}': {len(search_results['hits'])} hits")
    for hit in search_results['hits']:
        print(f"- {hit.get('title', 'No title')} (ID: {hit.get('id', 'No ID')})")

    # 打印索引设置
    settings = index.get_settings()
    print("\nIndex settings:")
    print(f"Searchable attributes: {settings.get('searchableAttributes', 'Not set')}")
    print(f"Ranking rules: {settings.get('rankingRules', 'Not set')}")
    print(f"Stop words: {settings.get('stopWords', 'Not set')}")

except meilisearch.errors.MeilisearchApiError as e:
    print(f"Error connecting to Meilisearch: {e}")
    print(f"Error code: {e.code}")
    print(f"Error link: {e.link}")
except Exception as e:
    print(f"An unexpected error occurred: {e}")
    import traceback
    traceback.print_exc()