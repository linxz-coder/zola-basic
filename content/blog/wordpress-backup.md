+++
title = "如何给wordpress网站备份backup？"
date = 2024-10-17
+++

总共分为两步：wordpress文件夹备份+数据库备份

# wordpress文件夹备份

找到wordpress所放的文件夹，我的腾讯云地址是：

```bash
/usr/local/lighthouse/softwares/wordpress
```

## 备份文件夹

```bash
sudo tar -czvf wordpress_backup.tar.gz .
```

这条命令的作用是：在当前目录下创建一个名为`wordpress_backup.tar.gz`的压缩tar存档，包含当前目录下的所有文件和子目录，使用gzip进行压缩，并在过程中显示每个被处理文件的详细信息。

## 转移文件夹到本地电脑

```bash
scp root@your-server-ip:/usr/local/lighthouse/softwares/wordpress/wordpress_backup.tar.gz /Users/lxz/Downloads/
```

# 数据库mysql备份

找到mysql的文件夹，我的腾讯云服务器上的地址是：

```bash
/www/server/mysql/
```

## 备份mysql

```bash
mysqldump -u root -p wordpress > backup.sql
```

使用 mysqldump 工具将名为 wordpress 的MySQL数据库备份当前文件夹下到一个名为 backup.sql 的文件。

## 转移文件夹到本地电脑

```bash
scp root@your-server-ip:/www/server/mysql/backup.sql /Users/lxz/Downloads/
```

这样就大功告成了。接下来迁移wordpress可以看我这篇[wordpress迁移到阿里云](@/blog/wordpress-aliyun.md)。





