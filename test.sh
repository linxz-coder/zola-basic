# 家里电脑
docker run -t --rm \
  -e MEILISEARCH_HOST_URL="http://host.docker.internal:7700" \
  -e MEILISEARCH_API_KEY="VEw9h1k99fgUolpnU6htXtLp20eEFYqte0WRxsWfjaY" \
  -v /Users/linxiaozhong/Desktop/zola-basic/meili.json:/docs-scraper/config.json \
  --network host \
  getmeili/docs-scraper:latest pipenv run ./docs_scraper config.json


# 公司电脑
docker run -t --rm \
  -e MEILISEARCH_HOST_URL="http://host.docker.internal:7700" \
  -e MEILISEARCH_API_KEY="VEw9h1k99fgUolpnU6htXtLp20eEFYqte0WRxsWfjaY" \
  -v /Users/lxz/Desktop/zola-basic/meili.json:/docs-scraper/config.json \
  --network host \
  getmeili/docs-scraper:latest pipenv run ./docs_scraper config.json

# 扫描linxiaozhong.cn
docker run -t --rm \
  -e MEILISEARCH_HOST_URL="http://host.docker.internal:7700" \
  -e MEILISEARCH_API_KEY="VEw9h1k99fgUolpnU6htXtLp20eEFYqte0WRxsWfjaY" \
  -v /Users/lxz/Desktop/zola-basic/xzblog.json:/docs-scraper/config.json \
  getmeili/docs-scraper:latest pipenv run ./docs_scraper config.json


# 本地测试
curl \
  -X POST 'http://localhost:7700/indexes/docs/search' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer VEw9h1k99fgUolpnU6htXtLp20eEFYqte0WRxsWfjaY' \
  --data-binary '{ "q": "vue" }'

