+++
title = "什么是react的refs？"
date = 2024-10-25
+++

react组件实例有三大属性state, props, refs。 state不必说，状态管理，props是数据传送，唯有ref不是很清楚。

使用方式分别是this.state, this.props, this.refs。

# 为什么有refs？
我们经常会在html做输入框，或者叫input框。

```html
<input placeholder="点击输入数据"/>
```

我们如何获取输入框的值，照理来说就是xxx.value，对吗？但是，我们怎么知道你要获取的是哪个输入框呢？这时候就需要`id`了。

```html
<input id="input1" placeholder="点击输入数据"/>
```

我们要怎么获取它的值呢？自然要用`Dom`了。

```javascript
const input = document.getElementById('input1')
console.log(input.value)
```

这样就能够拿到了。等等，我们用react的目的不就是有虚拟DOM，不用操作真实DOM吗？所以，一定有其他方法。这就是今天介绍的`refs`了。

# 字符串形式的ref（已过时）
我们可以用ref属性获取input的值。

```html
<input ref='input1' placeholder="点击输入数据"/>
```

获取出来的值：

```javascript
console.log(this.refs.input1) //获取按钮
const {input1} = this.refs //解构赋值
console.log(input1.value)
```

注意，每个ref都是refs对象里面的key-value值，即this.refs={input1:input, button1:button...}

# 回调函数形式的ref
有字符串形式的ref好像已经够了，为什么需要有回调函数形式的呢？
因为react官方已经废弃掉字符串形式了，参见[过时 API：String 类型的 Refs](https://zh-hans.legacy.reactjs.org/docs/refs-and-the-dom.html)，官方说明会造成一些[问题](https://github.com/facebook/react/pull/8333#issuecomment-271648615)，问题讨论得比较复杂，简单来说，调用会出现一些`效率问题`。

取代字符串形式的ref有两种方法，一种是回调函数形式的ref，一种是createRef方法。

我们看看回调函数怎么写。

回调函数有三大特点：1. 你定义的函数；2. 你没有调用；3. 最终被他人调用。

```html
<input ref={(currentNode)=>{console.log(currentNode.value)}} placeholder="点击输入数据"/>
```

我们在ref里面随便传入一个参数，不管是a还是我写的`currentNode`，console.log之后就会发现是当前节点, 这个时候.value就可以拿到值了。

简单的写法可以是这样的：

```html
<input ref={c=>console.log(c.value)} placeholder="点击输入数据"/>
```

怎么在function里面拿到它的值呢？首先要将该input框抽出来。

```html
<input ref={c=>this.selectNumber=c} placeholder="点击输入数据"/>
```

这里我们在class component里面定义了一个selectNumber的值，让它等于抽出来的input，这里把currentNode简写成c。

那么我们可以在其他函数里面利用input的值，像这样：

```javascript
function addNumber(){
  const {value} = this.selectNumber
}
```

# createRef形式的ref
下次再分享。

## 参考资料
1. [尚硅谷的react教程中Ref部分](https://www.youtube.com/watch?v=AKKc5Z6WFxc&list=PLmOn9nNkQxJFJXLvkNsGsoCUxJLqyLGxu&index=28)。

2. [我的ref教程代码](https://github.com/linxz-coder/react-basics/blob/main/08_%E7%BB%84%E4%BB%B6%E5%AE%9E%E4%BE%8B%E4%B8%89%E5%A4%A7%E5%B1%9E%E6%80%A73_refs/2_%E5%9B%9E%E8%B0%83%E5%87%BD%E6%95%B0%E5%BD%A2%E5%BC%8F%E7%9A%84ref.html)



