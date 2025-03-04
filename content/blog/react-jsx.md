+++
title = "什么是jsx语法-react知识"
date = 2024-10-20
+++

我总是觉得vue比react容易学习，一个理由就是vue不用重新学习一套语法，还是html和js一把梭，但是react需要学习一个新的语法，叫做jsx。

# 什么是jsx?

全称JavaScript XML，XML早期用于存储和传输数据，后来用json取代。

![XML](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202410200749670.png)

# jsx语法规则

```JavaScript
 const VDOM = (
    <div>
        <h2 className='title' id={myId.toLowerCase()}>
            <span style={{color:'white', fontSize:'20px'}}>{myData.toLowerCase()}</span>
        </h2>
        <input type="text" value="hello react"/>
    </div>
        )
```

1. 定义虚拟DOM时，不要写引号。因为会被当做字符串string处理。

2. 标签中混入js表达式时要用{} 

3. 样式类名指定不要用class，要用`className` 

4. 内联样式要用双括号`style={{key:value}}`的形式去写 

5. 虚拟DOM只能有一个根标签，比如<></>或者\<div>\<div/> 

6. 标签必须闭合 

7. 标签首字母：

 - 若小写字母开头，比如\<input>，则将标签转为html同名元素，若html中无该元素，则报错。  

 - 若大写字母开头，比如\<Search/>，react就去渲染对应的组件，若组件没有定义，则报错。

 ## 大括号{}里面只能放表达式，不能放js代码

 一定注意区分：`js语句(代码)`与`js表达式`

 ### 表达式：一个表达式会产生一个值，可以放在任何一个需要值的地方

 下面这些都是表达式：

 (1).a

 (2). a+b

 (3). demo(1)

 (4). arr.map()

 (5). function test () {}

 ### 语句(代码)：

 下面这些都是语句(代码)：

 (1).if(){}

 (2).for(){}

 (3).switch(){case:xxxx}

 # jsx如何遍历？

 代码示例：
 
 ```JavaScript
users.map((userObj) => {
    return (
      <div key={userObj.id} className="card">
          <a rel="noreferrer" href={userObj.html_url} target="_blank">
            <img alt="avatar" src={userObj.avatar_url} style={{width: '100px'}}/>
          </a>
          <p className="card-text">{userObj.login}</p>
      </div>
    )
})
```

核心思想：使用map方法遍历对象或者数组，注意遍历时需要指定id或者index来作为唯一值。

# jsx如何做条件判断？

代码示例：

```JavaScript
{
    isFirst ? <h2>欢迎使用，输入关键字搜索</h2> :
    isLoading ? <h2>Loading...</h2> :
    err ? <h2 style={{color:'red'}}>{err}</h2> :
    users.map((userObj) => {
        return (
          <div key={userObj.id} className="card">
              <a rel="noreferrer" href={userObj.html_url} target="_blank">
                <img alt="avatar" src={userObj.avatar_url} style={{width: '100px'}}/>
              </a>
              <p className="card-text">{userObj.login}</p>
            </div>
        )
    })
}
```

代码解释：
以上代码是展示搜索结果的一个示例。
如果是第一次使用，显示欢迎语；如果搜索中，显示Loading...，如果错误，显示错误信息；否则，则显示用户的信息。
这里关键是，`jsx不能用if语句`，要用表达式?和:来进行判断。
