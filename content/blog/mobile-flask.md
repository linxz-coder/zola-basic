+++
title = "手机如何连接 flask 后端？"
date = 2023-09-22
+++

以下文章针对的是 nextjs 程序。

需要修改两个文件，一个是package.json，一个是 fetch api 的前端文件，我的是component，名字是Message.tsx。

# package.json

核心是 “flask-dev” 项目，需要加上”-h 0.0.0.0″，意思是监听所有端口，所以运行后会发现 flask 运行在两个端口上，一个是本地 127.0.0.1，一个是局域网IP 192.168.1.x。

后端信息显示如下：

![mobile-flask1](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/mobile-flask1.png)

全部代码如下：

```javascript
{
  "name": "purple",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "flask-dev": "FLASK_DEBUG=1 pip install -r requirements.txt && python -m flask --app api/index run -h 0.0.0.0 -p 5328",
    "next-dev": "next dev",
    "dev": "concurrently \"npm run next-dev\" \"npm run flask-dev\"",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@types/node": "20.4.7",
    "@types/react": "18.2.18",
    "@types/react-dom": "18.2.7",
    "autoprefixer": "10.4.14",
    "concurrently": "^8.2.1",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "eslint": "8.46.0",
    "eslint-config-next": "13.4.12",
    "next": "13.4.12",
    "openai": "^3.3.0",
    "postcss": "8.4.27",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-markdown": "^8.0.7",
    "react-syntax-highlighter": "^15.5.0",
    "rehype-raw": "^7.0.0",
    "remark-gfm": "^3.0.1",
    "tailwindcss": "3.3.3",
    "typescript": "5.1.6",
    "uuid": "^9.0.0",
    "zhipuai": "^0.1.0"
  },
  "devDependencies": {
    "@types/uuid": "^9.0.4"
  }
}
```

# Message.tsx

这是前端文件，需要把 127.0.0.1 改成局域网IP 192.168.1.x，代码如下：

```javascript
  useEffect(() => {

  if (ai && content && !isHistory) {
    const generate = async () => {
      try {
        //将chatHistory转为string
        const chatHistoryStr = JSON.stringify(chatHistory); 

        // Fetch the response from the OpenAI API with the signal from AbortController
          const response = await fetch("http://192.168.1.18:5328/api/python", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ content: content, chatHistory: chatHistoryStr }),
          });

         // 处理streaming response
         const reader = response.body.getReader();
         const decoder = new TextDecoder("utf-8");
         let accumulatedText = "";

         while (true) {
           const { done, value } = await reader.read();
           if (done) {
            onAIReply && onAIReply(accumulatedText);  // <-- 当AI的回复生成时，通知父组件
            break;
           }
           // Massage and parse the chunk of data
           const chunk = decoder.decode(value);

           accumulatedText += chunk;

           setResultText(accumulatedText);  // 使用setState更新状态
         }
       } catch (error) {
             console.error("Error occurred while generating:", error.message);
       }
      };
      generate();
    }

    }, [ai, content]);
```

另外，注意一点，为了把所有路径都导向正常的后端，nextjs 需要改动 next.config.js 文件，这里的路径不必修改：

```javascript
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:5328/api/:path*'
            : '/api/',
      },
    ]
  },
}

module.exports = nextConfig
```

以上的两个文件修改后，使用127.0.0.1:3000 或者 192.168.1.x:3000 都能访问前端，且顺利连接 api。

手机连接的网址就是 192.168.1.x:3000

