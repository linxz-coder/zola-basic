+++
title = "Android的页面导航和跳转"
date = 2025-01-16
authors = ["小中"]
[taxonomies]
tags = ["安卓"]
+++

[官方Navigation参考](https://developer.android.com/guide/navigation#kts)

# 添加依赖项

在build.gradle.kts里面添加依赖

```kt
val nav_version = "2.8.5"

// Jetpack Compose integration
implementation("androidx.navigation:navigation-compose:$nav_version")

// Views/Fragments integration
implementation("androidx.navigation:navigation-fragment:$nav_version")
implementation("androidx.navigation:navigation-ui:$nav_version")

// Feature module support for Fragments
implementation("androidx.navigation:navigation-dynamic-features-fragment:$nav_version")

// Testing Navigation
androidTestImplementation("androidx.navigation:navigation-testing:$nav_version")
```

# 主页面设置跳转逻辑

```kt
@Composable
fun MyApp(modifier: Modifier = Modifier){
    val navController = rememberNavController()
    NavHost(navController = navController, startDestination = "firstScreen"){
        composable("firstScreen"){
            FirstScreen {
                navController.navigate("secondScreen")
            }
        }
        composable("secondScreen"){
            SecondScreen {
                navController.navigate("firstScreen")
            }
        }
    }
}
```

# 分页面添加跳转函数

`navigationToSecondScreen: ()->Unit`

```kt
@Composable
fun FirstScreen(navigationToSecondScreen: ()->Unit){
    var name by remember { mutableStateOf("") }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text("This is the First Screen", fontSize = 24.sp)
        Spacer(modifier = Modifier.height(16.dp))
        OutlinedTextField(value = name, onValueChange = {
            name = it
        })
        Button(onClick = {
            navigationToSecondScreen()
        }) {
            Text("Go to Second Screen")
        }
    }
}
```
