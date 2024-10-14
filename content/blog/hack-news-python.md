+++
title = "如何用python获取hacker news内容？"
date = 2023-11-13
+++

网络上有很多获取api的方法，在这里我介绍更“原生态”的方法，直接用GET方法。

代码如下：

```python
import requests
session = requests.Session()

def get_and_save(url, filename):
    # 获取网页内容
    response = session.get(url)
    text = response.text

    # 将内容写入文件
    with open(filename, 'w', encoding='utf-8') as file:
        file.write(text)

    return text

# 使用函数并指定文件名
get_and_save('https://news.ycombinator.com/', 'hacker_news.html')
```

该方法会把内容保存成hacker_news.html，直接用浏览器打开就行。

之所以用requests.Session()，而不是直接requests.get()，原因在于：

```bash
使用 requests.get() 和使用 requests.Session().get() 之间的主要区别在于会话管理和状态保持。

简单请求 - requests.get():

当你使用 requests.get() 发送请求时，每次调用都是独立的。这意味着每次请求都会建立新的连接，且不会在请求之间保存状态（如cookies、headers等）。
这适用于简单的、一次性的请求，尤其是在不需要在多个请求之间维持状态时。

会话管理 - requests.Session().get():

使用 requests.Session() 创建的会话对象允许你在多个请求之间保持某些状态。这意味着它可以保持 cookies，并且能够为每个随后的请求保留某些参数（如 headers）。
会话还可以优化性能。当你使用相同的 Session 对象发出多个请求到同一服务器时，底层的 TCP 连接会被重用，而不是每次请求都重新建立，这可以减少延迟。
在需要登录认证的场景中特别有用，你可以首先发送登录请求，会话将保持登录状态，使得后续的请求能够访问需要认证的页面或功能。
会话还可以自定义更多的持久化行为，例如错误重试策略、连接池大小等。

总结来说，如果你只是需要发送一两个独立的请求，requests.get() 就足够了。但是，如果你要处理多个相关联的请求，尤其是当这些请求之间需要保持 cookies、headers 或其他状态时，使用 requests.Session() 会更加高效和方便。
```

hacker news本质上是用表格的形式来储存网页，非常直观。示例代码如下：

\<table>代表表格，\<tr>代表row，\<td>代表内容table-data：

