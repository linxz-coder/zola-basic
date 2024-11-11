+++
title = "Java如何切换多JDK环境"
date = 2024-11-11
+++

Java如何切换多JDK环境——安装jenv

# 安装
```bash
brew install jenv
```

# 将jenv路径放到zsh配置里面

```bash
export PATH="$HOME/.jenv/bin:$PATH"
eval "$(jenv init -)"
```

更新

```bash
source ~/.zshrc   # 如果你用的是 zsh
```

# 将JDK安装到jenv中

```bash
jenv add /Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home
```

# 切换成Java 17版本：

```bash
jenv global 17.0.13
```

# 如果只是想当前目录切换成Java17：

```bash
jenv local 17.0.13
```

# 验证Java版本
```bash
java -version
```
