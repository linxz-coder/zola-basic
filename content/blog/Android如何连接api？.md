+++
title = "Android如何连接api？"
date = 2025-01-16
authors = ["小中"]
[taxonomies]
tags = ["安卓"]

+++

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
data class Category(
    val idCategory: String,
    val strCategory: String,
    val strCategoryThumb: String,
    val strCategoryDescription: String
)

data class CategoriesResponse(
    val categories: List<Category>
)
```

# 准备基础连接环境

创建一个文件叫`ApiService`，输入以下代码：

```kt
import retrofit2.Retrofit
import retrofit2.http.GET
import retrofit2.converter.gson.GsonConverterFactory

private val retrofit = Retrofit.Builder().baseUrl("https://www.themealdb.com/api/json/v1/1/")
        .addConverterFactory(GsonConverterFactory.create())
        .build()

val recipeService = retrofit.create(ApiService::class.java)

interface ApiService{
    @GET("categories.php")
    suspend fun getCategories():CategoriesResponse
}
```
