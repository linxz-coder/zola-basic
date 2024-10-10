+++
title = "我们的电脑是如何互通互联的？-OSI网络7层模型详解"
date = 2020-09-01
+++

一直以来，我都非常好奇，到底我们电脑与互联网，或者说电脑与电脑之间是如何实现互通互连的。于是，我带着这个问题google了一下，得出以下历史：

一开始，我们的电脑是通过实体线缆互通互联的。大家最初也意识不到电脑可以远距离传输，即尚未发现互联网。但是，当时仅仅因为互连就遇到一个问题：不同系统之间的电脑如何互连？

比如，一台Mac系统的电脑和Windows系统的电脑，它们之间就算用线缆连接起来，也互相不能认得对方的代码，因此就不能实现交流互连的目的。这个时候，我们就需要一种协议，利用协议统一大家的连接标准，只要大家有同样的连接标准，那么两台不同电脑就可以互相连接起来。

OSI就是这么一个标准，它是1984年由ISO提出的全球互连标准，使得不同系统的互联成为可能，进而使互联网成为可能。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/osi-network1.jpg)

OSI全称是Open Systems Interconncection，即开放系统互联。在OSI标准上，数据的传输主要通过七层网络，分别为：

7.Application 应用层

6.Presentation 表示层

5.Session 会话层

4.Transfer 传输层

3.Network 网络层

2.Data 数据链路层

1.Physical 物理层

（英语速记：`All People Seem To Need Data Processing` ）

OSI数据发送和接收的方向：

数据发送时，数据从最高层走到最底层（7-1），最后经由物理层发送出去；接收方的物理层接收数据后，层层往上，从最底层走到最高层（1-7），最后分发到应用进程中。

OSI数据处理：

在数据层层向下的过程中，每一层都会对数据进行一些封装处理（如打包或者编码）；而在数据层层向上的过程中，每一层都会对数据进行一些逆处理（如解包或者解码）。这些对数据的处理和逆处理的过程就是为了实现该层的服务。


下面是各层的详解：

# 7.Application 应用层
## 功能：呈现数据
如：
  -浏览器：chrome, IE, firefox
  -数据传输：office, e-mail, skype

## 重要协议
HTTP/HTTPS协议：下载页面内容
DNS协议 ：利用DNS提供的域名解析服务，来获取网址对应的IP地址
FTP协议：文件传输协议，用来在客户机和FTP服务器之间传输文件。
DHCP协议：动态主机配置协议，DHCP服务器为客户机动态分配IP地址。
POP协议：邮件接收协议，用于从POP3服务器接收邮件。
SMTP协议：邮件发送协议，用户通过SMTP服务器发送邮件。

# 6.Presentation 表示层
## 功能：转换、压缩和加密

  - 将“搜索xxx”转换成“10101110”，将5M压缩成2.5M，加密SSL

## 重要协议：

 SSL协议：Secure Sockets Layer 加密协议

# 5.Session 会话层
#功能1：两个应用程序间的会话，验证身份authentication，授权authorization

## 重要概念：
API：Application Program Interface，应用程序编程接口

## 功能2：管理和确定传输模式
Simplex 单向：数据只可以单向传输。
Half-Duplex 半双工：允许数据单向传输，但是一个时刻只能有一个方向传输，不能同时双向传输。
Full-Duplex 全双工：数据可以同时双向传输。

# 4.Transfer 传输层
#功能1：主机对主机（End to End）传输，将Data分解成（Data Unit1, Data Unit2, Data Unit3）
#功能2：Error Control (ARR: Automatic Repeat Request)

## 重要协议：
TCP协议：Transmission Control Protocol，传输控制协议
TCP在传输数据之前必须先建立一个连接。TCP做了很多工作来提供可靠的数据传输，包括建立、管理和终止连接，确认和重传。同时TCP还提供分段和重组，流量控制（Flow Control）等。

UDP协议：User Datagram Protocol，用户数据报协议
UDP是一种简单的传输层协议，所以它并不能提供可靠的数据传输。简单地说，UDP只是把应用程序发给它的数据打包成一个UDP数据报（UDP Datagram），然后再把这个数据报传给IP。

端口Port：一个16位的二进制整数，其取值范围是0~65535
由于可能有很多应用程序同时在使用TCP/UDP，它们都会把数据交给TCP/UDP，而TCP/UDP也会接收来自IP的、包含指向不同应用程序的数据，所以就需要有一种方法来区别（标识）应用程序，这种方法就是通过端口号（Port）来进行多路复用或多路分解。

# 3.Network 网络层
## 作用：
如何把数据从一个设备发送到另一个设备(packets)
## 功能：
地址、路由、分段和重组（eg.路由器和电脑的连接）

## 重要协议：
IP协议：Internet Protocol
IPv4：32位二进制地址
IPv4的地址表示方法一般为用点隔开的4个数字，每个数字的取值范围是0~255，即一个字节的大小，如192.168.1.1。
IPv6：128位二进制地址
IPv6的表示方法为用冒号隔开的8个字（word，16位二进制），每个字都用十六进制来表示，如2012:0000:4528:7D76:3C2B:05AD:3F57:1C98

# 2.Data 数据链路层
#作用：如何把数据发送到本地网络中

## 重要载体：
LAN（Local Area Network，局域网）
以太网（Ethernet）
令牌环网（Token Ring）
光纤分布数据接口（FDDI）
802.11（WiFi）

## 重要概念：
MAC地址：每一个网卡（Network Interface Card）都有一个唯一的MAC地址，数据链路层通过MAC地址来确保数据能够正确被发送到目标设备。MAC地址是一个48位二进制整数，通常的表示方法是用-隔开的6个十六进制整数，如14-FE-B5-B0-2B-96。

# 1.Physical 物理层
#作用：所有其他层的数据最终都必须经由物理层才能发送出去
## 重要载体：
电缆、连接器、无线接收器、网卡、集线器（hub）

## 参考资料：
1. [掘金](https://juejin.im/post/6844903568860774408#heading-11)
2. [youtube](https://www.youtube.com/watch?v=vv4y_uOneC0)

## 图片来源：
[vietnaminsider.vn](https://vietnaminsider.vn/vietnam-internet-speed-10-times-slower-than-singapore/)