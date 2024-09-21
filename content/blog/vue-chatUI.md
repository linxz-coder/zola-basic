+++
title = "vue如何做对话框？"
date = 2024-09-21
+++

我想做出两个对话框，一个是用户的询问，一个是机器人的回答。怎么做呢？

我想到的主要是用`flex`和`flex-row-reverse`来控制头像和对话框的方向。

最简单的方法是做两个组件，一个是用户头像+用户对话框，一个是AI头像+AI对话框。但是，这两个组件实际上是重复的，只是方向不同。

比如，机器人的头像在左边，用户的头像在右边；对话框紧挨着头像。

所以，其实我只需要一个组件，通过不同的class来控制方向。


我做了一个示例代码。注意，以下代码用了`Tailwindcss`作为样式库。

```html
<template>
  <div v-for="(message, index) in messages" :key="index"
    :class="['flex', { 'flex-row-reverse': message.user === 'user' }]">
    <div class='min-w-[40px] min-h-[40px]'>
      <img :src="message.user === 'ai' ? '/robot_ai.png' : '/me.png'" class="rounded-full" width=40 height=40
        alt="avatar" />
    </div>
    <div
        :class="{ 'flex flex-col mb-5': true, 'mr-14 ml-3': message.user === 'ai', 'mr-3 ml-14': message.user === 'user' }">
      <div
        :class="{ 'px-4 py-2 rounded-lg shadow-lg md:max-w-fit': true, 'bg-white text-black': message.user === 'ai', 'bg-green-500 text-white': message.user === 'user' }">
        {{ message.content }}
      </div>
    </div>
  </div>
</template>
```

代码解释：
1. `v-for`循环渲染消息列表。以index为key，遍历messages数组。
2. `:class`动态绑定class。根据`message.user`的值，决定对话框的方向。如果用户是'ai'，则仅采用`flex`布局，使对话框从左向右排列；如果用户是'user'，则增加采用`flex-row-reverse`布局，使对话框从右向左排列。
3. img标签显示头像。根据`message.user`的值，决定显示机器人头像还是用户头像。
4. 对话框边距控制，如果是机器人对话框，右边距大，左边距小(mr-14,ml-3)；如果是用户对话框，右边距小，左边距大(mr-3,ml-14)。
5. 对话框内容。根据`message.user`的值，决定对话框的样式。机器人对话框是白色背景，黑色文字；用户对话框是绿色背景，白色文字。另外，值为`true`的class则总是会被应用。

## :class的两种写法：带数组和不带数组

我故意在上面的代码用了两种方式。

### 方式一：带数组的写法

```vue
<div :class="['总是显示的class', { '条件class' : 条件 }]">
```

### 方式二：不带数组的写法:纯对象

```vue
<div :class="{ '总是显示的class': true, '条件class1' : 条件1,'条件class2':条件2 }">
```

我个人更喜欢第二种写法，因为少了一个数组，看起来更简洁。
