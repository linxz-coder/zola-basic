+++
title = "如何用vue的UI库-element-plus"
date = 2024-09-21
+++

## 开启一个vue项目
```bash
npm create vue@latest
```

## 安装element-plus
```bash
npm install element-plus
```

## 完整引入
```javascript
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.mount('#app')
app.use(ElementPlus)
//app.use(ElementPlus, { size: 'small', zIndex: 3000 })
```

`{ size: 'small', zIndex: 3000 }`可加可不加。
size 用于设置表单组件的默认尺寸，zIndex 用于设置弹出组件的层级，zIndex 的默认值为 2000。

## Volar支持
如果你使用vs code, 为了语法高亮，一般会安装volar插件。这时候需要增加支持。
```bash
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "types": ["element-plus/global"]
  }
}
```

## 使用按钮效果
```html
<template>
  <div class="mb-10">
    <el-button plain>Plain</el-button>
    <el-button type="primary" plain>Primary</el-button>
    <el-button type="success" plain>Success</el-button>
    <el-button type="info" plain>Info</el-button>
    <el-button type="warning" plain>Warning</el-button>
    <el-button type="danger" plain>Danger</el-button>
  </div>
</template>

<script setup lang="ts" name="App">
</script>

<style scoped></style>
```
这是一个简单的按钮效果，可以看到按钮的颜色和样式都是element-plus的。



## 官方教程
https://element-plus.org/zh-CN/guide/quickstart.html
