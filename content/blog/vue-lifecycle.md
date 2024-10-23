+++
title = "什么是Vue的生命周期？"
date = 2024-10-23
+++

vue常用生命周期4个阶段：**创建、挂载、更新、销毁**，包含8个函数，但是`生命周期不止8个函数`。

![vue2-vue3-lifecycle](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202410231049840.png)

# vue3生命周期示例代码
```html
<template>
  <div class="person">
    <h2>当前求和为：{{ sum }}</h2>
    <button @click="changeSum">点我sum+1</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

// 数据
let sum = ref(0)

// 方法
function changeSum() {
  sum.value += 1
}

// 创建
console.log('创建')


// 挂载前
onBeforeMount(() => {
  console.log('挂载前')
})

// 挂载后，子先挂载，再父挂载
onMounted(() => {
  console.log('子————挂载后')
})

// 更新前
onBeforeUpdate(() => {
  console.log('更新前')
})

// 更新后
onUpdated(() => {
  console.log('更新后')
})

// 卸载前
onBeforeUnmount(() => {
  console.log('卸载前')
})

// 卸载后
onUnmounted(() => {
  console.log('卸载后')
})

</script>

<style scoped>
.person {
  background-color: skyblue;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
}

button {
  margin: 0 5px;
  /* 上下0 左右5px */
}

li {
  font-size: 20px;
}
</style>
```

# vue2生命周期示例代码

```html
<template>
    <div class="person">
        <h2>当前求和为：{{ sum }}</h2>
        <button @click="changeSum">点我sum+1</button>
    </div>
</template>

<script>


export default {
    /* eslint-disable */
    name: 'Person',
    data() {
        return {
            sum: 1
        }
    },
    methods: {
        changeSum() {
            this.sum += 1
        }
    },
    // 创建前的钩子
    beforeCreate() {
        console.log('beforeCreate()')
    },
    // 创建后的钩子
    created() {
        console.log('created()')
    },
    // 挂载前的钩子
    beforeMount() {
        console.log('beforeMount()')
    },
    // 挂载后的钩子
    mounted() {
        console.log('mounted()')
    },
    // 更新前的钩子
    beforeUpdate() {
        console.log('beforeUpdate()')
    },
    // 更新后的钩子
    updated() {
        console.log('updated()')
    },
    // 销毁前的钩子
    beforeDestroy() {
        console.log('beforeDestroy()')
    },
    // 销毁后的钩子
    destroyed() {
        console.log('destroyed()')
    }
}
</script>

<style scoped>
.person {
    background-color: skyblue;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 0 10px;
}
</style>
```