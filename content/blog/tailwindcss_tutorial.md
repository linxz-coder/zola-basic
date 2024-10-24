+++
title = "如何安装Tailwind CSS？"
date = 2024-09-30

+++

# Tailwind CSS 教程（实现步骤）

1. terminal进入根目录，initial文件
   ```
   npm init
   ```
   结束后将创建package.json文件  
   <br>

2. 安装TailWind CSS
    ```
   npm install tailwindcss --save
   ```
   <br>
3. 创建main.css，给代码：
    ```
   @tailwind base;
   
    @tailwind components;
   
    @tailwind utilities;
   ```
   <br>
4. 创建tailwind.config.js 
    ```
    npx tailwindcss init
   ```
   <br>
5. tailwind.config.js 的 plugins 加上：
    ```
    require('tailwindcss'),
    require('autoprefixer'),
   ```
   <br>
6. output CSS
    ```
    npx tailwindcss build main.css -o output.css
   ```
   <br>
7. 实时更新watch
   package.json里面的"scripts"填入:
    ```
    tailwindcss build main.css -o output.css
    ```
   <br>
8. 实现实时更新  
   terminal里面输入：
    ```
    npm run watch  
    ```
   <br>