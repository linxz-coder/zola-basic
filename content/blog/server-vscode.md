+++
title = "如何用VSCode登录服务器？"
date = 2024-10-02
+++

# 下载插件
搜索`Remote - SSH`，安装。

# 配置新主机
按ctrl+shift+p，输入`Remote-SSH: Connect to Host`，选择`Configure SSH Hosts`（打开配置文件），配置文件叫做`~/.ssh/config`。

# 修改配置文件
输入你的主机名、用户名、密钥文件路径。
```json
  Host <yourIP>
    HostName <yourIP>
    User root
    IdentityFile <path-to-your-key>
```

# 连接新主机
按ctrl+shift+p，输入`Remote-SSH: Connect to Host`，选择你的主机名。

这样，你就可以在VSCode中编辑服务器文件了。
