+++
title = "自定义组件样式隔离"
date = 2024-12-31
+++

默认情况下，自定义组件样式是隔离的，即只受自身wxss的影响。

有时候，我们希望样式使用者的样式能够影响组件。

需要样式隔离选项`styleIsolation`，有三个选项。

isolated: 互不影响，默认值

apply-shared； 父影响子

shared: 互相影响，也会影响其他设置了apply-shared和shared的组件。

# 代码示例

自定义组件的js文件中。

```js
Component({
	options: {
		styleIsolation: "shared" 
	}
})
```

# 外部样式类

如果想修改自定义组件样式，并摈除样式嵌套影响，可以使用外部样式类。

如果styleIsolation属性是`shared`，那么externalClasses会失效。

```js
Component({
	externalClasses: [],
})
```

