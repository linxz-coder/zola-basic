+++
title = "斐波那契数列-多编程语言版"
date = 2024-11-06
+++

今天刚接触`斐波那契数列`的概念：

后面一个数是前面两个数之和。

示例：
```
[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

通过不同语言来写它的数组实现。

注意，还有很多实现，比如说`递归实现`。但是一个我想找到一个实现起来容易理解的方法，二个我想将所有值都保留，所以选了`数组实现`。

# python版本

```python
def fib_array(n):
      # 处理特殊情况
    if n <= 0:
        return []
    if n == 1:
        return [0]
    
    # 初始化数组，包含序列的前两个数
    fib = [0, 1]
    
    # 循环生成剩余的数
    for i in range(2, n):
        fib.append(fib[i-1] + fib[i-2])
        
    return fib

print(fib_array(10))
```

# JavaScript版本

```JavaScript
function fibArray(n){
    let arr = [0, 1];
    for(let i = 2; i < n; i++){
        arr[i] = arr[i - 1] + arr[i - 2];
    }
    console.log(arr);
}
fibArray(10);
```

# Java版本

```java
public class Fibonacci{
    public static void main(String[] args) {

        int n = 10;
        
        // 创建固定长度的数组
        int[] fibonacci = new int[n];

        // 设置前两个数
        fibonacci[0] = 0;
        fibonacci[1] = 1;
        
        // 生成剩余的斐波那契数
        for (int i = 2; i < n; i++) {
            fibonacci[i] = fibonacci[i-1] + fibonacci[i-2];
        }
        
        // 打印
        for (int i = 0; i < fibonacci.length; i++) {
            System.out.print(fibonacci[i] + " ");
        }
        System.out.println(); // 换行
    }
}
```

# Rust版本

```rust
fn main() {
    let n = 10;
    
    // 创建固定长度的数组，初始化为0
    let mut fibonacci = vec![0; n];
    
    // 设置前两个数
    fibonacci[0] = 0;
    fibonacci[1] = 1;
    
    // 生成剩余的斐波那契数
    for i in 2..n {
        fibonacci[i] = fibonacci[i-1] + fibonacci[i-2];
    }
    
    // 打印
    for i in 0..fibonacci.len() {
        print!("{} ", fibonacci[i]);
    }
    println!(); // 换行
}
```

## 参考资料

[斐波那契数列](https://zh.wikipedia.org/zh-hans/%E6%96%90%E6%B3%A2%E9%82%A3%E5%A5%91%E6%95%B0)
