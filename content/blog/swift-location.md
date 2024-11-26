+++
title = "swift访问用户位置地址"
date = 2024-11-26
+++

一旦用户允许了，下次不会弹出通知。如果你想再次弹出通知，可以点击设置-隐私-需要通知

```swift
import CoreLocation
let locationManager = CLLocationManager()

override func viewDidLoad() {
       //先delegate才不会crash
        locationManager.delegate = self
        locationManager.requestWhenInUseAuthorization()
        locationManager.requestLocation()
}

//MARK: - LocationManagerDelegate
extension WeatherViewController: CLLocationManagerDelegate{
    
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        if let location = locations.last{
            let lat = location.coordinate.latitude
            let lon = location.coordinate.longitude
            weatherManager.fetchWeather(latitude:lat, longtitude:lon)
        }
    }
    
    func locationManager(_ manager: CLLocationManager, didFailWithError error: any Error) {
        print("error")
    }
}
```

## 添加Info.plist的信息
在Information Property List中，按+号；

选中Privacy - Location When In Use Usage Description

value填写为什么需要用户给予位置权限。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411261135281.png)

![img2](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411261137276.png)


## 需要在模拟器设置地址
debug-设置地址
![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411261216421.png)

