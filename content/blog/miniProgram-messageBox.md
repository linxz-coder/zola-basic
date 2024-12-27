+++
title = "小程序API-对话框和提示框"
date = 2024-12-27
+++

wx.showModal（）：模态对话框，常用于询问用户是否执行一些操作例如：询问用户是否退出登录、是否删除该商品等

wx.showToast（）：消息提示框，根据用户的某些操作来告知操作的结果例如：退出成功给用户提示，提示删除成功等

注意，showModal()是异步函数，需要用到`async+await`的方法。

示例代码：

```js
 // 删除商品
  async delHandler () {

    // showModal 显示模态对话框
    const { confirm } = await wx.showModal({
      title: '提示',
      content: '是否删除该商品 ?'
    })

    if (confirm) {
      // showToast 消息提示框
      wx.showToast({
        title: '删除成功',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.showToast({
        title: '取消删除',
        icon: 'error',
        duration: 2000
      })
    }

  }
```
