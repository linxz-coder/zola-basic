+++
title = "Jave位运算符"
date = 2024-11-21
+++

## 怎么区分&和|是位运算符，还是逻辑运算符？

答：看左右两边的数。

数字，位运算符；布尔值，逻辑运算符。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411202239413.png)

```java
/*
位运算符

1. << >> >>> & | ^ ~

2.说明：

① << >> >>> & | ^ ~：针对数值类型的变量或常量进行运算，运算的结果也是数值；
②
<< ：左移符号。在一定范围内，每向左移动一位，结果就在原有的基础上*2。对于正数负数都适用。
>> ：右移符号。在一定范围内，每向右移动一位，结果就在原有的基础上/2。对于正数负数都适用。注意：不能整除，向下取整。

3.面试题：用计算机觉得高效的方式计算2*8？低效方式8+8，或2+2+2+2+2+2+2+2
高效：2 << 3 或 8 << 1
*/

public class BitTest {
    public static void main(String[] args) {
        int num1 = 7;
        System.out.println("num1 << 1 : " + (num1 << 1)); //14(7*2)
        System.out.println("num1 << 2 : " + (num1 << 2)); //28(7*2*2)
        System.out.println("num1 << 3 : " + (num1 << 3)); //56(7*2*2*2)
        System.out.println("num1 << 28 : " + (num1 << 28));
        System.out.println("num1 << 29 : " + (num1 << 29)); //过犹不及


        int num2 = -7;
        System.out.println("num2 << 1 : " + (num2 << 1)); //-14(-7*2)
        System.out.println("num2 << 2 : " + (num2 << 2)); //-28(-7*2*2)
        System.out.println("num2 << 3 : " + (num2 << 3)); //-56(-7*2*2*2)
    }
}
```
