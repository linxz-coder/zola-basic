+++
title = "如何在 nextjs 项目里面使用 google font？"
date = 2023-10-11
+++

我使用的 google font 是`Press Start 2P`。

# import 字体

```javascript
import { Press_Start_2P } from "next/font/google";
```
# 设定字体属性

```javascript
const ps2 = Press_Start_2P({ subsets: ["latin"], weight:'400'});
```

subsets：只需要引进子集，减少空间浪费，比如只引进标准latin字母即可。

weight：字体粗细。

# 放入className

```html
<h1 className={"text-3xl font-bold text-purple-400 " + ps2.className}>
```

完整代码如下：

```html
import { Press_Start_2P } from "next/font/google";
const ps2 = Press_Start_2P({ subsets: ["latin"], weight:'400'});

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-800">
      <h1 className={"text-3xl font-bold text-purple-400 " + ps2.className}>
        linxz:$ 
          <span className="text-gray-500"> type help to start</span>
      </h1>

      <div className="w-full max-w-2xl rounded-lg bg-gray-800 text-gray-100 p-4">
        {/* 终端内容 */}
      </div>
    </div>
  )
}
```

注意三个点：

1. 原字体名字是Press Start 2P，带空格的，nextjs代码处理上，需要统一把空格变成下划线，即Press_Start_2P；

2. 必须加上 weight 属性；

3. 将className框起来时，注意后面要留空格，比如上面的text-purple-400后面带空格，这一块我可是debug了很久，不知道为啥字体不生效。

## 参考资料
[nextjs 官网字体功能](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)

[google fonts](https://fonts.google.com/specimen/Press+Start+2P?query=code)


