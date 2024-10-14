+++
title = "mysql占用内存太高怎么办？"
date = 2023-10-22
+++

当然是钞能力解决，买个云服务器专门来放mysql，或者托管。

但是咱不是有钱人，还是技术解决吧。

我转移了自己wordpress博客网站后，发现内存使用率从百分之10几飙升至百分之40，试用了各种方法，均没有用。偶然看到[stackoverflow](https://stackoverflow.com/questions/45516971/why-is-mysql-consuming-so-much-memory)，试了下，竟然有效。

基本就是修改一个小点:

```bash
cd /etc/mysql/mysql.conf.d
vim mysqld.cnf #找到你系统中这个文件，非常关键
```

加上这行就OK了：

```bash
performance_schema = 0
```

完整的代码：

```bash
#
# The MySQL database server configuration file.
#
# One can use all long options that the program supports.
# Run program with --help to get a list of available options and with
# --print-defaults to see which it would actually understand and use.
#
# For explanations see
# http://dev.mysql.com/doc/mysql/en/server-system-variables.html

# Here is entries for some specific programs
# The following values assume you have at least 32M ram

[mysqld]
#
# * Basic Settings
#
user            = mysql
# pid-file      = /var/run/mysqld/mysqld.pid
# socket        = /var/run/mysqld/mysqld.sock
# port          = 3306
# datadir       = /var/lib/mysql
innodb_buffer_pool_size = 128M  # 调整为所需的值
innodb_buffer_pool_instances=4  # 例如，对于 4GB 的 buffer pool size
performance_schema = 0 #stackoverflow推荐

# If MySQL is running as a replication slave, this should be
# changed. Ref https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_tmpdir
# tmpdir                = /tmp
#
# Instead of skip-networking the default is now to listen only on
# localhost which is more compatible and is not less secure.
bind-address            = 127.0.0.1
mysqlx-bind-address     = 127.0.0.1
#
# * Fine Tuning
#
key_buffer_size         = 16M
# max_allowed_packet    = 64M
# thread_stack          = 256K

# thread_cache_size       = -1

# This replaces the startup script and checks MyISAM tables if needed
# the first time they are touched
myisam-recover-options  = BACKUP

# max_connections        = 151

# table_open_cache       = 4000

#
# * Logging and Replication
#
# Both location gets rotated by the cronjob.
#
# Log all queries
# Be aware that this log type is a performance killer.
# general_log_file        = /var/log/mysql/query.log
# general_log             = 1
#
# Error log - should be very few entries.
#
log_error = /var/log/mysql/error.log
#
# Here you can see queries with especially long duration
# slow_query_log                = 1
# slow_query_log_file   = /var/log/mysql/mysql-slow.log
# long_query_time = 2
# log-queries-not-using-indexes
#
# The following can be used as easy to replay backup logs or for replication.
# note: if you are setting up a replication slave, see README.Debian about
#       other settings you may need to change.
# server-id             = 1
# log_bin                       = /var/log/mysql/mysql-bin.log
# binlog_expire_logs_seconds    = 2592000
max_binlog_size   = 100M
# binlog_do_db          = include_database_name
# binlog_ignore_db      = include_database_name
```

基本上会从40%一下子降到10%几，但是你会发现图片上传能力会变弱。很多大图片无法上传。

各有取舍吧。

我现在就把图片裁剪一下才上传。
