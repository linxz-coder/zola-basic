+++
title = "webpack介绍"
date = 2024-10-30
+++

webpack是一种打包工具。

# 为什么需要打包工具？

主要是编译，把我们写的代码编译成浏览器看得懂的代码。

开发时，我们会使用框架（React、Vue），ES6 模块化语法，Less/Sass 等 css 预处理器等语法进行开发。

这样的代码要想在浏览器运行必须经过编译成浏览器能识别的 JS、Css 等语法，才能运行。

打包工具的其他功能：打包工具还能压缩代码（在生产环境下）、做兼容性处理、提升代码性能等。

# 有什么打包工具？

* Grunt
* Gulp
* Parcel
* Webpack
* Rollup
* Vite
* ...

目前市面上最流量的是 Webpack，所以我们主要以 Webpack 来介绍使用打包工具。

# webpack初始化

```
npm init -y //生成package.json
```

注意，项目名称不能叫webpack，否则不能下载webpack。

# 下载webpack

```
npm i webpack webpack-cli -D
```
`-D`指下载到开发依赖中，-D 参数是 --save-dev 的简写，用于将依赖安装到项目的 devDependencies 中，而不是 dependencies 中。这样安装的依赖只在开发环境中使用，不会在生产环境中打包。安装完成后，这些依赖会记录在 package.json 文件的 devDependencies 部分。

# 执行webpack指令

```
npx webpack ./src/main.js —mode=development //生产环境变成production就行
```

npx 是 npm 附带的一个命令运行工具，用于直接执行项目中的本地模块或从 npm 仓库临时下载并执行模块。它可以简化命令，避免全局安装依赖，常用于`一次性执行脚本`或运行开发依赖中的命令。

比如，你可以使用 npx webpack 来执行本地安装的 webpack，即使它没有全局安装。

# webpack与css资源

webpack本身只能处理js文件，不能处理css文件，需要借助loader。

不同的loader处理的资源不一样，我们可以先上[webpack-loader官方文档](https://webpack.docschina.org/loaders/)搜索，如果找不到，可以寻找github的公共资源。

打包.css资源配置参考：

```javascript
const path = require('path'); // node.js的path模块，专门用来处理路径问题

module.exports = {
    // 入口
    entry: "./src/main.js", //相对路径
    // 输出
    output: {
        // 输出路径，这里需要使用绝对路径
        path: path.resolve(__dirname, 'dist'), // __dirname是node.js中的一个全局变量，它指当前文件夹
        // 输出文件名
        filename: 'main.js',
    },
    // 加载器
    module: {
      rules: [
        // loader配置
        {
            test: /\.css$/i, //只对css文件生效，\是转义字符，$是以.css结尾，i指insensitive，不区分大小写
            use: [
                'style-loader',  //将js中css通过创建<style>标签插入到html文件的head中
                'css-loader' //将css文件编译成commonjs模块到js文件中
            ], // 执行顺序：从右到左，先css-loader再style-loader
        },
      ],
    },
    // 插件
    plugins: [
        // 插件配置
    ],
    // 模式
    mode: "development",
  };
```


## 参考资料
[尚硅谷webpack5教程](https://www.youtube.com/watch?v=SDax2729ZCY&list=PLmOn9nNkQxJHJY0qweOe4DIBWNAu6Oxrh)

[尚硅谷webpack 5课件-在线版](https://yk2012.github.io/sgg_webpack5/base/#%E4%B8%BA%E4%BB%80%E4%B9%88%E9%9C%80%E8%A6%81%E6%89%93%E5%8C%85%E5%B7%A5%E5%85%B7)

[尚硅谷webpack 5课件- github版](https://github.com/thinkcodee/webpack5-docs/tree/master)





