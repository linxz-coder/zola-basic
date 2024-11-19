+++
title = "Java运算符"
date = 2024-11-19
+++

# 算术运算符

a++：先运算（或赋值），后自增1
++a：先自增1，后运算（或赋值）

# 逻辑运算符

&: 逻辑与，`且`的关系
&&: 短路与

|：逻辑或
||：短路或

!: 非

^：异或，追求的是`异`；即a和b真假不一样时为true，如果一样时则为false

关系：

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411191624077.png)

```java
/*
逻辑运算符

1. & && | || ! ^

2.说明
① 逻辑运算符针对的都是boolean类型的变量进行操作
② 逻辑运算符运算的结果也是boolean类型。
③ 逻辑运算符常用于条件判断、循环结构中

*/

public class LogicTest {
    public static void main(String[] args) {
        /*
        区分 & 和 &&

        1、相同点：两个符号表达的都是“且”的关系，只有当符号两边类型均为true时，结果才为true

        2、执行过程：
            1）如果符号左边是true，则&、&&都会执行符号右边的操作；
            2）如果符号左边是false，则 & 会继续执行符号右边的操作，而
                                   && 不会执行符号右边的操作
        3、开发中，我们推荐使用&&
        */

        // &与
        boolean b1 = true;
        b1 = false;
        int num1 = 10;

        if(b1 & (num1++ > 0)){
            System.out.println("床前明月光");
        }else{
            System.out.println("我叫郭德纲");
        }

        System.out.println("num1 = " + num1);

        // && 短路与
        boolean b2 = true;
        b2 = false;
        int num2 = 10;
        //当b2为false时，后面的运算不会执行
        if(b2 && (num2++ > 0)){
            System.out.println("床前明月光");
        }else{
            System.out.println("我叫郭德纲");
        }

        System.out.println("num2 = " + num2);

        //**************************************
        /*
        区分 | 和 ||

        1、相同点：两个符号表达的都是“或”的关系，只要符号两边类型存在true时，结果就为true

        2、执行过程：
            1）如果符号左边是false，则|、||都会执行符号右边的操作；
            2）如果符号左边是true，则 | 会继续执行符号右边的操作，而
                                   || 不会执行符号右边的操作
        3、开发中，我们推荐使用||
        */
    }
}
```

# 赋值运算符

```java
Java赋值运算符

```java
/*
赋值运算符：
1. = += -= *= /= %=

2.说明：
① 当两侧数据类型不一致，可以使用`自动类型转换`或者`强制类型转换`。
② 支持连续赋值
③ += -= *= /= %=操作，不会改变变量本身的数据类型。
*/

public class SetValueTest {
    public static void main(String[] args) {
        int i = 5;
        long l = 10; //自动类型提升 int -> long
        byte b = (byte)i; //强制类型转换 int -> byte

        //连续赋值
        int a2,b2;
        a2 = b2 = 10;
        System.out.println("a2 = " + a2 + ", b2 = " + b2);

        int a3=10, b3=20;
        System.out.println("a3 = " + a3 + ", b3 = " + b3);

        //+=使用
        int m1 = 10;
        m1 += 5; //类似m1 = m1 + 5
        System.out.println("m1 = " + m1);

        byte by = 10;
        by += 5; //by=by+5编译报错，应为`by=byte(by+5)`才能成功；而by+=5成功
        System.out.println("by = " + by);
    }
}

```
```
