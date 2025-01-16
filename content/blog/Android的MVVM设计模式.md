+++
title = "Android的MVVM设计模式"
date = 2025-01-16
authors = ["小中"]
[taxonomies]
tags = ["安卓"]

+++

Model-View-ViewModel，与苹果的`MVC`模式基本一致。

怎么做？

# 创建一个ViewModel的Class文件

继承ViewModel()

注意：只改变private变量，即_count，将count暴露出去

```kt
class CounterViewModel: ViewModel() {
    private val _count = mutableStateOf(0)

    //Expose the count as an immutable state
    val count: MutableState<Int> = _count

    fun increment(){
        _count.value++
    }

    fun decrement(){
        _count.value--
    }
}
```

# 引用ViewModel的变量

在`MainActivity`里面引用变量

在`setContent`里面声明viewModel

```kt
setContent {
    val viewModel: CounterViewModel by viewModels()

    CounterViewModelTheme {
        Surface (modifier = Modifier.fillMaxSize()) {
            TheCounterApp(viewModel)
        }
    }
}
```

在UI界面中使用

用`viewModel.count.value`的形式获取变量。

```kt
@Composable
fun TheCounterApp(viewModel: CounterViewModel){

    Column(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = "Count: ${viewModel.count.value}",
            fontSize = 24.sp,
            fontWeight = FontWeight.Bold
        )
        Spacer(modifier = Modifier.height(16.dp))
        Row{
            Button(onClick = {viewModel.increment()}) {
                Text("Increment")
            }
            Button(onClick = {viewModel.decrement()}) {
                Text("Decrement")
            }
        }

    }
}
```

# Model的部分

创造一个class文件`CounterModel`。

数据是一个data class

```kt
data class CounterModel (
    var count: Int
)
```

创建一个Repository类

```kt
class CounterRepository(){
    private var _counter = CounterModel(0)

    fun getCounter() = _counter

    fun incrementCounter(){
        _counter.count++
    }

    fun decrementCounter(){
        _counter.count--
    }
}
```

在`viewModel`中使用

```kt
class CounterViewModel(): ViewModel() {
    private val _repository: CounterRepository = CounterRepository()
    private val _count = mutableStateOf(_repository.getCounter().count)

    //Expose the count as an immutable state
    val count: MutableState<Int> = _count

    fun increment(){
        _repository.incrementCounter()
        _count.value = _repository.getCounter().count
    }

    fun decrement(){
        _count.value--
        _repository.decrementCounter()
        _count.value = _repository.getCounter().count
    }
}
```
