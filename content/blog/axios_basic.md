+++
title = "axios基础知识"
date = 2024-09-27
+++

# axios有什么用？
axios是一个基于promise的HTTP客户端，可以用在浏览器和node.js中。主要用来访问api接口，主要的方法有四种：GET、POST、PUT、DELETE。

GET方法用来获取数据，POST方法用来提交数据，PUT方法用来更新数据，DELETE方法用来删除数据。

# html使用
## 在html中引入axios
```html
<head>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</head>
```

## 在网页发送请求
```html
<script>
 // 获取按钮
const btns = document.querySelectorAll('button');

// 第一个
btns[0].onclick = function() {
    // 发送 AJAX 请求
    axios({
        //请求类型
        method: 'GET',
        //请求地址
        url: 'http://localhost:3000/posts',
        //请求参数
        params: {
            id: 1,
        }
    }).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    });
}
</script>
```

## 默认配置
使用`axios.defaults`可以设置默认配置，这样在发送请求时就不用每次都写一遍配置了。

```html
 <script>
    // 获取按钮
    const btns = document.querySelectorAll('button');
    btns[0].onclick = function() {
        // 默认配置
        axios.defaults.method = 'GET'; // 默认请求方式为GET
        axios.defaults.baseURL = 'http://localhost:3000'; // 默认请求地址
        axios.defaults.params = { // 默认请求参数
            id: 1,
        }
        // 设置默认超时时间
        axios.defaults.timeout = 3000; // 默认超时时间为3s

        axios({
            url: '/posts'
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }

</script>
```

# 关于调试
## 查看网络请求
POST, PUT, DELETE的请求不会显示出来，需要打开`Network`面板，然后打钩`保留日志`和`停用缓存`，这样就可以看到请求的详细信息了。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/20240927152005.png)

## 查看请求头

在`Network`面板中，点击请求，然后点击`Headers`（标头），勾选`原始`,就可以看到请求头的详细信息了，可以看出是`GET`请求。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/20240927152234.png)

# axios的github地址
基本上所有的用法都在这里，可以作为`工具书`查阅。

[axios](https://github.com/axios/axios?tab=readme-ov-file#request-config)
