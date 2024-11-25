+++
title = "swift如何make api call?"
date = 2024-11-25
+++

四步：

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202411251511651.png)


代码：

```swift
import Foundation

struct WeatherManager {
    let weatherURL =
    "https://api.openweathermap.org/data/2.5/weather?appid={your-api-key}&&units=metric&lang=zh_cn"
    
    func fetchWeather(cityName: String){
        let urlString = "\(weatherURL)&q=\(cityName)"
        performRequest(urlString: urlString)
    }
    
    func performRequest(urlString: String){
        //1.Create a url
        if let url = URL(string: urlString){
            //2.Create a URLSession
            let session = URLSession(configuration: .default)
            
            //3.Give the session a task
            let task = session.dataTask(with: url, completionHandler: handle(data:response:error:))
            
            //4.Start the task
            task.resume()
        }
    }
    
    func handle(data: Data?, response: URLResponse?, error: Error?) -> Void{
        if error != nil{
            print(error!)
            return
        }
        
        if let safeData = data {
            let dataString = String(data: safeData, encoding: .utf8)
            print(dataString!)
        }
        
    }
}

```

应用闭包+json解析：

```swift
import Foundation

struct WeatherManager {
    let weatherURL =
    "https://api.openweathermap.org/data/2.5/weather?appid={your-api-key}&&units=metric&lang=zh_cn"
    
    func fetchWeather(cityName: String){
        let urlString = "\(weatherURL)&q=\(cityName)"
        performRequest(urlString: urlString)
    }
    
    func performRequest(urlString: String){
        //1.Create a url
        if let url = URL(string: urlString){
            //2.Create a URLSession
            let session = URLSession(configuration: .default)
            
            //3.Give the session a task
            let task = session.dataTask(with: url) {(data, response, error) in
                if error != nil{
                    print(error!)
                    return
                }
                
                if let safeData = data {
                    self.parseJSON(weatherData: safeData) //在closure里面要加self.
                    
                    //测试响应
                    //let dataString = String(data: safeData, encoding: .utf8)
                    //print(dataString!)
                }
            }
            
            //4.Start the task
            task.resume()
        }
    }
    
    func parseJSON (weatherData: Data){
        let decoder = JSONDecoder()
        do{
            let decoderData = try decoder.decode(WeatherData.self, from: weatherData)
            print(decoderData.main.temp)
            print(decoderData.weather[0].description)
        } catch{
            print(error)
        }
    }
}

```

在Model文件夹中定义数据结构：
```swift
import Foundation

struct WeatherData: Decodable {
    let name: String
    let main: Main
    let weather: [Weather]
    
}

struct Main: Decodable{
    let temp: Double
}

struct Weather: Decodable{
    let description: String
}
```

api返回示例：

```json
{
    "coord": {
        "lon": -0.1257,
        "lat": 51.5085
    },
    "weather": [
        {
            "id": 804,
            "main": "Clouds",
            "description": "阴，多云",
            "icon": "04n"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 10.62,
        "feels_like": 10.06,
        "temp_min": 9.39,
        "temp_max": 11.19,
        "pressure": 997,
        "humidity": 89,
        "sea_level": 997,
        "grnd_level": 993
    },
    "visibility": 10000,
    "wind": {
        "speed": 3.6,
        "deg": 210
    },
    "clouds": {
        "all": 100
    },
    "dt": 1732517346,
    "sys": {
        "type": 2,
        "id": 2075535,
        "country": "GB",
        "sunrise": 1732520140,
        "sunset": 1732550395
    },
    "timezone": 0,
    "id": 2643743,
    "name": "London",
    "cod": 200
}
```


