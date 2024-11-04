+++
title = "如何把代码push到Github上？"
date = 2023-08-16
+++

> 注："push"这个词，一般指"复制本地代码到远端仓库"去，为了行文方便，以下都直接用"push"。

Github是一个代码托管平台，相信大家都看到很多大神把代码放到这个平台上，他们是怎么做的呢？

要把代码push到Github，首先要在本地创建一个文件夹，比如我的文件夹叫做”new folder”，把代码放到其中。

对应的，需要在Github新建一个仓库，仓库名随意，先不要加README文件或.gitignore或license等文件，否则影响之后的正常上传。

然后回到本地的terminal，输入以下命令：

# 1.git init

打开terminal，进入该文件夹，输入：

```bash
git init
```

这样初始化一个github仓库，会在”new folder”中创建一个隐藏文件夹”.git”，这个文件夹里面存放了一些配置信息。

# 2. git add .

输入：

```bash
git add .
```

这样就把”new folder”中的所有文件都添加到了暂存区。

# 3. git commit -m “first commit”

输入：

```bash
git commit -m "first commit"
```

这样就把暂存区的文件提交到了本地仓库。

如果你之前没有登录过，此时会显示需要你登录用户名和邮箱：

```bash
git config --global user.email "email@example.com"
git config --global user.name "your-github-name"
```

修改过后，就可以commit了。

# 4. git remote add origin

输入：

```bash
git remote add origin [你的仓库地址]
```

这样就把本地仓库和远程仓库关联起来了。

我的一个remote地址示例：

https://github.com/linxz-coder/vue-love-talk.git

# 5. git push -u origin main

输入：

```bash
git push -u origin main
```

这里可能会遇到网络问题，可以开代理解决：

先取消github本身的代理：

```bash
git config --global --unset http.proxy
git config --global --unset https.proxy
```

运气好这一步就可以解决问题。如果不行，则设置本地的代理：

```bash
git config --global http.proxy http://127.0.0.1:1087
git config --global https.proxy http://127.0.0.1:1087
```

示例代理：

1080是sock5的端口，1087是http端口。

接下来需要输入用户名和密码了：

注意，github密码早就失效了，这里的密码需要输入token，token可以在[这里](https://github.com/settings/tokens)获得。

注意保存，只会显示一次，丢失了只能重新生成。

输入用户名和token，这样就把本地仓库的文件push到了远程仓库。

如果push失败，通常是远程仓库已经有了文件，比如README.md或者LICENSE，可以无条件pull来本地先：

```bash
git pull origin main --allow-unrelated-histories
```

pull完后，需要你需要信息确认。然后重新push一次即可。

多说一句，”-u origin main”的意思是，把本地仓库的main分支和远程仓库的main分支关联起来，仅需要在第一次push代码时使用，之后更新只需要输入git push即可。

以上，基本就是push代码的流程了。

# 6. 疑问：github仓库是空文件夹？

如果你发现push代码上去成功，但文件夹是空的（带白色箭头）。

这是因为这个仓库是别人创建的，很可能是你clone的，所以你并没有权限push代码。

怎么办呢？

我们可以输入 ⌘+shift+. 来显示隐藏文件，删除文件夹里面的.git文件夹。这样就可以删掉作者的配置信息。最后直接执行：

```bash
git push -u origin main
```

这样就可以push成功了。

# 7. 疑问：push一直失败怎么办？

如果显示系统问题，首先检查你的用户名和密码。出于安全原因，这里密码并不是Github登录密码，而是Github的token。

可以在这里查看token设置：https://github.com/settings/tokens/

如果以上步骤都没错，有可能是本地仓库和远程仓库不一致，比如你在远程仓库创建了一个 README.md 或者 LICENSE 文件，但本地仓库没有，这时候就会push失败。

解决办法是先pull一下远程仓库的文件，再push：

```bash
git pull origin main --allow-unrelated-histories
```

这样就可以把远程仓库的文件拉下来，重新push即可。

# 8. 疑问：我想查看修改历史，怎么看？

输入：

```bash
git log
```

可以查看修改历史，但你会发现画面卡住了，这是因为git log是一个分页显示的命令，按下空格键可以翻页，按下q键可以退出。

# 9. 疑问：我想克隆别人的仓库？

很简单，输入：

```bash
git clone [仓库地址]
```

就可以把别人的仓库克隆到本地了。

# 10. 疑问：我发现仓库名是”master”，而不是”main”？

Github之前默认的仓库主分支是”master”，因为“black lives matter”运动，“master”有奴隶主的意思，政治不正确，因此被Github改成了”main”。

我们可以修改过来：

```bash
git branch -m master main
```

这样就把本地仓库的master分支改成main分支了。

# 11. 如果错误提交了文件，如何才暂存区删除？

```bash
git rm --cached file.txt
```

如果是文件夹，比如node\_modules，从暂存区删除：

```bash
# 比如误提交了 node_modules
git rm --cached -r node_modules/
echo "node_modules/" >> .gitignore
git commit -m "Remove node_modules from git tracking"
```

这样push以后就不会有这个文件夹了。

有的时候.gitignore没有生效，可以：
```bash
# 有时候 .gitignore 没有生效，可以：
git rm --cached -r .
git add .
git commit -m "Reset git cache"
```

特别说明：
* --cached 选项表示只从 Git 仓库中删除，保留本地文件
* 不带 --cached 的 git rm 会同时删除文件和 Git 跟踪
* -r 选项用于递归删除目录
* 删除后记得更新 .gitignore 以防止文件再次被追踪
* 操作后需要提交更改才能生效
* 可以用`git status`检查将要发生的变更。
