+++
title = "小程序组件样式注意事项"
date = 2024-12-31
+++

1. 建议使用class选择器，不允许使用标签选择器、id选择器和属性选择器，因为与全局样式冲突

标签选择器，比如text, view标签

id选择器，比如id属性

属性选择器，指标签内的所有属性，比如a[href]{}，或者[id=content]{}

2. 子选择器的父组件只能是view

如果是text包住text标签，以下设置不成功。

```css
.content > .label {
	color: green
}
```

3. 自定义组件会继承父组件的样式

比如color和style

以下view组件定义的样式，也会被继承到custom组件中。

```wxml
<view class="custom">
	<custom />
</view>
```

4. 全局样式，组件所在页面的样式都对自定义组件无效。

比如app.wxss就对custom组件无效。


5. 不建议全局使用标签选择器，因为会影响所有页面和自定义组件。

6. 后代选择器尽量精确比如.son .test，不要只是.son，不然父代选择器容易受到影响

