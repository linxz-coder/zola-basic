+++
title = "swift异步任务"
date = 2024-11-26
+++

必须包裹在`DispatchQueue.main.async`里面。

必须在开头添加self.

```swift
DispatchQueue.main.async{
    self.cityLabel.text = weather.cityName
    self.temperatureLabel.text = weather.temperaturestring
    self.conditionImageView.image = UIImage(named: weather.conditionName)
}
```

# 隔x秒触发

asyncAfter(.now()+2) 指隔2秒触发。

```swift
DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
    myText = "This is the new text!"
    }
```
