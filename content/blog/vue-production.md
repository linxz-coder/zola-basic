+++
title = "vue应用如何上线"
date = 2024-09-21
+++

## 安装依赖，让系统可以辨认.vue文件
```bash
npm install @vue/runtime-core --save-dev
```

## 配置shims-vue.d.ts文件
在项目的 src 目录下，创建或检查是否有一个 shims-vue.d.ts 文件。确保它包含以下内容：
```typescript
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
```
这个文件告诉 TypeScript 如何处理 .vue 文件。

## 构建应用
```bash
npm run build
```

这会生成一个 dist 目录，里面包含了所有的静态资源，可以直接部署到服务器上。

## 本地预览
```bash
npm install -g serve
serve -s dist
```
这样，就可以通过 http://localhost:3000/ 访问你的应用了。

## 上传dist目录到服务器
例如：
```bash
scp -r your-path/dist root@IP:/var/www/dist
```
将本地dist目录上传到服务器的/var/www/dist目录下。

踩坑注意：请勿上传到`root`目录下，这样会导致nginx因权限不够无法访问到dist目录。

## 配置nginx

### 找到nginx的配置文件
```bash
sudo nginx -t
```
### 打开配置文件
```bash
vim /etc/nginx/nginx.conf
```
### 在http模块中添加以下配置
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/dist;
    index index.html;
}
```

### 重启nginx
```bash
sudo systemctl restart nginx
```

打开浏览器，输入你的域名，就可以看到你的vue应用了。


## 参考
https://cli.vuejs.org/zh/guide/deployment.html#%E4%BD%BF%E7%94%A8-history-pushstate-%E7%9A%84%E8%B7%AF%E7%94%B1

https://blog.csdn.net/weixin_49577940/article/details/118181242
