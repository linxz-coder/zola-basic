+++
title = "小程序兄弟组件通信-事件总线PubSub"
date = 2025-01-03
authors = ["小中"]
[taxonomies]
tags = ["小程序"]

+++

用于兄弟组件的数据传递。

对发布-订阅模式的实现，借助[PubSubJS](https://github.com/mroderick/PubSubJS)的第三方包实现。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202501031409080.png)

# npm安装PubSubJS

```bash
npm init -y 
npm install pubsub-js
```

工具 - 构建npm

# 页面js导入包

```bash
import PubSub from 'pubsub-js'
```

# 发射数据-子组件A

```js
import PubSub from 'pubsub-js'

Component({

  data: {
    name: "Tom",
    age: 10
  },

  methods: {
    sendData(){
      PubSub.publish('myevent', {name: this.data.name, age: this.data.age})
    }
  }
})
```

# 接收数据-子组件B

```js
import PubSub from 'pubsub-js'

Component({

  data: {
    name: '',
    age: ''
  },

  methods: {
  },

  lifetimes: {
    attached(){
      PubSub.subscribe('myevent', (msg, data) => {
        this.setData({
          name: data.name,
          age: data.age
        })
      })
    }
  }
})
```
