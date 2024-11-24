+++
title = "iOS-swift的输入框"
date = 2024-11-24
+++

# Text Field

可以输入内容、自动大写、密码隐藏。设置`Return Key`

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411222309523.png)

# 模拟视图出现keyboard

cmd + k

# swift输入框textField的生命周期

有用的生命周期:

## ShouldReturn:

判断键盘是否敲了回车，如果是，做点事情，比如隐藏键盘。

## ShouldEndEditing:

判断用户是否结束编辑，比如看看输入框是否有内容，如果没有，则不结束编辑

## DidEndEditing:

用户已结束编辑，做点事情，比如清空输入框。

## 示例代码：

```swift
// textfield生命周期：处理键盘回车
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        print(searchTextField.text!)
        //keyboard退出
        searchTextField.endEditing(true)
        return true
    }
    
    //textfield生命周期：验证是否应该结束编辑
    func textFieldShouldEndEditing(_ textField: UITextField) -> Bool {
        if textField.text != "" {
            return true
        } else {
            //如果未输入内容，不应该结束编辑，返回false
            textField.placeholder = "Type something"
            return false
        }
    }
    
    //textfield生命周期：完成编辑
    func textFieldDidEndEditing(_ textField: UITextField) {
        // Use searchTextFied.text to get the weather for that city.
        //清空输入框
        searchTextField.text = ""
    }
```

