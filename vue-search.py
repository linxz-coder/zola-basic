import meilisearch
import sys

# 确保这些值是正确的
MEILISEARCH_HOST = "http://localhost:7700"
MEILISEARCH_API_KEY = "VEw9h1k99fgUolpnU6htXtLp20eEFYqte0WRxsWfjaY"  # 替换为你的实际 API 密钥

client = meilisearch.Client(MEILISEARCH_HOST, MEILISEARCH_API_KEY)

try:
    # 首先，尝试获取服务器版本信息
    version = client.get_version()
    print(f"Meilisearch 服务器版本: {version}")

    # 然后，尝试获取所有索引
    indexes = client.get_indexes()
    print(f"indexes 的类型: {type(indexes)}")
    print(f"indexes 的内容: {indexes}")

    if isinstance(indexes, list):
        print(f"可用的索引: {[getattr(index, 'uid', str(index)) for index in indexes]}")
    elif isinstance(indexes, dict):
        print(f"可用的索引: {list(indexes.keys())}")
    else:
        print(f"indexes 的类型不符合预期，无法处理。")

    # 如果以上操作成功，尝试搜索
    index = client.index('docs')
    search_query = "vue"
    search_results = index.search(search_query)
    print(f"\n'{search_query}' 的搜索结果: {len(search_results['hits'])} 条")
    for hit in search_results['hits']:
        print(f"- 内容预览: {hit.get('content', '无内容')[:100]}...")
        print(f"  得分: {hit.get('_score', 'N/A')}")
        print("---")

except meilisearch.errors.MeilisearchApiError as e:
    print(f"Meilisearch API 错误: {e}")
    print(f"错误代码: {e.code}")
    print(f"错误链接: {e.link}")
except Exception as e:
    print(f"发生意外错误: {e}")
    import traceback
    traceback.print_exc()

# 打印 Meilisearch 客户端信息
print("\nMeilisearch Python 客户端信息:")
print(f"客户端版本: {getattr(meilisearch, '__version__', '未知')}")
print(f"客户端路径: {meilisearch.__file__}")