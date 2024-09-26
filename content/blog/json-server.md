+++
title = "如何快速搭建测试服务器-json-server"
date = 2024-09-27
+++

# 安装json-server
```bash
npm install json-server
```

# 创建json文件叫`db.json`
```json
{
  "posts": [
    { "id": 1, "title": "json-server", "author
```json
{
  "posts": [
    { "id": "1", "title": "a title", "views": 100 },
    { "id": "2", "title": "another title", "views": 200 }
  ],
  "comments": [
    { "id": "1", "text": "a comment about post 1", "postId": "1" },
    { "id": "2", "text": "another comment about post 1", "postId": "1" }
  ],
  "profile": {
    "name": "typicode"
  }
}
```

# 启动json-server
```bash
npx json-server db.json
```

此时如果出现以下文字：
```bash
JSON Server started on PORT :3000
Press CTRL-C to stop
Watching db.json...

♡⸜(˶˃ ᵕ ˂˶)⸝♡

Index:
http://localhost:3000/

Static files:
Serving ./public directory if it exists

Endpoints:
http://localhost:3000/posts
http://localhost:3000/comments
http://localhost:3000/profile
```

这样就证明成功了。

直接访问`http://localhost:3000/posts`，就可以看到json文件的内容了，

如果想看到第一篇文章的内容，访问`http://localhost:3000/posts/1`。

`post`命令可以新增文章，其他命令和RESTful API一样。

# 参考
[json-server的github官网](https://github.com/typicode/json-server)