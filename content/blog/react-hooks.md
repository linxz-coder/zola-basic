+++
title = "什么是react-hooks"
date = 2024-10-28
+++

是什么？好处是什么？

Hook是React 16.8.0版本增加的新特性/新语法。可以让你在`函数组件`中使用 state 以及其他的 React 特性（比如生命周期钩子）。

在此之前，函数组件比class组件差劲很多，因为缺乏`this`的调用，只能完成一些简单的功能。

三个主要hooks是useState, useEffect, useRef

# useState用法

```javascript
import {useState} from 'react'

export default function Demo() {

    const [count, setCount] = useState(0)

    const add = () => {
        setCount(count + 1);
    }

  return (
    <div>
        <h2>当前求和为：{count}</h2>
        <button onClick={add}>点我加1</button>
    </div>
  )
}
```

# useEffect

由于函数式组件不能用生命周期钩子，比如ComponentDidMount，就可以借助useEffect来模拟类组件的生命周期钩子。

## 副作用
useEffect是用来解决副作用的，什么是副作用操作？
1. 发ajax请求数据获取
2. 设置订阅 / 启动定时器
3. 手动更改真实DOM（比如卸载组件）

```javascript
// 模拟componentDidMount和componentDidUpdate，到底要模拟哪个，看第二个参数怎么传
// 不写空数组，指谁也不监测，渲染后、更新后都会执行
// 写空数组，只监测第一次渲染，只执行一次
// 写Count，监测Count，只要Count变化，就会执行
useEffect(() => {
    console.log('useEffect()')
}, [count])
```

## useEffect调用两次的问题

双重调用可以帮助定位一些BUG，比如调用函数两次，可以发现上次函数是否有清理结果；比如说fetch api后，能够看到后一次结果是否会覆盖前一次结果，是否是你预期的。

总之，在调试模式下的双重调用，是React故意的，方便发现BUG的。

彻底解决双重调用：

1. 仅会在调试模式调用2次，生产模式不会；
2. 使用了严格模式，可以选择删除严格模式，即index.js里面的\<React.StrictMode>来恢复正常。

# useRef

由input框的ref属性延伸的，可以看这篇[react的refs](@/blog/react-refs.md)。

作用：Ref Hook可以在函数组件中存储/查找组件内的标签或任意其它数据。功能与createRef()类似。

```javascript
const myRef = useRef()

const show = () => {
        alert(myRef.current.value)
    }

<button onClick={show}>点我提示数据</button>
```



## 参考资料
[尚硅谷react扩展视频](https://www.youtube.com/watch?v=_9D-t6EE7vs&list=PLmOn9nNkQxJFJXLvkNsGsoCUxJLqyLGxu&index=119)
