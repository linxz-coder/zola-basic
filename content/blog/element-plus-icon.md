+++
title = "如何用vue的UI库-element-plus里面的icon？"
date = 2024-09-21
+++

## 安装icons-vue
```bash
npm install @element-plus/icons-vue
```

## 在main.ts中引入
```javascript
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')
```

## 使用示例
```html
<el-button circle @click="toggleSidebar">
  <el-icon>
    <Close />
  </el-icon>
</el-button>
```

## icon图标集锦及使用方法
https://element-plus.org/zh-CN/component/icon.html#%E6%B3%A8%E5%86%8C%E6%89%80%E6%9C%89%E5%9B%BE%E6%A0%87
