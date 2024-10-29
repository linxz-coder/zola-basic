+++
title = "react外层包裹的Fragment组件"
date = 2024-10-29
+++

玩过react的都知道，在return里面不允许直接写超过一层的html标签，如果有多层标签，必须要用\<div>包裹。

但是用div包裹有个问题：如果你按F12审查元素，会发现网页层级非常深，包着一层层的div，要找数据不容易。

还有什么办法？

这时候，就用隆重请出\<Fragment>标签了。

# 使用方法

```javascript
import {Fragment} from 'react'

return(
    <Fragment>
        <input/>
        <input/>
    <Fragment/>
)
```

最终渲染后，Fragment会被react丢弃。

# Fragment和空标签

相信大家也看过这种形式：

```javascript
return(
    <>
        <input/>
        <input/>
    </>
)
```

这就是空标签，起的作用和Fragment是一样的。那么，什么时候用哪一种呢？

如果你需要唯一标识key，比如遍历的时候，你就需要用Fragment，其他时候就用空标签就可以了。注意：Fragment标签不允许有除key以外的任何属性。

