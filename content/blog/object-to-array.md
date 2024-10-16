+++
title = "js 如何把 object 转换为数组 array ？"
date = 2023-09-22
+++

使用 Object.entries()

作用：

把 object {key1: value1, key2: value2} 转化为数组array [['key1', 'value1'], ['key2', 'value2']]

使用 javascript 的例子：

```javascript
const object1 = {
  a: 'somestring',
  b: 42
};

const result = Object.entries(object1);
console.log(result);
// output: [['a', 'somestring'], ['b', 42]]
```

# object.entries().filter(filter-function) 用法

object.entries() 会返回一个数组[example]

filter 会将 [example] 里面的元素一一放入 filter-fuction 中，如果返回结果是 true，那么就将它放入新数组；如果返回结果是 false，该元素会被排除出新数组。

示例代码：

```javascript
const numbers = [1, 2, 3, 4, 5, 6];

// 定义一个函数来检查一个数字是否大于 3
const isGreaterThanThree = (num) => num > 3;

// 使用 filter 方法来创建一个新数组，其中包含所有大于 3 的数字
const filteredNumbers = numbers.filter(isGreaterThanThree);

// 输出：[4, 5, 6]
console.log(filteredNumbers);
```

# .some 与 .filter 对比

.some 输出 true or false

```javascript
const array = [1, 2, 3, 4, 5];

// 测试函数，检查一个数是否大于 3
const isGreaterThanThree = (number) => number > 3;

// 使用 .some() 方法检查数组中是否至少有一个元素大于 3
const result = array.some(isGreaterThanThree);

console.log(result); // 输出: true
```

.filter 输出符合条件的数组 [filter-elements]

注意区分输出结果，.some 常常可以放入.filter中作为判断条件。

试着举一个例子，说明object.entries()，如果有key-value对，如下：

```javascript
key: "75afdbac-4643-4afb-8f83-2780f861183e"

value: {messages: Array(2), chatTitle: "闲聊", startTime: "20:30"}

// 转换后应为这样的形态：[[key, value],...]
```

所以，以上代码转化结果是：

```javascript
[[
"75afdbac-4643-4afb-8f83-2780f861183e",
{"messages":[{"user":true,"content":"你好"},{"user":false,"content":"你好！我是豆豆"}],"chatTitle":"闲聊","startTime":"20:30"}
]]
```

之所有有两个[]号，因为假设有多个 objects。

