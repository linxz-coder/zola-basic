+++
title = "Android如何连接api？"
date = 2025-01-16
authors = ["小中"]
[taxonomies]
tags = ["安卓"]

+++

[udemy课程资料-android-api](https://tutorials.eu/navigating-libraries-apis-and-remote-content-day-9-android-14-masterclass/)


# 修改gradle的设置

注意是`Module`相关的文件

添加第三方依赖：

```kt
dependencies {

    //Compose ViewModel
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.6.2")

    //Network calls
    implementation("com.squareup.retrofit2:retrofit:2.9.0")

    //Json to Kotlin object mapping
    implementation("com.squareup.retrofit2:converter-gson:2.9.0")

    //Image loading
    implementation("io.coil-kt:coil-compose:2.4.0")
}
```

修改后记得勾选`sync now`完成同步。

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202501161632953.png)

# 定义数据结果

创建一个data class文件叫`Category`

```kt
data class PokemonDetail(
    val name: String,
    val index: String,
    val name_en: String,
    val name_jp: String,
    val profile: String,
    val forms: List<PokemonForm>
)

data class PokemonForm(
    val name: String,
    val index: String,
    val is_mega: Boolean,
    val is_gmax: Boolean,
    val image: String,
    val types: List<String>,
    val genus: String
)
```

# 准备基础连接环境

创建一个文件叫`ApiService`，输入以下代码：

```kt
import retrofit2.Retrofit
import retrofit2.http.GET
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.Header

private val retrofit = Retrofit.Builder().baseUrl("http://119.91.254.77:8000/api/v1/")
    .addConverterFactory(GsonConverterFactory.create())
    .build()


// 创建服务接口
val pokemonService = retrofit.create(ApiService::class.java)

interface ApiService{
    @GET("pokemon/0130")
    suspend fun getPokemon(
        @Header("x-access-key") accessKey: String = "your-key" // 请求头
    ): PokemonDetail
}

```

# 允许安卓手机上网

manifests文件夹-AndroidManifest.xml，写上设置：

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

![img](https://linxz-aliyun.oss-cn-shenzhen.aliyuncs.com/images/202501171129275.png)

# 发送请求

在主文件里面请求，使用 LaunchedEffect 来处理异步函数

```kt
var pokemonName by remember { mutableStateOf("") }
var pokemonProfile by remember { mutableStateOf("") }
var pokemonName_en by remember { mutableStateOf("") }
var pokemonName_jp by remember { mutableStateOf("") }
var pokemonIndex by remember { mutableStateOf("") }
var imageUrl by remember { mutableStateOf("") }
var pokemonTypes by remember { mutableStateOf<List<String>>(emptyList()) }

val baseImageUrl = "http://119.91.254.77:8000/static/images/"

// 使用 LaunchedEffect 来处理协程
LaunchedEffect(Unit) {
    try {
        val response = pokemonService.getPokemon()
        Log.d("PokemonScreen", "Response: $response")  // 使用 Log.d 代替 println
        pokemonName = response.name
        pokemonProfile = response.profile
        pokemonIndex = response.index
        pokemonName_en = response.name_en
        pokemonName_jp = response.name_jp

        // 获取第一个形态的图片
        imageUrl = if (response.forms.isNotEmpty()) {
            baseImageUrl + response.forms[0].image
        } else {
            ""
        }

        //获取types
        pokemonTypes = if (response.forms.isNotEmpty()) {
            response.forms[0].types
        } else {
            emptyList()
        }

    } catch(e: Exception) {
        Log.e("PokemonScreen", "Error fetching data", e)
    }
}
```

# 允许http链接

安卓默认不允许链接http，如果需要，可以修改`AndroidManifest.xml`文件。

增加网络安全规则

```xml
<application
    android:networkSecurityConfig="@xml/network_security_config"
/>
```

在 res - xml - 创建network_security_config.xml文件，编辑以下规则：

```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <base-config cleartextTrafficPermitted="true">
        <trust-anchors>
            <certificates src="system" />
        </trust-anchors>
    </base-config>
</network-security-config>
```