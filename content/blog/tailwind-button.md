+++
title = "如何用Tailwind CSS画一个漂亮的按钮？"
date = 2023-05-18
+++

如何用Tailwind CSS画按钮？效果如下：

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/taiwind-button1.png)

点击后的效果如下：

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/tailwind-button2.png)

以下是具体步骤：

# 1.创建一个nextjs app

```bash
npx create-next-app --typescript --tailwind button
```

这将创建一个nextjs app，同时包含typescript和tailwindcss。app的名字叫做”button”。

# 2.进入文件夹

```bash
cd button
```

# 3.打开code编辑器

打开你的vs code或者其他code编辑器。

# 4.修改index.tsx

一般在pages文件夹下的index.tsx文件是网站首页，在这里修改。

将源代码删除，复制以下代码：

```javascript
export default function Home() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
          <button className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:ring focus:ring-violet-300 rounded-md py-2 px-4 text-white font-semibold shadow-md">
            提交方案
          </button>
    </div>
  )
}
```

代码解释：

- max-w-3xl：最大宽度为3xl，3xl是tailwindcss的尺寸，相当于最大宽度为1920px。
- mx-auto：水平居中。
- py-8：上下padding为8。
- px-4：左右padding为4。
- bg-violet-500：背景色为violet-500，violet-500是tailwindcss的颜色，相当于#7F00FF。
- hover:bg-violet-600：鼠标悬停时背景色为violet-600。
- active:bg-violet-700：鼠标点击时背景色为violet-700。
- focus:ring：聚焦时有一个光圈。
- focus:ring-violet-300：聚焦时光圈颜色为violet-300。
- rounded-md：圆角为md，md是tailwindcss的尺寸，相当于4px。
- py-2：上下padding为2。
- px-4：左右padding为4。
- text-white：文字颜色为白色。
- font-semibold：字体粗度为semibold，相当于font-weight是600。
- shadow-md：阴影为md，md是tailwindcss的尺寸，相当于4px。

# 5.运行app

```bash
npm run dev
```

# 6.打开网址

打开 http://localhost:3000 查看页面效果。
