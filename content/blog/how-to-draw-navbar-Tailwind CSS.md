+++
title = "如何使用Tailwind CSS画漂亮的导航条？"
date = 2024-09-30

+++

在上一篇文章中，我介绍了”如何用TailwindCSS画漂亮的按钮“，这篇文章着重是画导航条。

由于如何利用nextjs和tailwindcss创建一个app已经在上一篇文章中介绍过了，这里就不再赘述。需要补课的同学可以看看上一篇文章。

## 导航条一：渐变主题

代码如下：
```html
      <nav className="container mx-auto px-6 py-2 flex justify-between items-center bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg">
        <div className="font-bold text-xl text-white">
          凡学子
        </div>

        <div className="flex space-x-4">
          <a href="#" className="flex items-center justify-center text-white text-md bg-white bg-opacity-25 px-4 py-2 rounded-lg hover:bg-opacity-50 transition duration-300 w-24">首页</a>
          <a href="#" className="flex items-center justify-center text-white text-md bg-white bg-opacity-25 px-4 py-2 rounded-lg hover:bg-opacity-50 transition duration-300 w-24">历史文章</a>
          <a href="#" className="flex items-center justify-center text-white text-md bg-white bg-opacity-25 px-4 py-2 rounded-lg hover:bg-opacity-50 transition duration-300 w-24">有趣的事</a>
          <a href="#" className="flex items-center justify-center text-white text-md bg-white bg-opacity-25 px-4 py-2 rounded-lg hover:bg-opacity-50 transition duration-300 w-24">联系我</a>
        </div>
      </nav>
```

代码解释：

1. container: 在容器元素上应用了 Tailwind CSS 的样式类，用于设置最大宽度和水平居中。
2. mx-auto: 在容器元素上应用了 Tailwind CSS 的样式类，用于设置水平居中。
3. px-6: 在容器元素上应用了 Tailwind CSS 的样式类，用于设置水平内边距。
4. py-2: 在容器元素上应用了 Tailwind CSS 的样式类，用于设置垂直内边距。
5. flex: 在容器元素上应用了 Tailwind CSS 的样式类，用于使用 Flexbox 布局。
6. justify-between: 在容器元素上应用了 Tailwind CSS 的样式类，用于在 Flexbox 布局中使子元素水平分布。
7. items-center: 在容器元素上应用了 Tailwind CSS 的样式类，用于在 Flexbox 布局中使子元素垂直居中。
8. bg-gradient-to-r: 在容器元素上应用了 Tailwind CSS 的样式类，用于创建从左到右的背景渐变效果。
9. from-purple-500: 在容器元素上应用了 Tailwind CSS 的样式类，用于指定背景渐变的起始颜色为紫色（品牌颜色500级别）。
10. to-indigo-500: 在容器元素上应用了 Tailwind CSS 的样式类，用于指定背景渐变的结束颜色为靛蓝色（品牌颜色500级别）。
11. rounded-lg: 在容器元素上应用了 Tailwind CSS 的样式类，用于添加圆角边框。
12. font-bold: 在 <div> 元素上应用了 Tailwind CSS 的样式类，用于设置粗体字体。
13. text-xl: 在 <div> 元素上应用了 Tailwind CSS 的样式类，用于设置文本大小为 extra large。
14. text-white: 在 <div> 元素上应用了 Tailwind CSS 的样式类，用于设置文本颜色为白色。
15. space-x-4: 在 <div> 元素上应用了 Tailwind CSS 的样式类，用于设置子元素之间的水平间距为 4。

<br>

## 导航条2：简洁主题
代码如下：
```html
      <nav className="container mx-auto px-6 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <svg t="1684593262099" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1780" width="48" height="48"><path d="M704 192c-68.693333 0-148.992 77.866667-192 128-43.008-50.133333-123.306667-128-192-128C198.442667 192 128 286.805333 128 407.466667c0 133.674667 128 275.2 384 424.533333 256-149.333333 384-288 384-416 0-120.661333-70.442667-224-192-224z" fill="#c76abf" opacity=".3" p-id="1781"></path><path d="M512 832C256 682.666667 128 541.141333 128 407.466667 128 286.805333 198.442667 192 320 192c68.693333 0 148.992 77.866667 192 128v512z" fill="#c76abf" p-id="1782"></path></svg>
          <div className="font-bold text-xl text-black ml-2">凡学子</div>
        </div>

        <div className="flex space-x-4">
          <a href="#" className="flex items-center justify-center text-black text-md bg-white px-4 py-2 rounded-lg">
            首页
          </a>
          <a href="#" className="flex items-center justify-center text-black text-md bg-white px-4 py-2 rounded-lg">
            历史文章 <span className="ml-1">&#9662;</span>
          </a>
          <a href="#" className="flex items-center justify-center text-black text-md bg-white px-4 py-2 rounded-lg">
            有趣的事 <span className="ml-1">&#9662;</span>
          </a>
          <a href="#" className="flex items-center justify-center text-black text-md bg-white px-4 py-2 rounded-lg">
            联系我 <span className="ml-1">&#9662;</span>
          </a>
          <button className="flex items-center justify-center bg-violet-500 text-white px-4 py-2 rounded-lg">
            免费注册
          </button>
          <button className="flex items-center justify-center bg-indigo-50 text-violet-500 px-4 py-2 rounded-lg">
            登录
          </button>
        </div>
      </nav>
```

代码解释：
上面解释过的代码不重复介绍。

1. <code>svg</code>和<code>/svg</code>之间的代码不用看，只是为了导入我的logo。
2. <code>&#9662;</code>代表下拉三角形，是一种一个十进制的HTML字符实体。其中"&#"开始，然后是一串数字，最后是一个分号。这串数字代表了Unicode字符的十进制代码。9662是这个特定字符（下箭头）在Unicode标准中的位置。Unicode是一种计算机编码标准，用于在所有系统和平台中统一表示和处理文字。Unicode为世界上所有的字符、符号和表情等分配了一个唯一的数字，这个数字就是Unicode代码点。所以，当你在HTML中输入"▾"时，浏览器会解析这个字符实体，并显示出对应的下箭头符号。
