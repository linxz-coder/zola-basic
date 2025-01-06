+++
title = "uni-app的page.json介绍"
date = 2025-01-03
authors = ["小中"]
[taxonomies]
tags = ["uni-app"]

+++

# 各文件的功能

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202501061114224.png)

page.json主要用来配置页面路由、导航栏、tabBar等页面信息。

注意：图标属于静态资源，必须放到`static`文件夹。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202501061210135.png)

# 代码例子：

```json
{
	"pages": [ //pages数组中第一项表示应用启动页，参考：https://uniapp.dcloud.io/collocation/pages
		{
			"path": "pages/index/index",
			"style": {
				"navigationBarTitleText": "首页"
			}
		},
		{
			"path" : "pages/my/my",
			"style" : 
			{
				"navigationBarTitleText" : "我的"
			}
		}
	],
	"globalStyle": {
		"navigationBarTextStyle": "white",
		"navigationBarTitleText": "uni-app",
		"navigationBarBackgroundColor": "#27ba9b",
		"backgroundColor": "#27ba9b"
	},
	"tabBar": {
		"selectedColor": "27ba9b",
		"list": [
			{
				"pagePath": "pages/index/index",
				"text": "首页",
				"iconPath": "/static/tabs/home.png",
				"selectedIconPath": "/static/tabs/home-selected.png"
			},
			{
				"pagePath": "pages/my/my",
				"text": "我的",
				"iconPath": "/static/tabs/my.png",
				"selectedIconPath": "/static/tabs/my-selected.png"
			}
		]
	},
	"uniIdRouter": {}
}

```
