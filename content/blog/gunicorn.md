+++
title = "如何用Gunicorn部署python-Flask应用？"
date = 2024-10-02
+++

# 为什么要用Gunicorn？
flask是python应用，一般来说，直接用`python app.py`就可以启动服务了。

但是，为了可以让应用在服务器上长时间运行（即使关掉服务器交互页面页不影响），我们需要用到`Gunicorn`。

# 安装Gunicorn
```bash
pip install gunicorn
```

# 检查是否有gunicorn文件在运行
```bash
ps aux | grep gunicorn
```

# 杀掉gunicorn进程
```bash
pkill -f 'gunicorn.*no-function-calling'
```

杀掉特定的进程，在我的例子中，是杀掉和`no-function-calling`有关的进程。

# 试运行你的python应用
```bash
python no-function-calling.py
```
试运行你的python应用，看看是否有问题。

# 用Gunicorn运行你的python应用
```bash
nohup gunicorn --certfile /root/.acme.sh/commonlearner.com_ecc/fullchain.cer --keyfile /root/.acme.sh/commonlearner.com_ecc/commonlearner.com.key -b 0.0.0.0:5328 -w 4 no-function-calling:app
```

代码解释：
- nohup是让程序在后台运行。
- `--certfile`和`--keyfile`是ssl证书的路径。
- b是绑定的ip和端口。
- w是worker的数量。一般是cpu核心数的2倍。4代表4个worker，即4个gunicon进程。
- no-function-calling:app是你的python文件名和app对象。