+++
title = "Python: humanize获取文件大小"
date = 2024-11-03
+++

作用：字节转MB

我们一般获取文件大小会获取字节，比如2,980,470 字节，但如果想要更人性化的方式表示，比如xxMB, xxGB，就需要用humanize

代码如下：

```Python
import os
import humanize

# 文件路径
file_path = "/Users/lxz/Downloads/言语治疗中心三折页.pdf"

# 获取文件大小
file_size = os.path.getsize(file_path)

# 使用 humanize.naturalsize 格式化文件大小
# binary=true指除以1024，false指除以1000
readable_size = humanize.naturalsize(file_size, binary=True)

print(readable_size)
```


