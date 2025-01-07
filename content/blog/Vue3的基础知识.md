+++
title = "Vue3的基础知识"
date = 2025-01-07
authors = ["小中"]
[taxonomies]
tags = ["vue"]

+++

官方教程

[官方快速上手](https://cn.vuejs.org/guide/quick-start.html)

以下是uni-app的语法示范：

# 花括号可以写表达式（需要有返回值）

```vue
{{ 2+3 }}
{{ a + 5 }}
{{ Date.now() }}
{{ Math.random() }}
{{ 1<2 ? '张三' : '李四' }}
```

# 函数基本调用

函数声明：

```vue
<script setup>
	function fn(){
		return "hello world"
	}
</script>
```

调用：

```vue
<view>{{ fn() }}</view>
```

# 响应式数据（页面渲染）

需要用`ref`。

```vue
<script setup>
	import {ref} from 'vue';

	let name = ref('linxz');

	function changeName() {
		name.value = 'Mary'; 
	}
</script>
```

使用ref()的时候，取值必须通过.value完成。

而针对对象，可以用reactive()，取值就不用加.value。不过开发中一般都是用ref()，容易记。

```vue
let car = reactive({ brand: 'benz', price: 100 })
```

# 属性使用script中的变量

使用v-bind:，或者简写方式-冒号:

```vue
<image v-bind:src="picUrl />
//简写方式
<image :src="picUrl />

<script>
import {ref} from "vue";

cosnt picUrl = ref("../../static/pic1.png")
</script>
```

## 属性放表达式也需要用v-bind:

```vue
<div :class="{active: isActive}"></div>
```

常见应用：

若条件为true时，添加.active，否则啥也不加。

```vue
<view class="box" :class="true?'active':''"></view>
```

### 内联样式

```vue
<view style="width: 300px"></view>
```

如果需要用变量。

注意，纯数字比如300是不用打引号的，300px这样的表达才需要。

```vue
<view :style="{width: '300px'}"></view>
```

## 如何让图片循环播放？

取余操作即可。

```js
import {ref} from "vue";
const arrs = ref(["url1", "url2", "url3","url4"])

let i = 0;
setInterval(()=>{
	i++;
	picUrl.value = arrs.value[i%4]
})
```

