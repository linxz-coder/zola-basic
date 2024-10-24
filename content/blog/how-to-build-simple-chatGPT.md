+++
title = "如何读取多对象json"
date = 2024-09-30
+++

今天闲来无事，研究一下如何实现ChatGPT网页，从搭建框架开始吧。

如何画出这样的框架呢？

# 1.找到技术栈
我在tailwindcss的[官网](https://tailwindcss.com/showcase)找到OpenAI的案例，那么很有可能它的实现方式也是它。关于如何开始用tailwindcss，可以参考[这篇文章](https://mp.weixin.qq.com/s/KDNRh9z7FrA_oHc3wFnZjg)。

<br>

# 2.查看ChatGPT官网
两个矩形连在一起，无非就是一个flex布局。

我先实验了一下"flex-auto"（参考div的宽度自动排列），发现大小和官网上的不一致。

我查阅了flex相关的[页面](https://tailwindcss.com/docs/flex#auto),陆续实验了”flex-1"（无视div的宽度自动排列）和"flex-none"（固定宽度，不自动调整大小）,都达不到想要的效果。

我在想会不会和"flex-row"和"flew-col"有关，于是查阅了[页面](https://tailwindcss.com/docs/flex-direction#column)，也不对。

我又查阅了宽度相关的[页面](https://tailwindcss.com/docs/width#fixed-widths),了解了"w-1/2"可以设置比例，但是也不能达成一样的效果。

当然，我也问了ChatGPT啦，不过一样没啥效果。

<br>

# 3.查看源代码
于是，我去ChatGPT首页上看了一下源代码。打开网页，按F12，定位到代码所在元素，如下图：

发现它用了“flex-shrink-0“，于是我查阅了[文档](https://tailwindcss.com/docs/flex-shrink)，发现这个可以使菜单栏固定不动，即左边的菜单栏一直是一个大小。

查看源代码，发现它设定了“260px"的宽度，以及gray-900的颜色，所以不用说，抄就完了。

这里还有一个点，外围使用”flex"包围起来的div，需要用“h-screen"才能让方框占满屏幕。

<br>

# 4.其他变体
做出框架后，我又模拟了[ChatUI](https://github.com/linxz-coder/chatUI)做了三个矩形的版本，如下图：

<br>

# 5.代码
在index.tsx文件中复制以下代码即可实现以上的效果：

```html
export default function Home() {
  return (
    <div className='flex h-screen'>
      <div className='flex-shrink-0 bg-gray-900 text-white' style={{width: '260px'}} >
        <div className="flex items-center justify-center w-full h-full text-5xl">
          01
        </div>
      </div>
      <div className='flex-auto bg-white'>
        {/* items-center横向居中 justify-cent纵向居中 */}
        <div className="flex items-center justify-center w-full h-full text-5xl">
          02
        </div>
      </div>
      <div className='flex-shrink-0 bg-custom-color text-white' style={{width: '260px'}}>
        <div className="flex items-center justify-center w-full h-full text-5xl">
          03
        </div>
      </div>
    </div>
  )
}
```

代码解释：

1. flex: 这个类名创建了一个 flex container，允许你使用 flex 布局，即子元素可在这个元素内按照你设定的方式灵活布局。

2. h-screen: 这个类名设置元素的高度等于屏幕的高度。

3. flex-shrink-0: 这个类名阻止元素在 flex container 中收缩。默认情况下，当 flex container 的空间不足时，所有子元素都会等比例收缩，但使用了 flex-shrink-0 的元素则不会收缩。

4. bg-gray-900、bg-white 和 bg-custom-color: 这些类名分别设置了元素的背景色。bg-gray-900是深灰色，bg-white是白色，bg-custom-color是自定义的颜色。

5. text-white: 这个类名设置了元素内文本的颜色为白色。

6. items-center: 在一个 flex container 中，这个类名使所有的子元素在交叉轴（cross axis）上居中。在默认情况下，交叉轴是垂直方向。

7. justify-center: 在一个 flex container 中，这个类名使所有的子元素在主轴（main axis）上居中。在默认情况下，主轴是水平方向。

8. w-full 和 h-full: 这些类名分别设置了元素的宽度和高度为父元素的宽度和高度。

9. text-5xl: 这个类名设置了元素内文本的字体大小。5xl表示很大的字体大小。

这里的"bg-custom-color"是自定义的颜色，因为我一开始没看首页，没发现颜色是"gray-900"，所以用取色器取下来一样的颜色，这个颜色可以在”tailwind.config.js“中配置：

```js
    extend: {
      colors: {
        'custom-color': '#202123',
      },
```

针对以上例子，不配置也没问题，只需要改为"bg-gray-900"即可。