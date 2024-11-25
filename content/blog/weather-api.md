+++
title = "查询天气api - openweather"
date = 2024-11-25
+++

openweathermap.org

[api网址](https://openweathermap.org/api)


[文档](https://openweathermap.org/current)


刚开通，一个小时才能用。否则会返回401错误。
[stackoverflow-401](https://stackoverflow.com/questions/33091948/using-openweathermap-api-gives-401-error)

注意：`需要输入账号、密码，获取自己的api-key`。

格式：

```
https://api.openweathermap.org/data/2.5/weather?appid={your-api-key}&&units=metric&lang=zh_cn&q=London
```

units=metric代表摄氏度，lang是语言，q是城市
