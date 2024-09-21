+++
title = "如何用flex布局-横向竖向排列"
date = 2024-09-21
+++

注意，这里的flex布局用的是tailwindcss的flex类，而不是css的flex属性。道理是一样的，只是写法不同。

<br>

## 横向排列

### 从左到右排列：flex flex-row
实践下来，发现flex flex-row是默认的，不用写也可以。

```html
<div class="flex flex-row">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

### 从右到左排列：flex flex-row-reverse
```html
<div class="flex flex-row-reverse">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

### 居中排列：flex justify-center
```html
<div class="flex justify-center">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

### 两端对齐：flex justify-between
```html
<div class="flex justify-between">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```
<br>

## 竖直排列
### 从上到下排列：flex flex-col
```html
<div class="flex flex-col">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

### 从下到上排列：flex flex-col-reverse
```html
<div class="flex flex-col-reverse">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

<br>

## 自动扩展大小：flex-1
```html
 <div class='flex'>
    <div class='flex-1'>01</div>
    <div class='flex-1'>02</div>
    <div class='flex-1'>03</div>
 </div>
```

<br>

## 参考链接
https://tailwindcss.com/docs/flex-direction
https://tailwindcss.com/docs/flex#flex-1
