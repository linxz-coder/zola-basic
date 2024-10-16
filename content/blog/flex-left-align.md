+++
title = "flex 应用：如何让居中的元素左对齐？"
date = 2023-10-12
+++

实现效果：

![flex-left-align1](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/flex-left-aglin1.png)

解释：

1.最外层用flex来使用flex布局，items-center和justify-center保证居中元素效果

2.次外层用flex flex-col来使用flex布局，items-start保证左对齐效果

```html
<div className="flex items-center justify-center min-h-screen bg-gray-800">
  <div className="flex flex-col items-start ml-10">
    <h1 className={"text-xl md:text-3xl font-bold text-purple-400 " + ps2.className}>
      linxz:$ 
        <span className="text-gray-500"> type help to start</span>
    </h1>

    <p className="text-base text-gray-300 mt-10">
      Visit <a href="https://www.linxiaozhong.club" className="text-teal-200">Normal Website</a>
    </p>

    <p className={"text-[8px] md:text-base text-gray-300 mt-10 " + ps2.className}>
      θ/007 ~ <span className="text-teal-200">{'>> $  '}</span>
      <input 
        ref={firstInputRef}
        className="mt-4 bg-gray-800 text-white p-2 rounded focus:outline-none"
        value={firstInputValue} 
        onChange={handleFirstInputChange} 
      />
    </p>
  </div>
</div>
```

## 参考链接

[TailwindCSS align-items](https://tailwindcss.com/docs/align-items#center)
