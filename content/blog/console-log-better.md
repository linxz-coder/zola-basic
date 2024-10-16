+++
title = "console.log 如何提高可读性"
date = 2023-10-01
+++

我们知道，js 代码中，console.log 用得好，可以有效 debug。

但是，我们在操作数组或者 object 的时候，常常碰到打印到控制台的结果太长或太复杂的问题。

如果你只想控制台输出 [1, 2, 3…] 或者 [name: Peter, age: 18, occupation: doctor] 这样的结果，你需要用上 JSON.stringify()，比如以下代码：

```javascript
console.log(("sessions in search" + JSON.stringify(sessions))) //输出一个object
```

或者这样来输出一个 array：

```javascript
console.log("sessions to array", JSON.stringify(Object.entries(sessions)))
```

Object.entries 主要来帮助 object/dict 转换为 array 的，具体用法可以参考这篇文章：[js 如何把 object 转换为数组 array ？](@/blog/object-to-array.md)

