+++
title = "js 如何简单实现搜索功能"
date = 2023-10-01
+++

功能：根据关键字返回搜索结果相关的菜单栏。

代码如下：

```javascript
      // 搜索框输入内容
    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
  
      if (e.target.value.trim() === '') {
        setSearchResults([]);
        return;
      }
  
      // 对比搜索关键字
      const keyword = e.target.value.toLowerCase();
      // _ 指我们不需要在 function 中使用 key，用来当占位符，以告诉系统 sessionData 是 value
      const results = Object.entries(sessions).filter(([_, sessionData]) => {
        return sessionData.chatTitle.toLowerCase().includes(keyword) ||
               sessionData.messages.some(msg => msg.content.toLowerCase().includes(keyword));
      });
      
      setSearchResults(results);
```

代码解释：

1. handleSearchChange 接收用户输入，如果输入内容为空，那么返回空结果[]；

2. 如果输入内容不为空，将所有的用户输入变为小写字母，再将所有的 object 转为数组，以方便遍历数组，看看是否存在；

3. 关于转换为数组的方法，是Object.entries；关于如何把搜索结果形成新数组，用的是 .filter 和 .some，它们的用法请参考这篇文章：[js 如何把 object 转换为数组 array ？](@/blog/object-to-array.md)

4. 将新数组 result 的结果更新至 SearchResults。

我们先来看搜索结果的展示页面：

```javascript
        {/* 聊天列表 ChatItem*/}
        <div className="overflow-auto">
        {searchQuery ? 
          searchResults.length > 0 ? 
            searchResults.map(([sessionId, sessionData]) => (
              <ChatItem 
                key={sessionId} 
                chatTitle={sessionData.chatTitle} 
                messages={sessionData.messages} 
                startTime={sessionData.startTime}
                onSelectChat={selectSession}
                chatId={sessionId}
              />
            )) : <div className='pl-5'>无相关搜索结果</div>
        :
          Object.entries(sessions).map(([sessionId, sessionData]) => (
            <ChatItem 
              key={sessionId} 
              chatTitle={sessionData.chatTitle} 
              messages={sessionData.messages} 
              startTime={sessionData.startTime}
              onSelectChat={selectSession}
              chatId={sessionId}
            />
          ))
        }
        </div>
```

代码解释：

如果出现 searchQuery，而且 searchResults 这个数组的长度不为0时，searchResults 会根据 id 和 搜索 value 来展示菜单栏\<ChatItem />；否则，则直接显示”无相关搜索结果“；

当没有 searchQuery 的时候，直接显示菜单栏\<ChatItem />

# 搜索框前端代码

前端代码是这样的：

```javascript
    import Image from 'next/image';
    
    return (
      <div className="flex-1 justify-between items-center h-10 flex rounded-lg border">
          <input 
              type="text"
              className="h-full border-none outline-none pl-3" 
              placeholder="搜索"
              value={searchQuery}
              onChange={handleSearchChange}
          />
          {searchQuery && (
              <span onClick={clearSearch} className="cursor-pointer mr-1">
                  ×
              </span>
          )}
          <Image 
              src="search.svg"
              className="w-5 h-5 mr-1" 
              width={20}
              height={20}
              alt="search-icon" 
          />
      </div>  
    )
```

我们需要在\<input />里面增加一个onChange来接收用户输入的内容。



