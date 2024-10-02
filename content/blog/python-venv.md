+++
title = "python虚拟环境搭建-venv"
date = 2024-10-02
+++

如何创建一个python虚拟环境？输入以下代码即可：

```bash
# 创建一个虚拟环境
python3 -m venv venv

# 激活虚拟环境
source venv/bin/activate

# 在虚拟环境中安装插件，如
pip install markdown

# 运行脚本
python md-html.py

# 退出虚拟环境
deactivate