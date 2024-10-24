+++
title = "我的prompt整理"
date = 2024-09-30
+++


是时候分享我压箱底的好货了！
整理了手头的prompt资料，分好类别，请食用。

# Midjourney & Stable Diffusion
## prompt hero
界面漂亮，可文字检索，汇集了不同软件。比如chatGPT，midjourney，stable diffusion等
地址：https://prompthero.com/

## midjourney学习大全
内容非常详细，基本涵盖midjourney的方方面面。包括怎么注册，如何使用midjourney。可以当做字典用，哪里不会点哪里。  
地址：https://learningprompt.wiki/docs/midjourney-learning-path

## midjourney官方prompt指导
官方的风格和排版就是漂亮。  
地址：https://docs.midjourney.com/docs/multi-prompts

## midlibrary
汇集了2000多种风格，全英文网站。缺点是排版比较混乱。
地址：https://www.midlibrary.io/styles

## prompt翻译网站
网站支持将中文prompt翻译成英文，玩midjourney时有用。  
地址：
https://moonvy.com/apps/ops/

## 推特大神：Kris Kashtanova

地址：推特关注人名
每天都会分享midjourney图片，附有prompt

## 推特大神：Nick St. Pierre

地址：推特关注人名
持续分享midjourney人像类图片，附有prompt

## 人像自动生成prompt

地址：https://promptbuilder.tiiny.site/
这个是一个职业人像摄影师的网站,随机生成prompt出摄影人像,质量很有保证


# chatGPT
## flowGPT
许多有创意的prompt，还可以白嫖GPT。  
地址：https://flowgpt.com/

## 写作prompt示例
写出专业作家水准的文章
>分析xx写作风格，并按照上述xx的写作风格写一篇关于外星人入侵地球的文章。

## 初级程序员用prompt
这是来自Mckay Wrigley的一条推，他正在收集有用的prompt，我发现对初级很有用，摘抄一个：
>“如何编写一个ios app？我希望你给出非常详细的，一步一步的指南，你要带着我构建所需的所有步骤。我只会按照你告诉我的去做。请记住我以前从未编写过代码，你不能指望我理解任何代码或技术术语。在我们开始之前，我希望你问我任何必要的问题，以便让你了解所需的所有背景，然后开始指导我。”
地址：https://twitter.com/mckaywrigley/status/1646512259378843659

## 接歌prompt
>你现在是专业的接歌机器人，歌曲是卢冠廷的一生所爱。这是参考歌词：""
下面，我将说出一句歌词，你接下一句。注意，只接一句歌词，不要有其他文字和标点符号。听懂请回答“是”

我尝试让GPT接歌，部分热门歌曲GPT能够直接给出下一句，但不大稳定，因此我还是给了它歌词。
如果想要它稳定接出歌曲，最佳方法应该是直接导入所有歌词到API后台。
杰伦的部分，我用的是POE的自主训练机器人。

## 做网站
>你是一个世界级的软件工程师。我想要你建设一个项目:利用openai的api，做一个和chatGPT一样的网站。
想象你每一步会如何做.
输出你的每个步骤，用组织良好的markdown格式输出。
然后，我会回复 "开始建造" ，你就执行每个步骤, 写下所有需要的代码。我有时会告诉你“继续”，只是为了让你继续讲下去，你要继续讲下去直到项目完成。

我真的让它做了一个网站，网站地址：www.commonlearner.com

## 简单沟通
我发现很多人跟GPT交流，会打很多没有必要的字。其实它能很简单理解你的需求，比如接歌、找BUG、翻译、总结等，不用说多余的话。
>翻译 (复制粘贴就好了)


# prompt技巧
## 逆向prompt
根据已经生成的内容，逆向让GPT解读规则，以后可以直接生成一样的内容，用魔法生成魔法！
地址：https://mp.weixin.qq.com/s/BP6TN-vLxZPeY2MmNfIhkg

## 关于prompt的深入思考
作者是从业人员，给了很多角度的示例，对理解prompt有很大益处。
地址：https://mp.weixin.qq.com/s/AizUBFssilX2S9aRfuz3_g

## prompt工程师指南
这份是流传在推特上出名的prompt文档，比较学术。
地址：https://www.promptingguide.ai/zh/techniques



## 分享
以下是分享我见过的有用的prompt技巧或知识，分享到我的群里的。  

**01/**  

reddit看到的mj prompt技巧。简单翻译一下：
1. 单词越前面，权重越大，因此最想要的东西请写在前面。语法不大重要
2. 逗号是软分隔，::是硬分隔，影响mj努力将两者融合在一起的程度
3. ::n是权重，如果::10就是告诉mj，其他词都不重要
4. 选择适合的纵横比, ar:, 没啥说的
5. 如果你想要特定的风格，最好写出这个艺术家的名字
6. 写长文可，其实起重要可能只有几个关键词
7. 图像+文字prompt，能相对保证效果
8. 可以通过一张或多张图像去让mj学习它没有给出的风格
9. 描述更具体，比如"beautiful face"，不如"symmetrical beautiful face"
10. --no 抛弃某个元素


**02/**  

midjourney prompt：
来自推特网友
>长得像奥黛丽赫本的中国女性，prompt：A Chinese 20-year-old Woman, looking like Audrey Hepburn, Black hair, standing on 2023 Tokyo street, hyper realistic portrait photography, pale skin, dress, wide shot, natural lighting, kodak portra 800, 105 mm f1. 8， 32k --ar 16:9 --v 5 --s 750 --q 2

<br>

**03/**  

李彦宏采访：  
“在我看来，AI native 的特征是 prompt，就是提示词，过去没有这个行当，我们也不觉得跟计算机交互有那么多讲究。未来，就要考虑怎么写 prompt 才能把大模型的能力给萃取出来，这是一个我觉得非常有意思的行业，也是一个我认为将来最容易出现新的工作机会的地方。我有一个比较大的推测，10 年之后人类一半的工作都会跟提示词有关。”

**04/**  

问：prompt是什么？  
华哥：  
“标签，AI对海量数据或者元素都打了标签，给出prompt后，相当于缩小了它的随机选择范围，更多的prompt给出了更精确的范围，在这个范围里AI去生成图像。”



注：以上部分网站可能需要梯子。   
本来想放个推荐指数的，比如推荐指数：⭐️⭐️⭐️⭐️⭐️，但是整理后才发现，都是五颗星，都是我自己觉得好才放上来的，就不加了。