+++
title = "如何计算n天后是周几？"
date = 2024-11-21
+++

主要涉及%7的计算，用java代码演示：

```java
//今天是周四，10天以后是周几？

int weekDay = 4;

weekDay += 10;

weekDay %= 7;

System.out.println("今天是周四，10天以后是周" + ((weekDay == 0) ? "日" : weekDay));
```
