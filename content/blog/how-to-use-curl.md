+++
title = "如何使用curl命令？"
date = 2023-10-20
+++

为了验证网页是否正常或者api是否能够成功，经常使用curl命令。

curl在mac是内置工具。

# 获取网页内容 GET

```bash
curl www.linxiaozhong.club
```

等同于以下：

```bash
curl -X GET "www.linxiaozhong.club"
```

1. 引号说明：如果有时候没响应，可以加上引号，有时候是zsh/bash无法读取该格式的原因

2. 默认的请求方法是GET，所以-X GET 通常可以省略。

# 上传需求 POST

```bash
curl -X POST -d "param1=value1&p2=value2" https://www.example.com
```

1. 这个命令会向 www.example.com 发送一个POST请求，其中包含两个参数param1和p2。

2. -X指指定的方法，这里是POST，其他还有GET, PUT, DELETE, OPTION等

3. -d指允许你发送POST请求的数据。它可以是一个字符串或一个文件。在这种情况下，它是一个字符串。

# 下载文件

```bash
curl -O https://www.example.com/path/to/file
```

# 上传文件
```bash
curl -T file.txt ftp://ftp.example.com/mydir
```

# curl 转换工具
介绍一个有用的工具[curl converter](https://curlconverter.com/javascript/)，可以把curl命令转换为几乎所有的变成语言。
