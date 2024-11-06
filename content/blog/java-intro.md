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



