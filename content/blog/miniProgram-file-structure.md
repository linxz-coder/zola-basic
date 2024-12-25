+++
title = "小程序文件结构"
date = 2024-12-24
+++

# 主体文件

`app js` 入口
`app json` 配置
`app wxss` 样式

# 页面文件

pages文件夹下，每个页面对应一个文件夹

# 配置文件

app.json: 全局属性配置，页面路由

页面.json：当前页面属性

project.config.json: 项目的属性和开发者个人信息

sitemap.json: 是否允许微信索引，提高被搜索到的概率

## app.json配置

### pages字段

数组第一项是首页，不管什么名字。比如"pages/index/index"

也可以手动指定：

```json
"entryPagePath": "pages/index/index"
```

### window字段

设置状态栏、导航条、标题、窗口背景色。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202412241633451.png)

注意：`窗口`即下拉窗口，默认不展示的，用户下拉刷新后展示。

导航条配置实例：

```json
  "window": {
    "navigationBarTitleText": "凡学子",
    "navigationBarBackgroundColor": "#f3514f", //导航条颜色
    "enablePullDownRefresh": true, //支持下拉窗口
    "backgroundColor": "#efefef", //下拉窗口背景色，这里设置成灰色
    "backgroundTextStyle": "dark"  //默认页是暗色
  },
```

[window配置项文档](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#window)

### tabBar字段

定义小程序顶部、底部的tab栏，实现页面之间的快速切换

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202412241645782.png)

tab 按数组的顺序排序，list 配置最少2个、最多 5个tab。

[tabbar官方文档](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#tabBar)

示例代码

```json
  "tabBar": {
    "selectedColor": "#f3514f",
    "color": "#666",
    "backgroundColor": "#efefef",
    "borderStyle": "white",
    "position": "bottom",
    "list": [
      {
        "text": "首页",
        "pagePath": "pages/index/index",
        "iconPath": "/assets/tabbar/index.png",
        "selectedIconPath": "/assets/tabbar/index-active.png"
      },
      {
        "text": "分类",
        "pagePath": "pages/cate/cate",
        "iconPath": "/assets/tabbar/cate.png",
        "selectedIconPath": "/assets/tabbar/cate-active.png"
      },
      {
        "text": "购物车",
        "pagePath": "pages/cart/cart",
        "iconPath": "/assets/tabbar/cart.png",
        "selectedIconPath": "/assets/tabbar/cart-active.png"
      },
      {
        "text": "我的",
        "pagePath": "pages/profile/profile",
        "iconPath": "/assets/tabbar/profile.png",
        "selectedIconPath": "/assets/tabbar/profile-active.png"
      }
    ]
  },
```

## 页面配置

几乎与window属性一致，不需要额外指定window字段，出现一样的配置，会覆盖window的配置。

[页面配置](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/page.html)


# 渲染模式 skeyline -> WebView

`skyline`渲染还不成熟，先用`WebView`。

需要改app.json：

把render, renderoptions和components三个配置项去掉即可。

[参考视频](https://www.bilibili.com/video/BV1LF4m1E7kB?t=282.7&p=9)


# 如何新建页面

## 方法一：右键新建

pages文件夹右键-新建文件夹-新建Page，这样会添加四个基本文件。

注意，新建Page不用加后缀。

## 方法二： app.json添加

直接在pages数组下添加即可:

```json
"pages/profile/profile"
```

