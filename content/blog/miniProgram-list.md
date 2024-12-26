+++
title = "小程序列表渲染 List"
date = 2024-12-26
+++

`wx:for`绑定数组或对象，变量名默认`item`，下标默认`index`

建议加上`wx:key`属性，代表唯一字符串或者数字标识：

1. 字符串：代表需要遍历的 array 中item 的某个属性，该属性的值需要是列表中唯一的字符串或数字，且不能动态改变

2. 保留关键字 *this 代表在 for 循环中的 item 本身，当 item 本身是一个唯一的字符串或者数字时可以使用

# 示例代码

```
<!-- wx:key 的属性值不需要使用双大括号进行包裹，直接写遍历的数组 中 item 的某个属性 -->
<view wx:for="{{ fruitList }}" wx:key="id">{{ item.name }}</view>

<view wx:for="{{ fruitList }}" wx:key="index">{{ item.name }}</view>

<view wx:for="{{ numList }}" wx:key="*this">{{ item }}</view>

```

# index可能指下标或者key

```
<!-- 如果渲染的是数组，item：数组的每一项，index：下标 -->
<view wx:for="{{ numList }}">{{ item }} - {{ index }}</view>

<!-- 如果渲染的是对象，item：对象属性的值，index：对象属性 -->
<view wx:for="{{ obj }}">{{ item }} - {{ index }}</view>

```

# 进阶用法：修改默认item和index

利用`wx:for-item`和`wx:for-index`

```
<view wx:for="{{ obj }}" wx:key="key" wx:for-item="value" wx:for-index="key">
  {{ value }} - {{ key }}
</view>
```

# block标签

不像view标签一样是个组件，只是一个包装块，不会正式渲染。

```
<block wx:for="{{ fruitList }}" wx:key="id" wx:for-item="fruitItem" wx:for-index="i">
  <view>名字：{{ fruitItem.name }}</view>
  <view>价格：{{ fruitItem.price }}</view>
</block>

```
