+++
title = "如何在阿里云下载和部署SSL证书？"
date = 2020-05-18
+++

我们如何下载和安装阿里云的证书呢？
1、首先你要知道你的Web服务器，一共有以下几种：

nginx, apache等等。

我知道Web服务器对于小白来说很难理解，所以你有两个方法。一、花钱。直接点击下面的“一键式HTTPS服务”就可以了。二、找阿里客服帮忙。（嘻嘻，热心的阿里客服就是好）。我当然选择是第二种：

2、回到首页，点击你的头像找到“工单管理”

3、提交工单，即提出你的问题。

不要害怕你的问题弱智，阿里的客服还是很给力的，该回答的就回答。至少他查了一下，帮我查出我的Web服务器是apache。（虽然后来我发现我的服务器下面也有apache的文件夹~）

4、回到第1步，下载apache类型的证书。

下一步就是证书如何安装了，阿里云的客服开始不给力，他让我咨询我的技术人员。我当然不甘心，我没有技术人员可以咨询啊。

于是我打开了后面的“帮助文件”，一堆专业名词弄得我云里雾里。但我看懂了一个步骤：将下载的证书文件安装到服务器根目录。于是，我想，为什么不试一下？

这时问题又来了，我打开阿里云轻量级应用，装了WordPress镜像后，根本看不到服务器根目录啊。我发现了一个办法，就是可以通过远程连接阿里云的主机通过敲代码的形式安装，可是我不会呀。

于是我又上网搜索，如何打开服务器的根目录。经过一番云里雾里，终于让我发现了下面这个神器——SSH Secure File Transfer，可惜原下载地址是已经失效。（可以安装WinSCP，功能类似，下载地址是[这个](https://winscp.net/eng/download.php))

5、windows系统下，下载SSH，桌面会出现两个SSH字样的文件，打开“SSH Secure File Transfer Client”。单机左上角的“小电脑”(connect)。打开“新建会话”也是一样的操作。

mac系统下，下载Cyberduck（软件头像是只小黄鸭，地址是[这个](https://cyberduck.io/download/)）记得选择SFTP的方式，而不是FTP的方式，端口是22，否则连接不上。

6、我们回到阿里云服务器，在“服务器运维”里面就可以看到你的Host name，也就是IP地址。User name就是你的账号。另外，你需要“设置密码”来设置你的密码，因为下一步会用到。

7、回到SSH，输入Host Name和User Name，之后再输入密码就可以进入服务器管理界面了。我们找到usr文件夹，点进去，再点击local，再点击apache，最后点击cert。（mac和windows的操作是一样的）

找到你的三个证书文件（最好下载在桌面），然后直接拉过去就行了。

8、windows下，再次找到“蓝色小电脑”，按下“disconnet”，你就可以退出SSH；WinSCP软件的话，则将显示你IP地址的标签，按“x”即可（Mac系统下，则用快捷键command+y即可退出，或者窗口上方菜单中选择“转到”-“断开选项”。）

过10分钟左右，利用https://(你的网站名），比如我的网站是https://www.linxiaozhong.club，就可以登录进你的网站了，这时候多了一个“锁头”的图标，那么就是安装成功了。庆祝一下吧！

#更新证书后的更新————————————————————————————

昨晚证书到期，我更新网站中的证书，将新证书下载到apchache里面后，发现网站时时不更新，到处搜索后，发现问题的原因可能是：1.apache服务器没更新；2.阿里云的相关服务没更新

2022.3.14日更新：

可以不需要下载证书了，只需要在阿里云申请证书时输入你的域名即可，如下图：

选择创建证书-证书申请，输入你的域名即可。之后去阿里云服务的“HTTP设置”换成这个证书即可，不用使用SSH去上传证书了！

在所有措施都做完后，发现也没效果，早上起来发现应该看看阿里云的服务台，原来需要在服务台里面更新https设置：

在“域名”-“HTTPS设置”中更新证书，证书这才开始启用。

汗，忙活了一晚上的apache指令…….原来是一个按键的事情。学艺不精，哎。

2023.8.18日更新：

因为想用最新的code block pro 插件效果，所以被迫升级 php 和 wordpress，折腾了一下备份和恢复数据库和 wordpress 网站，所幸一切顺利，不过证书又得要重新部署了。另外在阿里云更新服务器的设置后，web 服务器从 apache 变为 ngnix 了，所以有必要更新一下设置模式。

1.登录[阿里云证书网站](https://yundun.console.aliyun.com/?p=cas#/certExtend/free/cn-hangzhou)，点击下载证书。

2.把证书移入服务器

在本地 terminal 打开，输入以下命令：

```bash
scp /Users/lxz/Downloads/9295489_www.linxiaozhong.club_nginx/www.linxiaozhong.club.pem root@149.129.84.123:/usr/local/nginx/conf/cert
```

以上是利用 mac 中 terminal 的 ssh 功能，将本地的证书文档放入服务器。还有一个 key 文档，也是类似操作。

上面是安装了wordpress镜像的网址地址，如果你是ECS服务器，那么路径在/etc/nginx/cert，需要自己先mkdir cert

3.修改conf文件

首先来修改nginx.conf：

```bash
vim /usr/local/nginx/conf/nginx.conf
```

修改内容是：

```bash
server_name www.linxiaozhong.club;
```

因为nginx.conf里面有include vhost/wordpress.conf，需要在里面修改设置。修改内容是：

```bash
server_name www.linxiaozhong.club;
ssl_certificate cert/<cert-file-name>.pem;
ssl_certificate_key cert/<cert-file-name>.key;
```

## 参考文档
[阿里云](https://help.aliyun.com/zh/ssl-certificate/user-guide/install-ssl-certificates-on-nginx-servers-or-tengine-servers)



