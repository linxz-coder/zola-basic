+++
title = "如何自动生成python的requiremnt文件"
date = 2023-10-09
+++

# 方法一：pip freeze

如果你的项目在虚拟环境（或者云主机环境）中，你可以使用pip freeze命令来列出所有已安装的库及其版本号。请注意，这将列出所有库，不仅仅是你的app.py文件所依赖的库。

```bash
pip freeze > requirements.txt
```

# 方法二：pip install pipreqs

有一些工具可以帮助你自动识别Python文件的依赖项，例如pipreqs。你可以安装和使用它来生成requirements.txt文件。

```bash
pip install pipreqs
pipreqs
```

这将在你的项目目录中生成一个requirements.txt文件，列出所有依赖项及其版本号。

