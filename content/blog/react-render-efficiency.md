+++
title = "react-Component渲染效率问题"
date = 2024-10-29
+++

Component渲染有两个问题：
1. 只要执行setState(),即使不改变状态数据, 组件也会重新render() ==> 效率低
2. 只当前组件重新render(), 就会自动重新render子组件，纵使子组件没有用到父组件的任何数据 ==> 效率低

我们想要的结果：
只有当组件的state或props数据发生改变时才重新render()。

# 解决方案-class组件
## 修改shouldComponentUpdate函数

```javascript
shouldComponentUpdate(nextProps, nextState) {
    console.log(this.props, this.state); //目前的props和state
    console.log(nextProps, nextState); //接下要变化的目标props和state
    // return true // true: 更新  false: 不更新

    return this.props.carName !== nextProps.carName
}
```

## PureComponent，而不是Component

```javascript
export default class Parent extends PureComponent
```

# 解决方案-函数组件

一共三种方法：memo(), useMemo(), useCallback()，可以把三种方法组合起来。

## memo()
memo相当于PureComponent，memo()最适合用在纯展示性组件上，这些组件接收简单的props并且很少更新。

```javascript
import React, { memo } from 'react'

// 基础版本
const MyComponent = memo(function MyComponent(props) {
  /* render logic */
  return (
    <div>{props.name}</div>
  )
})

// 自定义比较逻辑版本
const MyComponent = memo(function MyComponent(props) {
  return (
    <div>{props.name}</div>
  )
}, (prevProps, nextProps) => {
  // 返回true则不重新渲染，返回false则重新渲染
  return prevProps.name === nextProps.name
})
```

## useMemo和useCallback

useCallback缓存函数

```javascript
// 使用useCallback缓存函数 
const handleClick = useCallback(() => { setCount(c => c + 1) }, []) // 空依赖数组，函数永远不会重新创建
```

useMemo缓存计算结果或者组件

```javascript
import React, { useMemo } from 'react'

function MyComponent({ data }) {
  const expensiveValue = useMemo(() => {
    // 进行复杂计算
    return computeExpensiveValue(data)
  }, [data]) // 只有data改变时才重新计算

  return <div>{expensiveValue}</div>
}
```

使用这些优化方案的建议：
1. 不要过度优化。只在确实遇到性能问题时才使用这些优化方法。
2. memo()最适合用在纯展示性组件上，这些组件接收简单的props并且很少更新。
3. useMemo()适用于计算量大的操作，或者需要保持引用一致性的场景。
4. useCallback()主要用于传递给使用memo的子组件的回调函数。
最后要注意的是，这些优化方法本身也有开销，如果滥用反而可能导致性能下降。建议在实际开发中先写出可工作的代码，然后使用React DevTools等工具检测性能问题，再有针对性地进行优化。