```html
<html lang="en" op="news">

<head>
    <meta name="referrer" content="origin">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="news.css?zIjpThVbr6MtVJZBrLeK">
    <link rel="shortcut icon" href="favicon.ico">
    <link rel="alternate" type="application/rss+xml" title="RSS" href="rss">
    <title>Hacker News</title>
</head>

<body>
    <center>
        <table id="hnmain" border="0" cellpadding="0" cellspacing="0" width="85%" bgcolor="#f6f6ef">
            <tr>
                <td bgcolor="#ff6600">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding:2px">
                        <tr>
                            <td style="width:18px;padding-right:4px"><a href="https://news.ycombinator.com"><img
                                        src="y18.svg" width="18" height="18"
                                        style="border:1px white solid; display:block"></a></td>
                            <td style="line-height:12pt; height:10px;"><span class="pagetop"><b class="hnname"><a
                                            href="news">Hacker News</a></b>
                                    <a href="newest">new</a> | <a href="front">past</a> | <a
                                        href="newcomments">comments</a> | <a href="ask">ask</a> | <a
                                        href="show">show</a> | <a href="jobs">jobs</a> | <a href="submit">submit</a>
                                </span></td>
                            <td style="text-align:right;padding-right:4px;"><span class="pagetop">
                                    <a href="login?goto=news">login</a>
                                </span></td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr id="pagespace" title="" style="height:10px"></tr>
            <tr>
                <td>
                    <table border="0" cellpadding="0" cellspacing="0">
                        <tr class='athing' id='38249214'>
                            <td align="right" valign="top" class="title"><span class="rank">1.</span></td>
                            <td valign="top" class="votelinks">
                                <center><a id='up_38249214' href='vote?id=38249214&how=up&goto=news'>
                                        <div class='votearrow' title='upvote'></div>
                                    </a></center>
                            </td>
                            <td class="title"><span class="titleline"><a
                                        href="https://www.canva.dev/blog/engineering/ship-shape/" rel="noreferrer">Ship
                                        Shape</a><span class="sitebit comhead"> (<a href="from?site=canva.dev"><span
                                                class="sitestr">canva.dev</span></a>)</span></span></td>
                        </tr>
                        <tr>
                            <td colspan="2"></td>
                            <td class="subtext"><span class="subline">
                                    <span class="score" id="score_38249214">37 points</span> by <a href="user?id=SerCe"
                                        class="hnuser">SerCe</a> <span class="age" title="2023-11-13T11:51:00"><a
                                            href="item?id=38249214">47 minutes ago</a></span> <span
                                        id="unv_38249214"></span> | <a href="hide?id=38249214&goto=news">hide</a> |
                                    <a href="item?id=38249214">1 comment</a> </span>
                            </td>
                        </tr>
                        <tr class="spacer" style="height:5px"></tr>
                        <tr class='athing' id='38247964'>
                            <td align="right" valign="top" class="title"><span class="rank">2.</span></td>
                            <td valign="top" class="votelinks">
                                <center><a id='up_38247964' href='vote?id=38247964&how=up&goto=news'>
                                        <div class='votearrow' title='upvote'></div>
                                    </a></center>
                            </td>
                            <td class="title"><span class="titleline"><a
                                        href="https://virtuallyfun.com/2023/11/12/dont-waste-money-on-a-math-coprocessor-they-said/"
                                        rel="noreferrer">Don't waste money on a math coprocessor they said</a><span
                                        class="sitebit comhead"> (<a href="from?site=virtuallyfun.com"><span
                                                class="sitestr">virtuallyfun.com</span></a>)</span></span></td>
                        </tr>
                        <tr>
                            <td colspan="2"></td>
                            <td class="subtext"><span class="subline">
                                    <span class="score" id="score_38247964">131 points</span> by <a
                                        href="user?id=jandeboevrie" class="hnuser">jandeboevrie</a> <span class="age"
                                        title="2023-11-13T07:51:00"><a href="item?id=38247964">4 hours ago</a></span>
                                    <span id="unv_38247964"></span> | <a href="hide?id=38247964&goto=news">hide</a>
                                    | <a href="item?id=38247964">42 comments</a> </span>
                            </td>
                        </tr>
                        <tr class="spacer" style="height:5px"></tr>
                        <tr class='athing' id='38248532'>
                            <td align="right" valign="top" class="title"><span class="rank">3.</span></td>
                            <td valign="top" class="votelinks">
                                <center><a id='up_38248532' href='vote?id=38248532&how=up&goto=news'>
                                        <div class='votearrow' title='upvote'></div>
                                    </a></center>
                            </td>
                            <td class="title"><span class="titleline"><a
                                        href="https://web.williams.edu/Mathematics/lg5/Rota.pdf"
                                        rel="noreferrer">Lessons I wish I had learned before teaching differential
                                        equations [pdf] (1997)</a><span class="sitebit comhead"> (<a
                                            href="from?site=williams.edu"><span
                                                class="sitestr">williams.edu</span></a>)</span></span></td>
                        </tr>
                        <tr>
                            <td colspan="2"></td>
                            <td class="subtext"><span class="subline">
                                    <span class="score" id="score_38248532">84 points</span> by <a
                                        href="user?id=itronitron" class="hnuser">itronitron</a> <span class="age"
                                        title="2023-11-13T09:36:16"><a href="item?id=38248532">3 hours ago</a></span>
                                    <span id="unv_38248532"></span> | <a href="hide?id=38248532&goto=news">hide</a>
                                    | <a href="item?id=38248532">52 comments</a> </span>
                            </td>
                        </tr>
                        <tr class="spacer" style="height:5px"></tr>
                        <tr class='athing' id='38230532'>
                            <td align="right" valign="top" class="title"><span class="rank">4.</span></td>
                            <td valign="top" class="votelinks">
                                <center><a id='up_38230532' href='vote?id=38230532&how=up&goto=news'>
                                        <div class='votearrow' title='upvote'></div>
                                    </a></center>
                            </td>
                            <td class="title"><span class="titleline"><a
                                        href="https://gmkeros.wordpress.com/2011/09/02/terry-pratchett-and-the-maggi-soup-adverts/"
                                        rel="noreferrer">Terry Pratchett and the Maggi Soup Adverts (2011)</a><span
                                        class="sitebit comhead"> (<a href="from?site=gmkeros.wordpress.com"><span
                                                class="sitestr">gmkeros.wordpress.com</span></a>)</span></span></td>
                        </tr>
                        <tr>
                            <td colspan="2"></td>
                            <td class="subtext"><span class="subline">
                                    <span class="score" id="score_38230532">57 points</span> by <a href="user?id=tosh"
                                        class="hnuser">tosh</a> <span class="age" title="2023-11-11T14:26:58"><a
                                            href="item?id=38230532">4 hours ago</a></span> <span
                                        id="unv_38230532"></span> | <a href="hide?id=38230532&goto=news">hide</a> |
                                    <a href="item?id=38230532">20 comments</a> </span>
                            </td>
                        </tr>
                        <tr class="spacer" style="height:5px"></tr>
                        <tr class='athing' id='38228310'>
                            <td align="right" valign="top" class="title"><span class="rank">5.</span></td>
                            <td valign="top" class="votelinks">
                                <center><a id='up_38228310' href='vote?id=38228310&how=up&goto=news'>
                                        <div class='votearrow' title='upvote'></div>
                                    </a></center>
                            </td>
                            <td class="title"><span class="titleline"><a
                                        href="https://www.thestack.technology/rfc9420-ietf-mls-standard/"
                                        rel="noreferrer">RFC 9420 – A Messaging Layer Security Overview</a><span
                                        class="sitebit comhead"> (<a href="from?site=thestack.technology"><span
                                                class="sitestr">thestack.technology</span></a>)</span></span></td>
                        </tr>
                        <tr>
                            <td colspan="2"></td>
                            <td class="subtext"><span class="subline">
                                    <span class="score" id="score_38228310">52 points</span> by <a
                                        href="user?id=todsacerdoti" class="hnuser">todsacerdoti</a> <span class="age"
                                        title="2023-11-11T07:34:13"><a href="item?id=38228310">6 hours ago</a></span>
                                    <span id="unv_38228310"></span> | <a href="hide?id=38228310&goto=news">hide</a>
                                    | <a href="item?id=38228310">2 comments</a> </span>
                            </td>
                        </tr>
                        <tr class="spacer" style="height:5px"></tr>
                        <tr class='athing' id='38245935'>
                            <td align="right" valign="top" class="title"><span class="rank">6.</span></td>
                            <td valign="top" class="votelinks">
                                <center><a id='up_38245935' href='vote?id=38245935&how=up&goto=news'>
                                        <div class='votearrow' title='upvote'></div>
                                    </a></center>
                            </td>
                            <td class="title"><span class="titleline"><a href="https://www.troyhunt.com/beg-bounties/"
                                        rel="noreferrer">Beg Bounties (2021)</a><span class="sitebit comhead"> (<a
                                            href="from?site=troyhunt.com"><span
                                                class="sitestr">troyhunt.com</span></a>)</span></span></td>
                        </tr>
                        <tr>
                            <td colspan="2"></td>
                            <td class="subtext"><span class="subline">
                                    <span class="score" id="score_38245935">217 points</span> by <a href="user?id=eiiot"
                                        class="hnuser">eiiot</a> <span class="age" title="2023-11-13T01:39:37"><a
                                            href="item?id=38245935">11 hours ago</a></span> <span
                                        id="unv_38245935"></span> | <a href="hide?id=38245935&goto=news">hide</a> |
                                    <a href="item?id=38245935">99 comments</a> </span>
                            </td>
                        </tr>
                        <tr class="spacer" style="height:5px"></tr>
                        <tr class='athing' id='38236128'>
                            <td align="right" valign="top" class="title"><span class="rank">7.</span></td>
                            <td valign="top" class="votelinks">
                                <center><a id='up_38236128' href='vote?id=38236128&how=up&goto=news'>
                                        <div class='votearrow' title='upvote'></div>
                                    </a></center>
                            </td>
                            <td class="title"><span class="titleline"><a
                                        href="https://www.youtube.com/watch?v=eQOOx4mmY6I">Hacking a 25 Year Old Game to
                                        Make It Work </a><span class="sitebit comhead"> (<a
                                            href="from?site=youtube.com"><span
                                                class="sitestr">youtube.com</span></a>)</span></span></td>
                        </tr>
                        <tr>
                            <td colspan="2"></td>
                            <td class="subtext"><span class="subline">
                                    <span class="score" id="score_38236128">100 points</span> by <a
                                        href="user?id=gus_massa" class="hnuser">gus_massa</a> <span class="age"
                                        title="2023-11-12T00:45:29"><a href="item?id=38236128">7 hours ago</a></span>
                                    <span id="unv_38236128"></span> | <a href="hide?id=38236128&goto=news">hide</a>
                                    | <a href="item?id=38236128">7 comments</a> </span>
                            </td>
                        </tr>
                        <tr class="spacer" style="height:5px"></tr>
                        <tr class='athing' id='38230008'>
                            <td align="right" valign="top" class="title"><span class="rank">8.</span></td>
                            <td valign="top" class="votelinks">
                                <center><a id='up_38230008' href='vote?id=38230008&how=up&goto=news'>
                                        <div class='votearrow' title='upvote'></div>
                                    </a></center>
                            </td>
                            <td class="title"><span class="titleline"><a
                                        href="https://ammarmian.substack.com/p/122820-get-offended-more"
                                        rel="noreferrer">Get Offended More (2020)</a><span class="sitebit comhead"> (<a
                                            href="from?site=ammarmian.substack.com"><span
                                                class="sitestr">ammarmian.substack.com</span></a>)</span></span></td>
                        </tr>
                        <tr>
                            <td colspan="2"></td>
                            <td class="subtext"><span class="subline">
                                    <span class="score" id="score_38230008">15 points</span> by <a
                                        href="user?id=lpcrealmadrid" class="hnuser">lpcrealmadrid</a> <span class="age"
                                        title="2023-11-11T13:09:56"><a href="item?id=38230008">3 hours ago</a></span>
                                    <span id="unv_38230008"></span> | <a href="hide?id=38230008&goto=news">hide</a>
                                    | <a href="item?id=38230008">12 comments</a> </span>
                            </td>
                        </tr>
                        <tr class="spacer" style="height:5px"></tr>
                        <tr class='athing' id='38248900'>
                            <td align="right" valign="top" class="title"><span class="rank">9.</span></td>
                            <td valign="top" class="votelinks">
                                <center><a id='up_38248900' href='vote?id=38248900&how=up&goto=news'>
                                        <div class='votearrow' title='upvote'></div>
                                    </a></center>
                            </td>
                            <td class="title"><span class="titleline"><a
                                        href="https://www.loro.dev/blog/loro-now-open-source"
                                        rel="nofollow noreferrer">Loro: Reimagine state management with CRDTs</a><span
                                        class="sitebit comhead"> (<a href="from?site=loro.dev"><span
                                                class="sitestr">loro.dev</span></a>)</span></span></td>
                        </tr>
                        <tr>
                            <td colspan="2"></td>
                            <td class="subtext"><span class="subline">
                                    <span class="score" id="score_38248900">12 points</span> by <a
                                        href="user?id=czx111331" class="hnuser">czx111331</a> <span class="age"
                                        title="2023-11-13T10:51:20"><a href="item?id=38248900">1 hour ago</a></span>
                                    <span id="unv_38248900"></span> | <a href="hide?id=38248900&goto=news">hide</a>
                                    | <a href="item?id=38248900">1 comment</a> </span>
                            </td>
                        </tr>
                        <tr class="spacer" style="height:5px"></tr>
                        <tr class='athing' id='38230161'>
                            <td align="right" valign="top" class="title"><span class="rank">10.</span></td>
                            <td valign="top" class="votelinks">
                                <center><a id='up_38230161' href='vote?id=38230161&how=up&goto=news'>
                                        <div class='votearrow' title='upvote'></div>
                                    </a></center>
                            </td>
                            <td class="title"><span class="titleline"><a
                                        href="https://www.phoronix.com/news/Linux-6.7-RISC-V" rel="noreferrer">RISC-V
                                        with Linux 6.7 Gains Optimized TLB Flushing, Software Shadow Call
                                        Stacks</a><span class="sitebit comhead"> (<a href="from?site=phoronix.com"><span
                                                class="sitestr">phoronix.com</span></a>)</span></span></td>
                        </tr>
                        <tr>
                            <td colspan="2"></td>
                            <td class="subtext"><span class="subline">
                                    <span class="score" id="score_38230161">106 points</span> by <a
                                        href="user?id=rbanffy" class="hnuser">rbanffy</a> <span class="age"
                                        title="2023-11-11T13:33:59"><a href="item?id=38230161">10 hours ago</a></span>
                                    <span id="unv_38230161"></span> | <a href="hide?id=38230161&goto=news">hide</a>
                                    | <a href="item?id=38230161">2 comments</a> </span>
                            </td>
                        </tr>
                        <tr class="spacer" style="height:5px"></tr>
                        <tr class='athing' id='38247423'>
                            <td align="right" valign="top" class="title"><span class="rank">11.</span></td>
                            <td valign="top" class="votelinks">
                                <center><a id='up_38247423' href='vote?id=38247423&how=up&goto=news'>
                                        <div class='votearrow' title='upvote'></div>
                                    </a></center>
                            </td>
                            <td class="title"><span class="titleline"><a
                                        href="https://journals.sagepub.com/doi/full/10.1177/0003122420912941"
                                        rel="noreferrer">From Aristocratic to Ordinary: Shifting Modes of Elite
                                        Distinction (2020)</a><span class="sitebit comhead"> (<a
                                            href="from?site=sagepub.com"><span
                                                class="sitestr">sagepub.com</span></a>)</span></span></td>
                        </tr>
                        <tr>
                            <td colspan="2"></td>
                            <td class="subtext"><span class="subline">
                                    <span class="score" id="score_38247423">43 points</span> by <a
                                        href="user?id=benbreen" class="hnuser">benbreen</a> <span class="age"
                                        title="2023-11-13T05:54:01"><a href="item?id=38247423">6 hours ago</a></span>
                                    <span id="unv_38247423"></span> | <a href="hide?id=38247423&goto=news">hide</a>
                                    | <a href="item?id=38247423">39 comments</a> </span>
                            </td>
                        </tr>
                        <tr class="spacer" style="height:5px"></tr>
                        <tr class='athing' id='38231160'>
                            <td align="right" valign="top" class="title"><span class="rank">12.</span></td>
                            <td valign="top" class="votelinks">
                                <center><a id='up_38231160' href='vote?id=38231160&how=up&goto=news'>
                                        <div class='votearrow' title='upvote'></div>
                                    </a></center>
                            </td>
                            <td class="title"><span class="titleline"><a
                                        href="https://staysaasy.com/startups/2023/11/10/imprecise-asks.html"
                                        rel="nofollow noreferrer">Your small imprecise ask is a big waste of their
                                        time</a><span class="sitebit comhead"> (<a href="from?site=staysaasy.com"><span
                                                class="sitestr">staysaasy.com</span></a>)</span></span></td>
                        </tr>
                        <tr>
                            <td colspan="2"></td>
                            <td class="subtext"><span class="subline">
                                    <span class="score" id="score_38231160">6 points</span> by <a href="user?id=zdw"
                                        class="hnuser">zdw</a> <span class="age" title="2023-11-11T15:30:16"><a
                                            href="item?id=38231160">2 hours ago</a></span> <span
                                        id="unv_38231160"></span> | <a href="hide?id=38231160&goto=news">hide</a> |
                                    <a href="item?id=38231160">discuss</a> </span>
                            </td>
                        </tr>
                        <tr class="spacer" style="height:5px"></tr>
                        <tr class='athing' id='38249316'>
                            <td align="right" valign="top" class="title"><span class="rank">13.</span></td>
                            <td valign="top" class="votelinks">
                                <center><a id='up_38249316' href='vote?id=38249316&how=up&goto=news'>
                                        <div class='votearrow' title='upvote'></div>
                                    </a></center>
                            </td>
                            <td class="title"><span class="titleline"><a
                                        href="https://hyperallergic.com/855658/pistachio-billionaires-lynda-stewart-resnick-accused-of-artwashing-california-water-crisis/"
                                        rel="noreferrer">Pistachio Billionaires Accused of Artwashing California's
                                        Water Crisis</a><span class="sitebit comhead"> (<a
                                            href="from?site=hyperallergic.com"><span
                                                class="sitestr">hyperallergic.com</span></a>)</span></span></td>
                        </tr>
                        <tr>
                            <td colspan="2"></td>
                            <td class="subtext"><span class="subline">
                                    <span class="score" id="score_38249316">7 points</span> by <a
                                        href="user?id=Geekette" class="hnuser">Geekette</a> <span class="age"
                                        title="2023-11-13T12:10:07"><a href="item?id=38249316">39 minutes ago</a></span>
                                    <span id="unv_38249316"></span> | <a href="hide?id=38249316&goto=news">hide</a>
                                    | <a href="item?id=38249316">discuss</a> </span>
                            </td>
                        </tr>
                        <tr class="spacer" style="height:5px"></tr>
                        <tr class='athing' id='38245198'>
                            <td align="right" valign="top" class="title"><span class="rank">14.</span></td>
                            <td valign="top" class="votelinks">
                                <center><a id='up_38245198' href='vote?id=38245198&how=up&goto=news'>
                                        <div class='votearrow' title='upvote'></div>
                                    </a></center>
                            </td>
                            <td class="title"><span class="titleline"><a
                                        href="https://www.davidrevoy.com/article1002/how-a-kernel-developer-made-my-styluses-work-again"
                                        rel="noreferrer">A kernel developer made my styluses work again on newer
                                        kernels</a><span class="sitebit comhead"> (<a
                                            href="from?site=davidrevoy.com"><span
                                                class="sitestr">davidrevoy.com</span></a>)</span></span></td>
                        </tr>
                        <tr>
                            <td colspan="2"></td>
                            <td class="subtext"><span class="subline">
                                    <span class="score" id="score_38245198">124 points</span> by <a
                                        href="user?id=sohkamyung" class="hnuser">sohkamyung</a> <span class="age"
                                        title="2023-11-12T23:26:31"><a href="item?id=38245198">12 hours ago</a></span>
                                    <span id="unv_38245198"></span> | <a href="hide?id=38245198&goto=news">hide</a>
                                    | <a href="item?id=38245198">4 comments</a> </span>
                            </td>
                        </tr>
                        <tr class="spacer" style="height:5px"></tr>
                        <tr class='athing' id='38246668'>
                            <td align="right" valign="top" class="title"><span class="rank">15.</span></td>
                            <td valign="top" class="votelinks">
                                <center><a id='up_38246668' href='vote?id=38246668&how=up&goto=news'>
                                        <div class='votearrow' title='upvote'></div>
                                    </a></center>
                            </td>
                            <td class="title"><span class="titleline"><a
                                        href="https://www.secondstate.io/articles/fast-llm-inference/"
                                        rel="noreferrer">Run LLMs on my own Mac fast and efficient Only 2 MBs</a><span
                                        class="sitebit comhead"> (<a href="from?site=secondstate.io"><span
                                                class="sitestr">secondstate.io</span></a>)</span></span></td>
                        </tr>
                        <tr>
                            <td colspan="2"></td>
                            <td class="subtext"><span class="subline">
                                    <span class="score" id="score_38246668">271 points</span> by <a
                                        href="user?id=3Sophons" class="hnuser">3Sophons</a> <span class="age"
                                        title="2023-11-13T03:48:44"><a href="item?id=38246668">9 hours ago</a></span>
                                    <span id="unv_38246668"></span> | <a href="hide?id=38246668&goto=news">hide</a>
                                    | <a href="item?id=38246668">78 comments</a> </span>
                            </td>
                        </tr>
                        <tr class="spacer" style="height:5px"></tr>
                        <tr class='athing' id='38247339'>
                            <td align="right" valign="top" class="title"><span class="rank">16.</span></td>
                            <td valign="top" class="votelinks">
                                <center><a id='up_38247339' href='vote?id=38247339&how=up&goto=news'>
                                        <div class='votearrow' title='upvote'></div>
                                    </a></center>
                            </td>
                            <td class="title"><span class="titleline"><a
                                        href="https://herbsutter.com/2023/11/11/trip-report-autumn-iso-c-standards-meeting-kona-hi-usa/"
                                        rel="noreferrer">Trip Autumn ISO C++ standards meeting</a><span
                                        class="sitebit comhead"> (<a href="from?site=herbsutter.com"><span
                                                class="sitestr">herbsutter.com</span></a>)</span></span></td>
                        </tr>
                        <tr>
                            <td colspan="2"></td>
                            <td class="subtext"><span class="subline">
                                    <span class="score" id="score_38247339">28 points</span> by <a
                                        href="user?id=signa11" class="hnuser">signa11</a> <span class="age"
                                        title="2023-11-13T05:41:01"><a href="item?id=38247339">7 hours ago</a></span>
                                    <span id="unv_38247339"></span> | <a href="hide?id=38247339&goto=news">hide</a>
                                    | <a href="item?id=38247339">3 comments</a> </span>
                            </td>
                        </tr>
                        <tr class="spacer" style="height:5px"></tr>
                        <tr class='athing' id='38248421'>
                            <td align="right" valign="top" class="title"><span class="rank">17.</span></td>
                            <td valign="top" class="votelinks">
                                <center><a id='up_38248421' href='vote?id=38248421&how=up&goto=news'>
                                        <div class='votearrow' title='upvote'></div>
                                    </a></center>
                            </td>
                            <td class="title"><span class="titleline"><a
                                        href="https://www.youtube.com/watch?v=HDKUEXBF3B4">Ruby on Rails: The
                                        Documentary </a><span class="sitebit comhead"> (<a
                                            href="from?site=youtube.com"><span
                                                class="sitestr">youtube.com</span></a>)</span></span></td>
                        </tr>
                        <tr>
                            <td colspan="2"></td>
                            <td class="subtext"><span class="subline">
                                    <span class="score" id="score_38248421">104 points</span> by <a href="user?id=541"
                                        class="hnuser">541</a> <span class="age" title="2023-11-13T09:18:21"><a
                                            href="item?id=38248421">3 hours ago</a></span> <span
                                        id="unv_38248421"></span> | <a href="hide?id=38248421&goto=news">hide</a> |
                                    <a href="item?id=38248421">6 comments</a> </span>
                            </td>
                        </tr>
                        <tr class="spacer" style="height:5px"></tr>
                        <tr class='athing' id='38228320'>
                            <td align="right" valign="top" class="title"><span class="rank">18.</span></td>
                            <td valign="top" class="votelinks">
                                <center><a id='up_38228320' href='vote?id=38228320&how=up&goto=news'>
                                        <div class='votearrow' title='upvote'></div>
                                    </a></center>
                            </td>
                            <td class="title"><span class="titleline"><a
                                        href="https://www.nature.com/articles/s41586-023-06647-8" rel="noreferrer">Role
                                        play with large language models</a><span class="sitebit comhead"> (<a
                                            href="from?site=nature.com"><span
                                                class="sitestr">nature.com</span></a>)</span></span></td>
                        </tr>
                        <tr>
                            <td colspan="2"></td>
                            <td class="subtext"><span class="subline">
                                    <span class="score" id="score_38228320">47 points</span> by <a href="user?id=m_kos"
                                        class="hnuser">m_kos</a> <span class="age" title="2023-11-11T07:37:03"><a
                                            href="item?id=38228320">8 hours ago</a></span> <span
                                        id="unv_38228320"></span> | <a href="hide?id=38228320&goto=news">hide</a> |
                                    <a href="item?id=38228320">34 comments</a> </span>
                            </td>
                        </tr>
                        <tr class="spacer" style="height:5px"></tr>
                        <tr class='athing' id='38236198'>
                            <td align="right" valign="top" class="title"><span class="rank">19.</span></td>
                            <td valign="top" class="votelinks">
                                <center><a id='up_38236198' href='vote?id=38236198&how=up&goto=news'>
                                        <div class='votearrow' title='upvote'></div>
                                    </a></center>
                            </td>
                            <td class="title"><span class="titleline"><a
                                        href="https://github.com/Dicklesworthstone/bulk_transcribe_youtube_videos_from_playlist">Show
                                        HN: Bulk Creation of Transcripts from YouTube Playlists with Whisper</a><span
                                        class="sitebit comhead"> (<a href="from?site=github.com/dicklesworthstone"><span
                                                class="sitestr">github.com/dicklesworthstone</span></a>)</span></span>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2"></td>
                            <td class="subtext"><span class="subline">
                                    <span class="score" id="score_38236198">59 points</span> by <a
                                        href="user?id=eigenvalue" class="hnuser">eigenvalue</a> <span class="age"
                                        title="2023-11-12T00:57:16"><a href="item?id=38236198">10 hours ago</a></span>
                                    <span id="unv_38236198"></span> | <a href="hide?id=38236198&goto=news">hide</a>
                                    | <a href="item?id=38236198">24 comments</a> </span>
                            </td>
                        </tr>
                        <tr class="spacer" style="height:5px"></tr>
                        <tr class='athing' id='38230176'>
                            <td align="right" valign="top" class="title"><span class="rank">20.</span></td>
                            <td valign="top" class="votelinks">
                                <center><a id='up_38230176' href='vote?id=38230176&how=up&goto=news'>
                                        <div class='votearrow' title='upvote'></div>
                                    </a></center>
                            </td>
                            <td class="title"><span class="titleline"><a
                                        href="https://cod.pressbooks.pub/communication/chapter/13-3-small-group-dynamics/"
                                        rel="noreferrer">Small Group Dynamics</a><span class="sitebit comhead"> (<a
                                            href="from?site=pressbooks.pub"><span
                                                class="sitestr">pressbooks.pub</span></a>)</span></span></td>
                        </tr>
                        <tr>
                            <td colspan="2"></td>
                            <td class="subtext"><span class="subline">
                                    <span class="score" id="score_38230176">14 points</span> by <a
                                        href="user?id=yamrzou" class="hnuser">yamrzou</a> <span class="age"
                                        title="2023-11-11T13:36:00"><a href="item?id=38230176">5 hours ago</a></span>
                                    <span id="unv_38230176"></span> | <a href="hide?id=38230176&goto=news">hide</a>
                                    | <a href="item?id=38230176">4 comments</a> </span>
                            </td>
                        </tr>
                        <tr class="spacer" style="height:5px"></tr>
                        <tr class='athing' id='38243949'>
                            <td align="right" valign="top" class="title"><span class="rank">21.</span></td>
                            <td valign="top" class="votelinks">
                                <center><a id='up_38243949' href='vote?id=38243949&how=up&goto=news'>
                                        <div class='votearrow' title='upvote'></div>
                                    </a></center>
                            </td>
                            <td class="title"><span class="titleline"><a href="https://github.com/Jcparkyn/dpoint">Show
                                        HN: Open-source digital stylus with six degrees of freedom</a><span
                                        class="sitebit comhead"> (<a href="from?site=github.com/jcparkyn"><span
                                                class="sitestr">github.com/jcparkyn</span></a>)</span></span></td>
                        </tr>
                        <tr>
                            <td colspan="2"></td>
                            <td class="subtext"><span class="subline">
                                    <span class="score" id="score_38243949">492 points</span> by <a
                                        href="user?id=jcparkyn" class="hnuser">jcparkyn</a> <span class="age"
                                        title="2023-11-12T20:48:30"><a href="item?id=38243949">16 hours ago</a></span>
                                    <span id="unv_38243949"></span> | <a href="hide?id=38243949&goto=news">hide</a>
                                    | <a href="item?id=38243949">88 comments</a> </span>
                            </td>
                        </tr>
                        <tr class="spacer" style="height:5px"></tr>
                        <tr class='athing' id='38246082'>
                            <td align="right" valign="top" class="title"><span class="rank">22.</span></td>
                            <td valign="top" class="votelinks">
                                <center><a id='up_38246082' href='vote?id=38246082&how=up&goto=news'>
                                        <div class='votearrow' title='upvote'></div>
                                    </a></center>
                            </td>
                            <td class="title"><span class="titleline"><a
                                        href="https://staff.science.uva.nl/a.j.p.heck/Courses/Mastercourse2005/tutorial.pdf"
                                        rel="noreferrer">Learn PostScript by Doing (2005) [pdf]</a><span
                                        class="sitebit comhead"> (<a href="from?site=uva.nl"><span
                                                class="sitestr">uva.nl</span></a>)</span></span></td>
                        </tr>
                        <tr>
                            <td colspan="2"></td>
                            <td class="subtext"><span class="subline">
                                    <span class="score" id="score_38246082">45 points</span> by <a
                                        href="user?id=todsacerdoti" class="hnuser">todsacerdoti</a> <span class="age"
                                        title="2023-11-13T02:04:12"><a href="item?id=38246082">10 hours ago</a></span>
                                    <span id="unv_38246082"></span> | <a href="hide?id=38246082&goto=news">hide</a>
                                    | <a href="item?id=38246082">4 comments</a> </span>
                            </td>
                        </tr>
                        <tr class="spacer" style="height:5px"></tr>
                        <tr class='athing' id='38249202'>
                            <td align="right" valign="top" class="title"><span class="rank">23.</span></td>
                            <td valign="top" class="votelinks">
                                <center><a id='up_38249202' href='vote?id=38249202&how=up&goto=news'>
                                        <div class='votearrow' title='upvote'></div>
                                    </a></center>
                            </td>
                            <td class="title"><span class="titleline"><a
                                        href="https://www.tomshardware.com/news/youtube-may-face-criminal-complaint-for-adblock-detecting"
                                        rel="noreferrer">YouTube May Face Criminal Complaints in EU for Using Ad-Block
                                        Detection Scripts</a><span class="sitebit comhead"> (<a
                                            href="from?site=tomshardware.com"><span
                                                class="sitestr">tomshardware.com</span></a>)</span></span></td>
                        </tr>
                        <tr>
                            <td colspan="2"></td>
                            <td class="subtext"><span class="subline">
                                    <span class="score" id="score_38249202">11 points</span> by <a
                                        href="user?id=giuliomagnifico" class="hnuser">giuliomagnifico</a> <span
                                        class="age" title="2023-11-13T11:49:17"><a href="item?id=38249202">1 hour
                                            ago</a></span> <span id="unv_38249202"></span> | <a
                                        href="hide?id=38249202&goto=news">hide</a> | <a
                                        href="item?id=38249202">1 comment</a> </span>
                            </td>
                        </tr>
                        <tr class="spacer" style="height:5px"></tr>
                        <tr class='athing' id='38246032'>
                            <td align="right" valign="top" class="title"><span class="rank">24.</span></td>
                            <td valign="top" class="votelinks">
                                <center><a id='up_38246032' href='vote?id=38246032&how=up&goto=news'>
                                        <div class='votearrow' title='upvote'></div>
                                    </a></center>
                            </td>
                            <td class="title"><span class="titleline"><a
                                        href="https://spectrum.ieee.org/generative-ai-training" rel="noreferrer">MLPerf
                                        training tests put Nvidia ahead, Intel close, and Google well behind</a><span
                                        class="sitebit comhead"> (<a href="from?site=ieee.org"><span
                                                class="sitestr">ieee.org</span></a>)</span></span></td>
                        </tr>
                        <tr>
                            <td colspan="2"></td>
                            <td class="subtext"><span class="subline">
                                    <span class="score" id="score_38246032">69 points</span> by <a
                                        href="user?id=vissidarte_choi" class="hnuser">vissidarte_choi</a> <span
                                        class="age" title="2023-11-13T01:57:35"><a href="item?id=38246032">10 hours
                                            ago</a></span> <span id="unv_38246032"></span> | <a
                                        href="hide?id=38246032&goto=news">hide</a> | <a
                                        href="item?id=38246032">30 comments</a> </span>
                            </td>
                        </tr>
                        <tr class="spacer" style="height:5px"></tr>
                        <tr class='athing' id='38247767'>
                            <td align="right" valign="top" class="title"><span class="rank">25.</span></td>
                            <td valign="top" class="votelinks">
                                <center><a id='up_38247767' href='vote?id=38247767&how=up&goto=news'>
                                        <div class='votearrow' title='upvote'></div>
                                    </a></center>
                            </td>
                            <td class="title"><span class="titleline"><a
                                        href="https://semiengineering.com/sram-in-ai-the-future-of-memory/"
                                        rel="noreferrer">SRAM in AI: The Future of Memory</a><span
                                        class="sitebit comhead"> (<a href="from?site=semiengineering.com"><span
                                                class="sitestr">semiengineering.com</span></a>)</span></span></td>
                        </tr>
                        <tr>
                            <td colspan="2"></td>
                            <td class="subtext"><span class="subline">
                                    <span class="score" id="score_38247767">19 points</span> by <a
                                        href="user?id=PaulHoule" class="hnuser">PaulHoule</a> <span class="age"
                                        title="2023-11-13T07:11:55"><a href="item?id=38247767">5 hours ago</a></span>
                                    <span id="unv_38247767"></span> | <a href="hide?id=38247767&goto=news">hide</a>
                                    | <a href="item?id=38247767">2 comments</a> </span>
                            </td>
                        </tr>
                        <tr class="spacer" style="height:5px"></tr>
                        <tr class='athing' id='38241674'>
                            <td align="right" valign="top" class="title"><span class="rank">26.</span></td>
                            <td valign="top" class="votelinks">
                                <center><a id='up_38241674' href='vote?id=38241674&how=up&goto=news'>
                                        <div class='votearrow' title='upvote'></div>
                                    </a></center>
                            </td>
                            <td class="title"><span class="titleline"><a
                                        href="https://lcamtuf.substack.com/p/the-evolution-of-expert-communities"
                                        rel="noreferrer">The evolution of expert communities</a><span
                                        class="sitebit comhead"> (<a href="from?site=lcamtuf.substack.com"><span
                                                class="sitestr">lcamtuf.substack.com</span></a>)</span></span></td>
                        </tr>
                        <tr>
                            <td colspan="2"></td>
                            <td class="subtext"><span class="subline">
                                    <span class="score" id="score_38241674">106 points</span> by <a href="user?id=zdw"
                                        class="hnuser">zdw</a> <span class="age" title="2023-11-12T16:36:00"><a
                                            href="item?id=38241674">15 hours ago</a></span> <span
                                        id="unv_38241674"></span> | <a href="hide?id=38241674&goto=news">hide</a> |
                                    <a href="item?id=38241674">43 comments</a> </span>
                            </td>
                        </tr>
                        <tr class="spacer" style="height:5px"></tr>
                        <tr class='athing' id='38244927'>
                            <td align="right" valign="top" class="title"><span class="rank">27.</span></td>
                            <td valign="top" class="votelinks">
                                <center><a id='up_38244927' href='vote?id=38244927&how=up&goto=news'>
                                        <div class='votearrow' title='upvote'></div>
                                    </a></center>
                            </td>
                            <td class="title"><span class="titleline"><a
                                        href="https://www.computer.org/csdl/magazine/mi/2021/06/09623432/1yJTxgRWQgg"
                                        rel="noreferrer">The Apollo Guidance Computer</a><span class="sitebit comhead">
                                        (<a href="from?site=computer.org"><span
                                                class="sitestr">computer.org</span></a>)</span></span></td>
                        </tr>
                        <tr>
                            <td colspan="2"></td>
                            <td class="subtext"><span class="subline">
                                    <span class="score" id="score_38244927">93 points</span> by <a href="user?id=sam345"
                                        class="hnuser">sam345</a> <span class="age" title="2023-11-12T22:49:33"><a
                                            href="item?id=38244927">12 hours ago</a></span> <span
                                        id="unv_38244927"></span> | <a href="hide?id=38244927&goto=news">hide</a> |
                                    <a href="item?id=38244927">34 comments</a> </span>
                            </td>
                        </tr>
                        <tr class="spacer" style="height:5px"></tr>
                        <tr class='athing' id='38242946'>
                            <td align="right" valign="top" class="title"><span class="rank">28.</span></td>
                            <td valign="top" class="votelinks">
                                <center><a id='up_38242946' href='vote?id=38242946&how=up&goto=news'>
                                        <div class='votearrow' title='upvote'></div>
                                    </a></center>
                            </td>
                            <td class="title"><span class="titleline"><a
                                        href="https://grossack.site/2023/11/08/37-median.html" rel="noreferrer">37, the
                                        median value for the second prime factor of an integer</a><span
                                        class="sitebit comhead"> (<a href="from?site=grossack.site"><span
                                                class="sitestr">grossack.site</span></a>)</span></span></td>
                        </tr>
                        <tr>
                            <td colspan="2"></td>
                            <td class="subtext"><span class="subline">
                                    <span class="score" id="score_38242946">405 points</span> by <a
                                        href="user?id=sacrosanct" class="hnuser">sacrosanct</a> <span class="age"
                                        title="2023-11-12T18:45:48"><a href="item?id=38242946">18 hours ago</a></span>
                                    <span id="unv_38242946"></span> | <a href="hide?id=38242946&goto=news">hide</a>
                                    | <a href="item?id=38242946">183 comments</a> </span>
                            </td>
                        </tr>
                        <tr class="spacer" style="height:5px"></tr>
                        <tr class='athing' id='38245240'>
                            <td align="right" valign="top" class="title"><span class="rank">29.</span></td>
                            <td valign="top" class="votelinks">
                                <center><a id='up_38245240' href='vote?id=38245240&how=up&goto=news'>
                                        <div class='votearrow' title='upvote'></div>
                                    </a></center>
                            </td>
                            <td class="title"><span class="titleline"><a href="https://fabiensanglard.net/blog/"
                                        rel="noreferrer">0XReasons to Write and Publish</a><span
                                        class="sitebit comhead"> (<a href="from?site=fabiensanglard.net"><span
                                                class="sitestr">fabiensanglard.net</span></a>)</span></span></td>
                        </tr>
                        <tr>
                            <td colspan="2"></td>
                            <td class="subtext"><span class="subline">
                                    <span class="score" id="score_38245240">39 points</span> by <a
                                        href="user?id=signa11" class="hnuser">signa11</a> <span class="age"
                                        title="2023-11-12T23:33:31"><a href="item?id=38245240">13 hours ago</a></span>
                                    <span id="unv_38245240"></span> | <a href="hide?id=38245240&goto=news">hide</a>
                                    | <a href="item?id=38245240">10 comments</a> </span>
                            </td>
                        </tr>
                        <tr class="spacer" style="height:5px"></tr>
                        <tr class='athing' id='38230141'>
                            <td align="right" valign="top" class="title"><span class="rank">30.</span></td>
                            <td valign="top" class="votelinks">
                                <center><a id='up_38230141' href='vote?id=38230141&how=up&goto=news'>
                                        <div class='votearrow' title='upvote'></div>
                                    </a></center>
                            </td>
                            <td class="title"><span class="titleline"><a
                                        href="https://www.nextplatform.com/2023/11/08/you-can-load-up-on-cheap-cores-with-updated-milan-epycs/"
                                        rel="noreferrer">You Can Load Up on Cheap Cores with Updated Milan
                                        Epycs</a><span class="sitebit comhead"> (<a
                                            href="from?site=nextplatform.com"><span
                                                class="sitestr">nextplatform.com</span></a>)</span></span></td>
                        </tr>
                        <tr>
                            <td colspan="2"></td>
                            <td class="subtext"><span class="subline">
                                    <span class="score" id="score_38230141">51 points</span> by <a
                                        href="user?id=rbanffy" class="hnuser">rbanffy</a> <span class="age"
                                        title="2023-11-11T13:31:43"><a href="item?id=38230141">13 hours ago</a></span>
                                    <span id="unv_38230141"></span> | <a href="hide?id=38230141&goto=news">hide</a>
                                    | <a href="item?id=38230141">19 comments</a> </span>
                            </td>
                        </tr>
                        <tr class="spacer" style="height:5px"></tr>
                        <tr class="morespace" style="height:10px"></tr>
                        <tr>
                            <td colspan="2"></td>
                            <td class='title'><a href='?p=2' class='morelink' rel='next'>More</a></td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td><img src="s.gif" height="10" width="0">
                    <table width="100%" cellspacing="0" cellpadding="1">
                        <tr>
                            <td bgcolor="#ff6600"></td>
                        </tr>
                    </table><br>
                    <center><span class="yclinks"><a href="newsguidelines.html">Guidelines</a> | <a
                                href="newsfaq.html">FAQ</a> | <a href="lists">Lists</a> | <a
                                href="https://github.com/HackerNews/API">API</a> | <a href="security.html">Security</a>
                            | <a href="https://www.ycombinator.com/legal/">Legal</a> | <a
                                href="https://www.ycombinator.com/apply/">Apply to YC</a> | <a
                                href="mailto:hn@ycombinator.com">Contact</a></span><br><br>
                        <form method="get" action="//hn.algolia.com/">Search: <input type="text" name="q" size="17"
                                autocorrect="off" spellcheck="false" autocapitalize="off" autocomplete="false"></form>
                    </center>
                </td>
            </tr>
        </table>
    </center>
</body>
<script type='text/javascript' src='hn.js?zIjpThVbr6MtVJZBrLeK'></script>

</html>
```
