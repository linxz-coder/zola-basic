+++
title = "什么是react的Lazyload(懒加载）"
date = 2024-10-30
+++

懒加载，简单来说就是，使用的时候加载，不用的时候不加载，减少系统负担，增快网页浏览速度。

假如你有100个子网页，我们可以先加载用到的。所以，懒加载一般用在多页面的网页，即router组件里面。

懒加载需要引入`Suspense`和`lazy`模块：

```javascript
import React, { Component, lazy, Suspense } from 'react'

//不用import引入router模块，而是lazy()
const About = lazy(() => import('./About'))
const Home = lazy(() => import('./Home'))

//使用懒加载
{/* loading也可以重新写一个组件，加点样式 */}
<Suspense fallback={<h1>Loading...</h1>}> 
{/* 注册路由 */}
    <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home />} />
    </Routes>
</Suspense>
```

跳转路由：
```javascript
import { NavLink, Route, Routes } from 'react-router-dom'
{/* 在React中靠路由链接实现切换组件 */}
{/* 编写路由链接 */}
  <NavLink className="list-group-item" to="/about">About</NavLink>
  <NavLink className="list-group-item" to="/home">Home</NavLink>
```

这样，在跳转的时候才会加载资源，加速了网页的浏览速度。

