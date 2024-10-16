+++
title = "nextjs 如何 make api call?"
date = 2023-09-15
+++

首先，如果你升级到 nextjs 13，即有src文件夹，而不是page文件夹，注意api文件的摆放。

src/app/api

可以在api下面放你想要的路径，比如search，那就是

src/app/api/search

但是后面必须跟route.ts/js。

完成的文档结构应该是这样的：

![nextjs-api1](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/nextjs-api1.png)

另外，必须明确指出使用的方法，比如GET:

```javascript
export async function GET(request) {
   return new Response('["apple", "banana", "orange"]');
}
```

可以参考[stackoverflow](https://stackoverflow.com/questions/76654901/next-js-api-router-throws-404)和[nextjs官网参考](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)。

另外，如果是flask的需求，那么不要把端口设置成5000，容易出现403错误，可以设置成8000，可以参考[stackoverflow帖子](https://stackoverflow.com/questions/72795799/how-to-solve-403-error-with-flask-in-python)。

一个简单的 nextjs 搜索应用，后端是 python。三个文件如下：

page.tsx:

```javascript
'use client'
import { useEffect, useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const res = await fetch(`/api/search?query=${query}`);
    const data = await res.json();
    setResults(data);
  };

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
}
```

route.js

```javascript
export async function GET(request) {
    // console.log("search.js runs");
    // console.log(request);
    // console.log(request.url);


    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query')
    console.log(query);
    const response = await fetch(`http://localhost:8000/search?query=${query}`);
    // console.log(response);
    const data = await response.json();
    console.log("data: ", data);
    return new Response(JSON.stringify(data));



    // return new Response('["apple", "banana", "orange"]');
  

    // return new Response(JSON.stringify(data));

};
```

app.py

```javascript
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins="*")

@app.route('/search', methods=['GET'])

def search():
    print("hello")
    query = request.args.get('query', '')
    print(query)
    # 这里只是模拟一个搜索，你可以添加更复杂的逻辑
    data = ["apple", "banana", "cherry", "date", "fig", "grape"]
    results = [fruit for fruit in data if query in fruit]
    return jsonify(results)

if __name__ == '__main__':
    app.run(port=8000, debug=True)
```

另外，如果你要看后端是否设置成功，可以跑一下 curl :

```bash
curl "http://localhost:8000/search?query=apple"
```

注意：这里必须用双引号，不然?号会被处理的别的信息，导致GET失败。
