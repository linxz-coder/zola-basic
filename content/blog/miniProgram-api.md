+++
title = "小程序网络API知识"
date = 2024-12-27
+++

几乎挂载在wx对象下，如`wx.request(), wx.setStorage()`等。

wx对象是小程序宿主环境微信提供的全局对象。

# 小程序API分类

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202412270953800.png)

## 异步API 

小程序异步API支持 callback & Promise 两种调用方式:

1.  当接口参数 Object 对象中不包含 success/fail/complete 时将默认返回 Promise

2.  部分接口如 request， uploadFile 本身就有返回值，因此不支持 Promise 风格的调用方式，它们的promisify 需要开发者自行封装。

## 网络请求

发起网络请求获取服务器的数据，需要使用`wx.request（）`接口 API

注意：wx.request 请求的域名必须在微信公众平台进行配置，如果使用 wx.request 请求未配置的域名，在控制台会有相应的报错。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202412271002011.png)

合法域名必须经过备案，而且以https开头，关于[如何配置域名](https://www.bilibili.com/video/BV1LF4m1E7kB?t=444.8&p=50)

[服务器域名申请规则](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/network.html)

开发环境下，可以在`详情`-`不校验合法域名`取消。

手机环境，点击菜单-开发模式即可。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202412271121466.png)

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202412271200138.png)

## Loading代码

可以用wx.showLoading()和wx.hideLoading()的api来完成。

wx.hideLoading()在Complete回调函数中设置，指完成数据请求后隐藏Loading框。


## 示例代码：

```js
    // 显示 loading 提示框
    wx.showLoading({
      // 用来显示提示的内容
      // 提示的内容不会自动换行，如果提示的内容比较多，因为在同一行展示
      // 多出来的内容就会被隐藏
      title: '数据加载中...',
      // 是否展示透明蒙层，防止触摸穿透
      mask: true
    })

    // 如果需要发起网络请求，需要使用 wx.request API
    wx.request({
      // 接口地址
      url: 'https://gmall-prod.atguigu.cn/mall-api/index/findBanner',
      // 请求方式
      method: 'GET',
      // 请求参数
      data: {},
      // 请求头
      header: {},
      // API 调用成功以后，执行的回调
      success: (res) => {
        // console.log(res)
        if (res.data.code === 200) {
          this.setData({
            list: res.data.data
          })
        }
      },
      // API 调用失败以后，执行的回调
      fail: (err) => {
        console.log(err)
      },
      // API 不管调用成功还是失败以后，执行的回调
      complete: (res) => {
        // console.log(res)

        // 关掉 loading 提示框
        // hideLoading 和 showLoading 必须结合、配对使用才可以
        wx.hideLoading()
      }
    })
```
