+++
title = "如何在 Tailwind CSS 里面设置响应式布局？"
date = 2023-10-12
+++

响应式布局，即响应不同屏幕大小的界面，运用不同大小的元素（文字、画框等）

最简单的就是改变sm、md、lg大小，我们可以这样设置：

```javascript
className = "hidden md:block md:w-[300px]"
```

以上的代码意思为——

当屏幕尺寸为sm（small）时，该元素隐藏（hidden），而当md（medium）以上时，显示（block），且元素宽度固定为 300px。

注意：

因为响应式布局是从小到大覆盖的，所以一般不会用到sm:，一般是md或者lg以上设置状态

# 不同尺寸大小参考

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  }
}
```

这个尺寸也是可以自定义的，按照[官网链接](https://tailwindcss.com/docs/screens#overriding-the-defaults)设置即可。

## 参考资料
[TailwindCSS 官网 – 响应式设计](https://tailwindcss.com/docs/responsive-design#overview)




