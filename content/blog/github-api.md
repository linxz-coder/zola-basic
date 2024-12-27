+++
title = "Github API的连接方式"
date = 2024-12-27
+++

github api地址：

https://api.github.com/repos/linxz-coder/zola-basic/contents/content/blog/ES6.md

GET方法

需要连接token:

curl -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <YOUR-TOKEN>" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/OWNER/REPO/contents/PATH

[github-api官方参考](https://docs.github.com/en/rest/repos/contents?apiVersion=2022-11-28#get-repository-content)

