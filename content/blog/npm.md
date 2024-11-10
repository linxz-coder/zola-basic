+++
title = "npm命令说明"
date = 2024-11-10
+++

npm是JavaScript的包管理工具，yarn也是类似的。

# 运用npm安装

```bash
npm install <package>
```

or

```bash
npm i <package>
```

## 运用yarn安装

```bash
yarn add <package>
```

## 运用cnpm安装
如果npm和yarn因为网络环境不好，安装速度过慢，可以用国内的包管理工作cnpm，用法与npm一样。

# -D的意思

简单来说，就是只将包安装在开发环境，一般用于只会用于开发环境的包，比如`实时预览`开发效果功能的包。

1. `npm install -D` 或 `npm install --save-dev`：会将依赖包添加到 devDependencies 中，适合开发环境使用的工具或库（如测试工具、打包工具等）。在生产环境中执行 npm install --production 时，这些依赖不会被安装。

2. npm install （不加 -D）：会将依赖包添加到 dependencies 中，适用于生产环境和开发环境都需要的库。无论是否指定 --production，生产环境都会安装这些依赖。
