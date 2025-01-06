+++
title = "用vscode开发uni-app项目"
date = 2025-01-06
authors = ["小中"]
[taxonomies]
tags = ["uni-app"]

+++

为什么用vscode？

因为HbuilderX对TS类型支持不完善，vscode更友好。

# 安装uni-app系列插件

uni-create-view

uni-helper

uniapp小程序扩展

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202501061448883.png)


# ts类型校验

## 安装类型声明文件

[github仓库地址](https://github.com/uni-helper/uni-typed)

```bash
pnpm i -D @types/wechat-miniprogram @uni-helper/uni-app-types
```

## 配置tsconfig.json

主要是加了两个types和一个`vueCompilerOptions`。

[compilerOptions报错](https://github.com/vuejs/tsconfig/issues/6)

```json
{
  "extends": "@vue/tsconfig/tsconfig.json",
  "compilerOptions": {
    "ignoreDeprecations": "5.0",
    "preserveValueImports": false,
    "importsNotUsedAsValues": "remove",
    "verbatimModuleSyntax": true,
    "sourceMap": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "lib": ["esnext", "dom"],
    "types": [
      "@dcloudio/types",
      "@types/wechat-miniprogram",
      "@uni-helper/uni-app-types"
    ]
  },
  "vueCompilerOptions": {
    "plugins": ["@uni-helper/uni-app-types/volar-plugin"]
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```
