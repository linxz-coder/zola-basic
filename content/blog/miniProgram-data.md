+++
title = "小程序的数据"
date = 2024-12-26
+++

# 声明数据data:{}

所有数据都要在Page()方法的data对象中声明。

需要用双大括号写法{{}}

{{}}内部可以进行简单运算，比如算数、三元、逻辑等。但只能写表达式，不能写语句。

```javascript
// index.js
Page({
  // 在小程序页面中所需要使用的数据均来自于 data 对象
  data: {
    id: 1,
    isChecked: false,
    school: '尚硅谷',
    obj: {
      name: 'tom'
    }
  }

})

```

# 修改数据setData()

setData（） 方法有两个作用：

1． 更新数据

2． 驱动视图

## 获取数据

```javascript
console.log(this.data.num)
```

## 修改数据

```javascript
    this.setData({
      // key：是需要更新的数据
      // value：是最新的值
      num: this.data.num + 1
    })
```

## 修改对象

### 新增、修改对象属性

```javascript
   this.setData({
      // 如果给对象新增属性，可以将 key 写成数据路径的方式 a.b.c
      'userInfo.name': 'tom',
      'userInfo.age': 10
    })

```

如果修改的属性较多，可以用ES6的`展开运算符`。

后面的属性会覆盖前面的属性。

```javascript
    const userInfo = {
      ...this.data.userInfo,
      name: 'jerry',
      age: 18
    }

   this.setData({
      userInfo
    })

```

也可以利用`Object.assign()`的方法。

```javascript
// Object.assign() 将多个对象合并为一个对象
   const userInfo = Object.assign(this.data.userInfo, { name: 'jerry' }, { age: 18 })
    this.setData({
      userInfo
    })

```

### 删除对象属性

单个属性

```javascript
    // 删除单个属性
    delete this.data.userInfo.age
    // console.log(this.data.userInfo)
    this.setData({
      userInfo: this.data.userInfo
    })

```

多个属性

使用rest关键字把需要保留的参数保留下来，再把rest赋值给userInfo

```javascript
    // 删除多个属性 rest 剩余参数
    const { age, test, ...rest } = this.data.userInfo

    this.setData({
      userInfo: rest
    })

```

## 修改数组

### 展示数组

```javascript
<view wx:for="{{ list }}" wx:key="index">{{ item }}</view>
```

### 新增数组

`push方法`

```javascript
    this.data.list.push(4)
    this.setData({
      list: this.data.list
    })
```

`concat方法`

```javascript
    const newList = this.data.list.concat(4)
    this.setData({
      list: newList
    })
```

`展开运算符`

```javascript
    const newList = [ ...this.data.list, 4 ]
    this.setData({
      list: newList
    })
```

### 修改数组

```javascript
    this.setData({
      // 'list[1]': 6
      'list[0].name': 'jerry'
    })
```

### 删除数组元素

`splice方法`

```javascript
    this.data.list.splice(1, 1)
    this.setData({
      list: this.data.list
    })
```

`filter方法`

```javascript
    const newList = this.data.list.filter(item => item !== 2)
    this.setData({
      list: newList
    })
```
