+++
title = "怎么使用nanoid?uuid的替代方案"
date = 2024-09-21
+++

## 什么是nanoid?
nanoid其实是uuid的替代品，是一个轻量化版本。

它可以生成一个不重复的随机字符串，用于标识数据。

nanoid的特点是短小、不重复、URL友好，适合用于生成短链接、短ID等场景。

## 安装nanoid
```bash
npm install nanoid
```

## 使用nanoid
这里介绍的是在vue3中使用nanoid的方法。
```javascript
import { nanoid } from 'nanoid';
const currentChatId = ref(nanoid())
```