+++
title = "如果使用wordpress的api来自动上传文章？"
date = 2024-09-21
+++

## 前言
通常，我们在wordpress网站上写文章，都是在后台写的。

但是，后台系统因为网络等原因不能满足我的需要，总的来说就是不够快不够方便。（`程序员的偏见-后台不是给我们准备的！`）

如果我们想要在本地写文章，然后上传到wordpress网站上，就需要用到wordpress的api了。

wordpress的api是基于restful的，所以使用起来非常方便。

以下是用curl命令来操作wordpress的api的例子，我一般是用postman这个app，也非常方便。

## 新增文章
```bash
curl -X POST https://your-wordpress.com/wp-json/wp/v2/posts \
--user admin:"your-password" \
-H "Content-Type: application/json" \
-d '{
  "title": "#新帖标题",
  "content": "这是新帖的内容。",
  "status": "publish"
}'
```

注意，密码不是wordpress的后台密码，是应用程序密码。

获取密码：
在wordpress后台，打开’用户’-‘个人资料’，拉到最下面，输入密码名称（随便取），点击’新增的应用程序密码’即可。

## 获取文章
```bash
curl -X GET https://your-wordpress.com/wp-json/wp/v2/posts
```

## 更新文章
```bash
curl -X POST https://your-wordpress.com/wp-json/wp/v2/posts/id \
--user admin:"your-password" \
-H "Content-Type: application/json" \
-d '{
  "title": "#新帖标题",
  "content": "这是新帖的内容。",
  "status": "publish",
  "featured_media": 1125
}'
```

关键是要找出文章的id，可以在获取文章的时候找到。

## 删除文章
```bash
curl -X DELETE https://your-wordpress.com/wp-json/wp/v2/posts/id
```

同样，关键是要找出文章的id，可以在获取文章的时候找到。

## 关于题图
也可以说是特色图片，这个是文章的一个属性“feature_media"，可以用来显示在文章列表中。我在【更新文章】中已经提到了, 1125是图片的id。你以往上传的图片都会在wordpress的媒体库中找到,有一个唯一的id。

## 关于图片
由于我用的自动化工具`Publish Markdown`，它会自动上传图片，所以我就没有研究。
不过，我发现所有wordpress的图片都是在https://your-wordpress.com/wp-content/uploads文件夹下面，所以应该可以用curl命令上传图片。思路是先upload到对应月份的文件夹，然后在扒下来，按照这个格式放到文章里面。

看所有的`wordpress`图片资源。
```bash
curl -X GET https://your-wordpress.com/wp-json/wp/v2/media
```

## 其他api知识
### 查看更多文章
默认GET方法只会返回10个文章，如果想要更多，可以用`per_page`参数。
```bash
curl -X GET https://your-wordpress.com/wp-json/wp/v2/posts?per_page=100
```
这样就会返回100个文章。

### 只要求返回某些字段?_fields=
```bash
curl -X GET https://your-wordpress.com/wp-json/wp/v2/posts?_fields=authod.id,excerpt,title,link
```
这样就只会返回这些字段，特别简洁好用。

### 文章排序
```bash
curl -X GET https://your-wordpress.com/wp-json/wp/v2/posts?orderby=title&order=asc
```
默认是按照时间排序的，如果想要按照标题排序，就可以这样。

### 搜索文章
```bash
curl -X GET https://your-wordpress.com/wp-json/wp/v2/posts?search=关键词
```

### 获取分类文章
```bash
curl -X GET https://your-wordpress.com/wp-json/wp/v2/posts?categories=1
```
这样就会返回分类为1的文章。如果分类是0就是未分类。

### 获取标签文章
```bash
curl -X GET https://your-wordpress.com/wp-json/wp/v2/posts?tags=1
```
这样就会返回标签为1的文章。

## 参考文章
这是官方的文档：
https://developer.wordpress.org/rest-api/reference/posts/

## 参考视频
https://www.youtube.com/watch?v=jo1wphDCu3k
https://www.youtube.com/watch?v=XeNm_gxGuY8
