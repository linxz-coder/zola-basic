+++
title = "什么是react组件的生命周期？"
date = 2024-10-23

+++

组件的生命周期这个概念挺懵的，我学了好几遍。

不过怎么学习，都需要这个下面这个[图片](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)（注意：这是react 17后的示意图，之前版本的生命周期略有不同）。

![react-lifecycle](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/react-lifecycle.jpg)

组件的生命周期和挂载`Mount`、卸载`Unmount`、更新`Update`有关。

# 阶段划分

## 初始化阶段：由ReactDom.render()触发 —— 

1. Constructor()
2. getDerivedStateFromProps
3. render()
4. componentDidMount()

## 更新阶段：由组件内部this.setState()或父组件重新render触发

1. getDerivedStateFromProps
2. shouldComponentUpdate()
3. render()
4. getSnapshotBeforeUpdate
5. componentDidUpdate()

## 卸载阶段：由ReactDOM.unmountComponentAtNode()触发

1. componentWillUnmount()

# 常用的生命周期

`componentDidMount` -  组件初始化状态

`componentWillUnmount` - 处理收尾的事情

`render` - 必须出现

# 代码示例

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <!-- 移动端适配的 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>3_react生命周期-新</title>
</head>
<body>
    <!-- 必须准备好一个容器 -->
    <div id="test"></div>
    
    <!-- 引入react核心库 -->
     <script type="text/javascript" src="../js/j17.0.1/react.development.js"></script>
    <!-- 引入react-dom，用于支持react操作DOM -->
     <script type="text/javascript" src="../js/j17.0.1/react-dom.development.js"></script>
    <!-- 引入babel，用于将jsx转为js -->
    <script type="text/javascript" src="../js/j17.0.1/babel.min.js"></script>

    <!-- text/babel表示里面不是js，而是jsx -->
    <script type="text/babel"> 
        // 1.创建组件
        class Count extends React.Component{
            // 构造器
            constructor(props){
                super(props)
                console.log('Count-constructor构造器调用了')
                this.state = {count:0}
            }

            add = ()=>{
                let {count} = this.state
                this.setState({count:count+1})
            }

            // 组件挂载完毕
            componentDidMount(){
                console.log('Count-componentDidMount组件挂载完毕')
            }

            // 控制组件更新的阀门-组件是否要更新
            shouldComponentUpdate(){
                console.log('Count-shouldComponentUpdate组件是否要更新')
                return true
            }

            /* 凡是带will的（除了willUnmount），都需要带上UNSAFE_标签，因为可能会在未来版本弃用。这与安全性无关。 */
            // 组件将要更新
            // UNSAFE_componentWillUpdate(){
            //     console.log('Count-componentWillUpdate组件将要更新')
            // }

            // 组件更新完毕
            componentDidUpdate(prevProps, prevState, snapshotValue){
                console.log('Count-componentDidUpdate组件更新完毕',prevProps,prevState,snapshotValue)
            }

            // 卸载组件
            unmount = ()=>{
                ReactDOM.unmountComponentAtNode(document.getElementById('test'))
            }

            // 强制更新
            force = ()=>{
                this.forceUpdate()
            }

            // 组件将要接收外界传递的新的props
            static getDerivedStateFromProps(props,state){
                console.log('Count-getDerivedStateFromProps',props,state)
                return null
                //return props // 返回的对象就是state，且不会再更新state，仅用于state完全取决于props的情况
            }
            
            // 在更新之前获取快照
            getSnapshotBeforeUpdate(){
                console.log('Count-getSnapshotBeforeUpdate')
                return 'haha'
            }
            
            render(){
                console.log('Count-render渲染调用了')
                const {count} = this.state
                return(
                    <div>
                        <h1>当前求和为：{count}</h1>
                        <button onClick={this.add}>点我+1</button>
                        <button onClick={this.unmount}>点我卸载组件</button>
                        <button onClick={this.force}>不更改任何状态的数据，强制更新！！！</button>
                    </div>
                )
            }
        } 

        // 2.渲染组件
        ReactDOM.render(<Count count={199}/>,document.getElementById('test'))
        // ReactDOM.render(<A/>,document.getElementById('test'))
    </script>
</body>
</html>
```

