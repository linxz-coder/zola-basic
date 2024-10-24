+++
title = "git/github如何回滚/回退版本"
date = 2024-10-24
+++

今天我翻到一个“尘封已久”的文件夹，想要删掉，突然发现没有备份。于是，我按照正常流程git add, git commit, git push，然后准备删掉这个文件夹。

等到我上github网站一看，不妙，这个仓库是和我的线上托管平台`vercel`项目绑定在一起的，我之前改过一些测试API的地址，会影响到这个项目的部署。

果不其然，这个项目已经被vercel检测到更新，变成了一个新页面，api目前无法访问了。

于是，我就需要做两件事：回滚git版本+回滚vercel部署。

# 回滚git

我试了下，官方推荐的是`git revert <commit-hash>`的方式，但是这个方法需要对比两个版本的不同点，手动调整。由于我不知道改过什么，而且改动的点还挺多，这个方法不适合我。

我需要直接回滚，放弃掉之后的修改。

## 查看log

```bash
git log
```

这里可以看到所有的github提交记录，我们需要把上次提交的`hash值`复制下来，作为`commit-hash`，这告诉了git需要回滚的版本。按`q`键退出log。

## git reset

```bash
git reset --hard <想回退到的commit-hash>
git push -f origin main
```

我们使用`git reset --hard`就可以回退到特定的版本了。但是这里还没完，还要push一下本地代码，让云端github网站与本地保持一致才可以。

这样就可以了吗？不行。

# 回滚vercel部署网页

我发现vercel托管的网站并没有更新，进入vercel后才发现，因为它没有监测到github的更新提交（回退不算），它不会重新部署deploy。

此时，我们有两种方法：一种是直接在vercel回退一个版本（非pro会员只能回退一个版本），一种就是随便更改一个文件，本地重新push提交，让vercel检测到github仓库的变化。

由于我之前不知道vercel不能检测回退的操作，主动redeploy了一次，因此回退也只能回退到上一个新版本，没什么用，所以只能采取第二个方法。

我在README.md文件里面随便加了一句话，push上去，现在[vercel托管网站](https://chatfun.site)就恢复正常啦！

