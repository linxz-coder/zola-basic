+++
title = "Java基本知识"
date = 2024-11-05
+++

# Java类class的规则

一个源文件中可以声明多个类，但是最多只能有一个类使用public进行声明。 且要求声明为public的类的类名与源文件名相同。

```java
public class HelloWord{
    public static void main(String[] args){
    }

    public static void main1(String[] args){
    }
}

public class Second{}
```

以上代码报错，因为有两个public的类。但可以有两个`public static...`。

# 参考资料
[尚硅谷Java视频课程](https://www.youtube.com/watch?v=P6HvqS79XXw&list=PLmOn9nNkQxJG_AbAUeyAPH3fO0i_APAM9&index=3)

[Java课件资料](https://github.com/linxz-coder/atguigu-java)

