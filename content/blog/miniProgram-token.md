+++
title = "小程序的token处理方法"
date = 2024-12-31
+++

可以用config.js, 本地数据Storage, 或者请求服务端获得的方式。服务端方式安全些。

示例用`config.js`模式。

# 新建config.js

根目录下创建，把token输进去：

```js
module.exports = {
  token: 'your-token'
}

```

# 使用token

引入模块并使用

```js
const config = require('../../config')

//使用token
githubToken: config.token,
```

