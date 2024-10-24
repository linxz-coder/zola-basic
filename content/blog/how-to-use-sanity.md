+++
title = "如何使用sanity？"
date = 2024-09-30

+++



如何不用CMS（内容管理系统，又称”网页后台“），又具备CMS的功能？答案是使用sanity。

<br>

# 1.安装sanity

```bash
npm create sanity@latest
```

这会在触发一系列命令，选择：  
1. Select project? Create new project
2. Your project name: 输入项目名称
3. Use the default dataset configurations? Yes
4. Project output path: 默认即可
5. Use typescript? Yes
6. Package manager? npm
7. template? Blog

如图：

选择完毕后，在默认文件夹下会生成新文件夹，名称是你输入的项目名称（我的是"coolstuff"），进入该文件夹，运行：

```bash
cd coolstuff
npm run dev
```

即可进入网页后台，网页后台的地址是：http://localhost:3333/desk


参考：

[sanity crash course 教程](https://www.youtube.com/watch?v=bDVAQZVeebw&t=1001s)

<br>

# 2.调整后台参数

这一步是可选的。

我们可以用vscode打开”coolstuff"文件夹，在"schemmas-author.ts"文件中，修改作者的信息，如下图：

我们可以看到，我在代码中添加了“昵称”的输入框，后台内容与我们的修改同步，如图：

当然，你完全可以不用管代码的参数，原后台的内容已经足够丰富。这个步骤是给爱折腾的人准备的。

<br>

# 3.发布文章

在后台左侧，点击“Post”，输入文章标题，链接后缀（slug），作者，文章内容，如图：


值得注意的是，我们上传图片后是可以裁剪图片的，会出现一个圆点，这是聚焦点。我们可以通过拖动圆点，调整图片的聚焦，这样可以保证无论图片大小如何，重点都在聚焦点上。如图：

完成以上步骤后，我们就算完成文章的发布了。

那么文章发布在哪里呢？且慢，我们先教如何部署后台，即deploy。

<br>

# 4.部署后台

安装sanity以使用sanity命令：

```bash
npm install -g sanity@latest
```

完成安装后，输入：

```bash
sanity deploy  
```

中间会弹出消息，让你输入一个域名前缀，随便输入一个，只要不和他们现有的前缀冲突即可，我的是"gptcrash",所以我现就在可以在 https://gptcrash.sanity.studio/desk/ 
直接访问我的网站后台了。

如图：

这意味着什么呢？意味着你把网页托管在sanity的云服务器上，随时打开这个网页就能管理你的网站。

那网站呢？别急，我们首先要学会获取数据。

<br>

# 5.获取数据

我们使用sanity来管理网站，不仅是需要它的后台，还需要它帮我们托管数据。数据存储在sanity的云上。那我们怎么获取这些数据呢？

答案是使用数据获取语言“GROQ”。它是sanity的一种语言，类似SQL语言，它可以帮助我们获取数据。

打开后台的“Vision"标签，即会来到GROQ的界面，如图：

以上演示了如何获取文章的标题和内容。

知道如何获取数据后，我们就可以开始建设网站了。

<br>

# 6.建设网站

我们如何开始？

1. 官方给了一个github仓库，我们可以用来做模版：

```bash
git clone https://github.com/sanity-io/get-started-sanity-nextjs.git
```

2. 安装依赖项和nextjs工具包：

```bash
npm install
npm i next-sanity
```
3. 添加代码：

```js
import { createClient } from "next-sanity";

const client = createClient({
  projectId: "lqz08o01",
  dataset: "production",
  apiVersion: "2022-03-25",
  useCdn: false
});

const pets = await client.fetch(`*[_type == "pet"]`);
```

代码添加位置在后面的教程链接有详细说明。

4. 运行网站

```bash
npm run dev
```

这样就可以看到网站了。如图：

这是我的网站页面，对官方的代码进行了部分修改，也把我的代码贴在下方，方便参考：

```js
import { createClient } from "next-sanity";

const client = createClient({
  projectId: "your-project-id",
  dataset: "production",
  apiVersion: "2023-05-23",
  useCdn: false
});

export default function IndexPage({ posts, contents }) {
  return (
    <>
      <header>
        <h1>凡学子</h1>
      </header>
      <main>
        <h2>Blogs</h2>
        {console.log("posts:", posts)}
        {posts.length > 0 && (
          <ul>
            {posts.map((post) => (
              <li key={post._id}>{post?.title}</li> //?会抛出undefine，避免程序错误
            ))}
          </ul>
        )}
        {!posts.length > 0 && <p>No posts to show</p>}
        {posts.length > 0 && (
          <div>
            {/*console.log("contents:", contents)*/}
            <ul>
                {contents.map((content) => (
                  <li key={content._key}>{content?.text}</li>
                ))}
            </ul>
            {/* <p>{contents[0].text}</p> */}
          </div>
        )}
        {!posts.length > 0 && (
          <div>
            nothing.
          </div>
        )}
      </main>
    </>
  );
}

export async function getStaticProps() {
  const posts = await client.fetch(`
  *[_type == "post"]{
    title,
  }
  `);;

  const contents = await client.fetch(`
  *[_type == "post"][].body[].children[]
  `);;

  return {
    props: {
      posts,
      contents
    }
  };
}
```

注：

- projectid可以在”https://www.sanity.io/manage“中点击项目名称找到，其他的设置可以维持默认，api获取日期填最新的日期即可（通常是今天）。
- 如果用到<Link>的组件，官方解释需要把 Next.js 的 URL 添加到你的 CORS 源中。同样是到"manage"的页面，找到”api“，然后添加网址到CORS中即可。因为浏览器带有安全功能，可防止代码注入从您的 cookie 中窃取信息并将其传递给第三方。这被称为 CORS。
- sanity连接nextjs网站教程：
https://www.sanity.io/docs/connect-your-content-to-next-js

完成以上步骤，基本上就完成前后台连接了，撒花！
