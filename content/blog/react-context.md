+++
title = "什么是react的Context"
date = 2024-10-29
+++

react-context是一种组件间的通信方式，常用于【祖组件】与【后代组件】通信。

开发用得少，但是封装组件用得多，比如说react-redux。

# context示例代码

基本思路：
使用createContext()来设置MyContext，取出Provider和Consumer标签，通过标签内传递参数。

```javascript
import React, { Component } from 'react'
import './index.css'

// 创建Context对象
const MyContext = React.createContext()
const {Provider, Consumer} = MyContext

export default class A extends Component {

    state = {username: 'tom',age: 18}

  render() {
    const {username,age} = this.state

    return (
      <div className='parent'>
        <h3>我是A组件</h3>
        <h4>我的用户名是：{username}</h4>
        <Provider value={{username,age}}>
            <B />
        </Provider>
      </div>
    )
  }
}

class B extends Component {
  render() {
    return (
      <div className='child'>
        <h3>我是B组件</h3>
        <C />
      </div>
    )
  }
}

/* class C extends Component {
    // 声明接收context
    static contextType = MyContext

  render() {
    const {username,age} = this.context
    return (
      <div className='grandChild'>
        <h3>我是C组件</h3>
        <h4>我从A组件接收到的用户名是：{username}, 年龄是：{age}</h4>
      </div>
    )
  }
} */

function C() {
    return (
        <div className='grandChild'>
            <h3>我是C组件</h3>
            <h4>我从A组件接收到的用户名是：
                <Consumer>
                    {value => `${value.username}, 年龄是：${value.age}`}
                </Consumer>
            </h4>
        </div>
    )
}
```

# userContext hook方式

渲染方式：

规定了依赖元素改变，context内部的组件会重新渲染。不同于useEffect的全局重新渲染。

因此，useEffect的功能，可以考虑换成useContext。

```javascript

const ThemeContext = createContext(null);

function MyPage() {
  const [theme, setTheme] = useState('dark');
  
  return (
    <ThemeContext.Provider value={theme}>
      <Form />
      <Button onClick={() => {
        setTheme('light');
      }}>
       Switch to light theme
      </Button>
    </ThemeContext.Provider>
  );
}
```

参考的是[react的context教程](https://zh-hans.react.dev/learn/passing-data-deeply-with-context)。

