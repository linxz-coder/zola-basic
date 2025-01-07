+++
title = "vue2和vue3语法区别"
date = 2025-01-06
authors = ["小中"]
[taxonomies]
tags = ["vue"]

+++

# vue3

```vue
<script setup>
	import {ref} from 'vue';

	// 使用 ref 来确保数据是响应式的
	let name = ref('linxz');

	function changeName() {
		name.value = 'Mary'; 
	}
</script>
```

# vue2

```vue
<script>
export default {
	data() {
		return {
			name: 'linxz'
		};
	},
	methods: {
		changeName() {
			this.name = 'Mary'; 
		}
	}
};
</script>
```
