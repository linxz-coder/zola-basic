+++
title = "如何在 nextjs 里面使用 markdown 格式输出？"
date = 2023-09-13
+++

需要使用一个叫“react-markdown”的库。

首先安装库：

```bash
npm i react-markdown
```

import 库：

```javascript
import ReactMarkdown from 'react-markdown';
```

使用 markdown 的模块：

```html
<ReactMarkdown>{yourContent}</ReactMarkdown>
```

如果需要使用 html 模块，比如\<br/>，需要添加 Plugins `rehypeRaw`：

```html
<ReactMarkdown rehypePlugins={[rehypeRaw]}>{yourContent}</ReactMarkdown>
```

如果需要使用不常用的markdown语法，需要使用插件`remark-gfm`，用法与其他 Plugins 一致。

```html
<ReactMarkdown remarkPlugins={[remarkGfm]}>{yourContent}</ReactMarkdown>
```

官网解释remark-gfm：

\<ReactMarkdown> 支持的语法: 

a, blockquote, br, code, em, h1, h2, h3, h4, h5, h6, hr, img, li, ol, p, pre, strong, and ul.

remark-gfm Plugin 支持的语法: 

del, input, table, tbody, td, th, thead, and tr.

# 表格输出

除了使用 remark-gfm Plugin 外，还需要额外添加 CSS 语法。这样一来，才会显示表格的边框。

以 openai 的输出为例，主要影响的是th表头和td表格内容。需要添加在globals.css里面：

```css
th {
  background-color: #b3e5fc; /* 表头是浅蓝色的 */
  color: #333;
  font-weight: bold;
  text-align: center; /* 居中 */
}

td {
  text-align: center;
}
```

# 使用 TailwindCSS 后 markdown 失效

如果你在使用 TailwindCSS，请注意 markdown 效果不能正常显示。因为 TailwindCSS 会改变所有 html 的元素效果，可以参考这个[stackoverflow 帖子](https://stackoverflow.com/questions/74607419/react-markdown-don%C2%B4t-render-markdown)。

解决方法是在 globals.css 新增一个类，叫做 markdown，代码如下：

```css
 .markdown > * {
  all: revert;
}
```

这个代码会消除已有的 html 效果，所以只需要在 ReactMarkdown 上添加这个类即可：

```html
<ReactMarkdown className='markdown'>{messageContent}</ReactMarkdown>
```

# 如何显示 code block

code block 需要用到 react-syntax-highlighter，首先是安装：

```bash
npm install react-syntax-highlighter
```

需要 import 两个库，一个是 react-syntax-highlighter，一个是代码风格：

```javascript
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {vscDarkPlus} from 'react-syntax-highlighter/dist/esm/styles/prism'
```

在 return 里面，输出以下代码：

```html
<ReactMarkdown className='markdown' rehypePlugins={[rehypeRaw]} 
   components={{
      code({node, inline, className, children, ...props}) {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <SyntaxHighlighter
          {...props}
          children={String(children).replace(/\n$/, '')}
          style={vscDarkPlus}
          language={match[1]}
          PreTag="div"
        />
      ) : (
        <code {...props} className={className}>
          {children}
        </code>
      )
      }
    }}
>{messageContent}</ReactMarkdown>
```

这样可以实现检测出代码时，以代码的形式输出，效果如下图：

![nextjs-markdown1](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/nextjs-markdown1.png)

以上代码主要参考 react-markdown 官网中 react-syntax-highlighter 模块。

# 代码自动换行

如何让代码自动换行：

`wrapLongLines={true}`

react-syntax-highlighter的参数可查阅[github链接](https://github.com/react-syntax-highlighter/react-syntax-highlighter)。

代码：

```html
<SyntaxHighlighter
  {...props}
  children={String(children).replace(/\n$/, '')}
  style={vscDarkPlus}
  language={match[1]}
  PreTag="div"
  wrapLongLines={true}
/>
```

效果如下：

![nextjs-markdown2](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/nextjs-markdown2.png)

## 参考资料

1. [react-markdown 官网](https://www.npmjs.com/package/react-markdown?activeTab=readme)

2. [react-syntax-highlighter style 预览](https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/prism.html)

3. [react-syntax-highlighter style 各类别名称](https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/master/AVAILABLE_STYLES_PRISM.MD)

4. [React Markdown: A Thorough Guide With Markdown Examples](https://www.copycat.dev/blog/react-markdown/)

5. [react-syntax-highlighter 个人经验](https://medium.com/young-developer/react-markdown-code-and-syntax-highlighting-632d2f9b4ada)




