+++
title = "如何在python文件加log？"
date = 2023-11-13
+++

运用logging模块：

```python
import logging
from datetime import datetime

 # 设置日志记录器，才会在控制台显示，否则只显示WARNING以上级别的日志
    logging.basicConfig(level=logging.INFO, format='%(message)s')
    # %（message)s 代表日志本身
    # 输出更具体的时间：logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
   
    # 获取日志记录器
    logger = logging.getLogger(__name__)
    
    # 记录消息
    logger.info(f'程序运行于: {datetime.now()}')
```

以上代码会在控制台输出`INFO`级别的日志：

```bash
openai/argparse  > python run.py hello

hello world

程序运行于: 2023-11-13 18:07:56.924422
```
