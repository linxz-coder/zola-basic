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
