+++
title = "nuxt的介绍"
date = 2024-10-30
+++

# NUXT是什么？

vue的`SSR渲染模式`对应的是NUXT技术，react的SSR渲染对应的是NEXT(nextjs)。

# 什么是服务端渲染？

服务端渲染又称SSR（Server Side Render）是在服务端完成页面的内容，而不是在客户端通过AJAX获取数据。

服务器端渲染（SSR）的优势主要在于：`更好的SEO`，由于搜索引擎爬虫抓取工具可以直接查看完全渲染的页面。

如果你的应用程序初始展示 loading 菊花图，然后通过 Ajax获取内容，抓取工具并不会等待异步完成后再进行页面内容的抓取。也就是说，如果SEO 对你的站点至关重要，而你的页面又是异步获取内容，则你可能需要服务器端渲染（SSR）解决此问题。

另外，使用服务器端渲染，我们可以获得更快的内容到达时间（time-to-content），无需等待所有的 JavaScript 都完成下载并执行，产生更好的用户体验，对于那些「内容到达时间（time-to-content）与转化率直接相关」的应用程序而言，服务器端渲染（SSR）至关重要。

## NUXT-SSR示意图
![nuxt-picture](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202410301652476.png)

## NUXT安装
参考[NUXT中文网](https://www.nuxtjs.cn/guide/installation)。

```
npx create-nuxt-app nuxt-tutorial
```

完成一些选择即可，官网有完整指引。

运行：

```
npm run dev
```

生产环境：

```
npm run build
npm run start
```

# NUXT目录结构
.nuxt ——编译后的文件
assets——未编译的静态资源，如js和css文件
layouts ——网页布局文件.vue (现在默认不生成了）
static ——静态资源（不需要被编译，直接映射到根目录下），比如图片，robot.txt
components ——项目组件
pages ——路由组件（各个页面）
store ——Vuex状态树文件
nuxt.config.js ——项目核心配置文件

[nuxt的目录结构-官网](https://www.nuxtjs.cn/guide/directory-structure)

## 参考资料
[尚硅谷NUXT教程](https://www.youtube.com/watch?v=Mnf_n4ghJR0&list=PLjwE8m3kyOld0u6UwVJz-Sm1XkGcKBUv2&index=166)
