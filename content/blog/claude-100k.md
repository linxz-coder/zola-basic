+++
title = "如何让Claude-100k读取PDF文档？"
date = 2023-05-17
+++

Claude –100k刚刚发布，意味着什么？意味着我们再也不用忍受GPT的字数限制，可以读取长文档了！

那么，如何读取长文档呢？比如你有一个PDF，怎么把文本提取出来，再交给Claude –100k总结呢？

我们可以用python来实现这个功能，具体步骤如下：

# 1. 获取文本
```python
import re
import textract
# Extract the raw text from each PDF using textract
text = textract.process('data/cannot_hurt_me.pdf', method='pdfminer').decode('utf-8')
# Replace all consecutive spaces with a single space
clean_text = re.sub(r'\s+', ' ', text)
# Replace all newline characters with a space
clean_text = clean_text.replace('\n', ' ')
```

# 2. 获取文本长度
```python
len(clean_text)
```

# 3. 提取前5万字
```python
first_50k = clean_text[:50000]
```

如果你需要提取后8万字，可以用下面的代码：

```python
last_80k = clean_text[-80000:]
```

我做过测试，100k token的Claude，可以处理大约8万字的英文文本。中文应该是5万字左右。

# 4. 保存为txt文件
```python
<>
with open('last_80k.txt', 'w', encoding='utf-8') as f:
    f.write(last_80k)
f.close()
```

这样，我们就可以直接在txt里面复制文本，交给Claude–100k总结了。

我试着让Claude–100k读了我一直想读的英文书——"CAN'T HURT ME"，结果如下：

这本书主要讲述了作者小时候成长于一个残酷且充满暴力的环境中。他的父亲是一个富有且黑心的生意人,经营一个乐队酒吧并肆意虐待作者的母亲和孩子。他经常毒打作者和他的哥哥。

作者和他的母亲为生存而努力。作者的母亲虽然必须依赖父亲,但后来她决定离开。她逃跑时面临种种困难,但仍然坚持。她把孩子带到了爱人那里。

在新环境中,作者的老师仍然对他采取严格的态度以促进他的学习。然而,新的老师们考虑将他分到特殊学校,这加剧了他的焦虑。他开始结巴,头发稀疏,还被诊断出了注意力不集中过动障碍。

整个故事都反映了作者在暴力环境下成长,以及逃离暴力后仍然面临心理阴影及挑战的主题。这帮助了他理解痛苦并变得更加坚韧。

希望以上的总结对您有帮助!


