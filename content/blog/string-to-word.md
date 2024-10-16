+++
title = "python 如何把 string 导出成 word 文档"
date = 2023-09-20
+++

要将字符串导出为 Word 文档，你可以使用 python-docx 这个库。它提供了一个简单的方式来创建、查询和修改 Microsoft Word 文件。

以下是一个简单的例子说明如何使用 python-docx 将字符串导出到 Word 文档：

1. 首先，你需要安装 python-docx:

```bash
pip install python-docx
```

2. 接下来，你可以使用以下的代码把字符串导出为 Word 文档:

```python
from docx import Document

def string_to_word(string, file_name):
    # 创建一个新的文档
    doc = Document()

    # 添加内容到文档
    doc.add_paragraph(string)

    # 保存文档
    doc.save(file_name)

# 使用函数
my_string = "这是一个测试字符串"
file_name = "output.docx"
string_to_word(my_string, file_name)
```

上面的代码会创建一个名为 output.docx 的 Word 文档，并将 my_string 中的文本添加到文档中。你可以根据需要修改这些参数。

除了基本文本外，python-docx 还提供了丰富的格式化选项和功能，可以创建更复杂的 Word 文档，比如改变文档标题、创建表格等，你可以查阅其[官方文档](https://python-docx.readthedocs.io/en/latest/#what-it-can-do)来学习。

