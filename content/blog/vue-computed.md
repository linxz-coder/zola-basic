+++
title = "vue中的computed属性有什么用？"
date = 2024-09-21
+++

computed属性有两个特点：
1. 响应式：当依赖的数据发生变化时，computed属性会自动更新。
2. 缓存：只有依赖的数据发生变化时，computed属性才会重新计算。

## computed属性的用途
### 一、缓存计算结果，避免重复计算。
比如缓存日期格式化的结果：
```javascript
const date = ref(new Date())
const formattedDate = computed(() => {
  return date.value.toLocaleDateString()
})
```
这样一来，只有`date`发生变化时，`formattedDate`才会重新计算。类似于React中的`useMemo`。

### 二、多个响应式数据的计算
```javascript
const a = ref(1)
const b = ref(2)
const sum = computed(() => {
  return a.value + b.value
})
```
这样一来，只要`a`或`b`发生变化，`sum`就会自动更新。

如果你不用computed(),而是直接采用sum = a + b，那么只会在第一次渲染时计算一次，之后不会再更新。