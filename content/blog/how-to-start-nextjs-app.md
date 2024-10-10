+++
title = "如何创建一个nextjs app？"
date = 2023-05-16
+++

# 快速开始
```bash
npx create-next-app myblog
```

注意，项目名称不能用大写，比如Myblog，我也不知道为啥有这么奇葩的规定。可以看[官方说明](https://nextjs.org/docs/pages/api-reference/create-next-app)。

# 从模版创建
```bash
npx create-next-app@latest nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/master/basics/learn-starter"
```
注：—use-npm 指用npm安装依赖包，默认是yarn。可以使用[其他模板](https://github.com/vercel/next.js/tree/canary/examples)。

## 与tyscript同时创建
```bash
npx create-next-app --typescript myblog
```

## 与tailwindCSS同时创建
```bash
npx create-next-app --tailwind myblog
```

## 包含tailwindcss模版
```bash
npx create next-app --example with-tailwindcss my-project
```

注意，也可以创建后再[安装tailwindcss](https://www.showwcase.com/show/15201/create-a-web-project-using-nextjs-typescript-tailwind-css)。

# 进入文件夹
```bash
cd myblog
```

# 启动
```bash
npm run dev
```

打开 http://localhost:3000 页面，查看效果，相当 beautiful。




