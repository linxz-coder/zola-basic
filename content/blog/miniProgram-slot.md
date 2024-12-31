+++
title = "小程序组件插槽-slot"
date = 2024-12-31
+++

作用：标签之间的内容默认不展示，如果需要展示，则需要`slot`节点。

比如下面的文字内容不展示：

```wxml
<custom-checkbox position="right">
	内容不会展示
</custom-checkbox>
```

可以比作手机卡：

自定义组件就是读卡器，slot就是里面的卡槽。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202412311416628.png)

# 单slot代码

## 组件定义

```wxml
<view>
	<slot/>
</view>
```

## 使用

```wxml
<custom>加上slot后这里会显示</custom>
```


# 一个组件默认一个插槽slot

如果需要扩展，要声明`multipleSlots`，

同时需要给slot添加`name`属性区分不同的slot，所以也称为`具名插槽`。



# 多slot - 具名插槽

## 自定义组件js - 注册slots

```js
Component({
	options: {
		multipleSlots: true
	}
})
```

## 组件定义

```wxml
<view>
	<slot name="slot-top"/>

	<!-- 默认插槽 -->
	<view><slot/></view>

	<slot/ name="slot-bottom">
</view>
```

# 组件使用

```wxml
<custom>

<text slot="slot-top">顶部slot内容</text>

默认slot后这里会显示

<text slot="slot-bottom">底部slot内容</text>

</custom>
```
