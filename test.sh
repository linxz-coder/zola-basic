docker run -t --rm \
  -e MEILISEARCH_HOST_URL="http://host.docker.internal:7700" \
  -e MEILISEARCH_API_KEY="VEw9h1k99fgUolpnU6htXtLp20eEFYqte0WRxsWfjaY" \
  -v /Users/linxiaozhong/Desktop/zola-basic/meili.json:/docs-scraper/config.json \
  --network host \
  getmeili/docs-scraper:latest pipenv run ./docs_scraper config.json