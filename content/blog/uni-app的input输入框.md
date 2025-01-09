+++
title = "uni-app的input输入框"
date = 2025-01-07
authors = ["小中"]
[taxonomies]
tags = ["uni-app"]

+++

[官方input组件文档](https://zh.uniapp.dcloud.io/component/input.html)

# maxlength属性

默认是140个字符。

一般设置为`-1`，指用户可以无限输入。

# confirm-type属性

可以改变键盘确认键。

`send`， `next`，`search`，`go`，`done`


# 按钮button知识

`plain`属性有镂空效果。

# 获取焦点和离开焦点

@focus, @blur，分别在获取焦点和离开焦点的时候触发，`e.detail.value`就是input框里面的值，可以做逻辑判断。比如用户点击输入框，出现一只小动物在输入框上。



# 表单双向绑定数据v-model

## 获取input返回值的方法 - 复杂方法

通过@input属性

```vue
<input :value="iptValue" @input="e => iptValue = e.detail.value" />

<script setup>
import {ref} from "vue";
const iptValue = ref("");
</script>
```

## 获取input返回值 - 简单方法

通过`v-model`。其实是复杂方式的语法糖。

```vue
<input v-model="iptValue" />

<script setup>
import {ref} from "vue";
const iptValue = ref("");
</script>
```

# 确认事件@confirm

需要在script标签下自定义`onConfirm`函数，在点击确定或者手机键盘中的发送键触发。

```vue
<input @confirm="onConfirm">
```

## 数组input框案例 - 近期热梗

```vue
<template>
	<view class="title">
	    近期热梗
	</view>
	
	<view class="out">	  
	  <view class="list">
	    <view class="row" v-for="(item,index) in lists" :key="item.id">
	      <view class="text">{{index+1}}. {{item.title}}</view>
	      <view class="close" @click="onClose(index)">
	        <icon type="clear" size="26"/>
	      </view>
	    </view>
	  </view>	
	  <view class="count">
	    共{{lists.length}}条梗
	  </view>	
	  <view class="comment">
	    <input type="text" 
	    placeholder="请输入热梗..."	
		v-model="iptValut"
		@confirm="onSubmit"
	    />    
	    <button size="mini" type="primary" :disabled="!iptValut.length"  
		@click="onSubmit"
	    >发布</button>
	  </view>	  
	  
	</view>
</template>

<script setup>
import {ref} from "vue";
const lists = ref([
	{id:111,title:"刚满18岁"},
	{id:222,title:"我不吃牛肉"},
	{id:333,title:"遥遥领先"},
	{id:444,title:"哪里贵了"}
])

const iptValut = ref("");

const onClose = function(index){	
	lists.value.splice(index,1);
}

const onSubmit= function(){
	lists.value.push({id:Date.now(),title:iptValut.value});	
	iptValut.value = '';
}

</script>

<style lang="scss" scoped>
.title{
  font-size: 26px;
  text-align: center;
  color:#3c3c3c;
  padding:30px 0 15px;
}
.out{
  width: 90vw;
  margin:15px auto;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  border-radius: 5px;
  padding:15px;
  box-sizing: border-box;
  .list{
	  .row{
		  padding:10px 0;
		  border-bottom:1px solid #e8e8e8;
		  display: flex;
		  justify-content: space-between;
		  align-items: center;
		  font-size: 18px;
		  color:#333;
		  .text{
			  padding-right: 5px;
			  box-sizing: border-box;
		  }
	  }
  }
  .count{
    padding:10px 0;
    font-size: 15px;
    color:#888;
    text-align:center;
  }
  .comment{
    display: flex;
    margin-top:10px;
	input{
	  flex:4;
	  background: #f4f4f4;
	  margin-right: 5px;
	  height: 100%; 
	  height: 32px;
	  border-radius: 4px;
	  padding:0 10px;
	  color:#333;
	}
	button{
	  flex:1;	  
	}
  }  
}

</style>

```
