+++
title = "如何在vue中实现代码高亮-使用highlight.js"
date = 2024-09-21
+++

## 安装highlight.js
首先，使用 npm 安装 highlight.js：
```bash
npm install highlight.js @highlightjs/vue-plugin
```

## 引入highlight.js
在 main.js 中引入 highlight.js：
```javascript
import 'highlight.js/styles/stackoverflow-light.css'
import 'highlight.js/lib/common';
import hljsVuePlugin from "@highlightjs/vue-plugin";


app.use(hljsVuePlugin)
app.mount('#app')   //最后挂载应用，顺序不能倒过来。
```

## 使用highlight.js
在需要高亮的地方使用 `<Highlight>` 组件：
```html
<template>
    <highlightjs language="js" code="console.log('Hello World');"
    />
</template>
```

## 参考
https://github.com/highlightjs/vue-plugin
https://highlightjs.readthedocs.io/en/latest/readme.html?highlight=vue#using-with-vue-js

highlight.js官网：
https://highlightjs.org/