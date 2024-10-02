+++
title = "vue如何进行api请求-axios土味情话"
date = 2024-10-02
+++

重点是async和await，属于js的基本功。

需要用到的模块是axios。

# 安装axios

```bash
npm install axios
```

# 使用axios

```js
import axios from 'axios'
```

# 发送请求
async和await是js的异步操作，用于处理异步请求。

```js
async function fetchLoveTalk() {
  let result = await axios.get('https://api.uomg.com/api/rand.qinghua?format=json')
  console.log(result.data)
  loveTalk.value = result.data.content
}
```

# 完整代码

```js
/* App.vue */
<template>
  <div class="container">
    <h1>土味情话自动更新</h1>
    <h2 class="love-talk">{{ loveTalk }}</h2>
    <button class="btn" @click="fetchLoveTalk">点击显示土味情话</button>
  </div>
</template>

<script setup lang="ts" name="App">
import { ref } from 'vue'
import axios from 'axios'

//数据
let loveTalk = ref('')


//方法
async function fetchLoveTalk() {
  let result = await axios.get('https://api.uomg.com/api/rand.qinghua?format=json')
  console.log(result.data)
  loveTalk.value = result.data.content
}

</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.love-talk {
  font-size: 20px;
  color: #007BFF;
  margin-bottom: 30px;
}

.btn {
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #007BFF;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #0056b3;
}
</style>
```