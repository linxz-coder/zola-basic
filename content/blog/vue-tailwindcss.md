+++
title = "如何在vue中使用tailwindcss"
date = 2024-09-21
+++

## 开启一个vue项目
```bash
npm create vue@latest
```

## 安装tailwindcss
首先，使用 NPM 安装 Tailwind 以及其它依赖项:
```bash
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
```
安装后，使用 npx 命令生成 tailwind.config.js 和 postcss.config.js 配置文件：
```bash
npx tailwindcss init -p
```

## 配置tailwindcss
接下来，先配置 Tailwind 来移除生产环境下没有使用到的样式声明：
```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

创建 ./src/index.css 文件并填充以下内容：
```css
/* ./src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

最后，将 ./src/index.css 文件导入到 ./src/main.js或main.ts 文件中：
```javascript
// ./src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

createApp(App).mount('#app')
```

## 使用tailwindcss
```html
<template> 
  <h1 class="text-3xl font-bold underline"> Hello world! </h1> 
</template>
```

## 参考教程
https://blog.in-x.cc/tech/frontend/tailwindcss-vue3-vite
https://juejin.cn/post/7270534122609819660

## 示例github项目
https://github.com/linxz-coder/vue-tailwindcss





