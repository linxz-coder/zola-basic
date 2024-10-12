+++
title = "Python：如何使用urlsplit分解url？"
date = 2023-11-14
+++

urlsplit是个分解url的工具，下面介绍使用方法：

```Python
from urllib.parse import urljoin, urlsplit
url = "www.fly.faa.gov/adv/adv_spt.jsp?hi#no"
us = urlsplit(url.lower())
print('us', us)
print('hostname', us.hostname)
```

输出结果：

```Python
us SplitResult(scheme='https', netloc='www.fly.faa.gov', path='/adv/adv_spt.jsp', query='hi', fragment='no')

hostname www.fly.faa.gov
```


