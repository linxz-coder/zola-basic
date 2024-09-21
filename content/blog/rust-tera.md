+++
title = "如何使用rust的引擎模版tera"
date = 2024-09-21
+++

# tera是什么
tera是一个用于渲染模板的引擎，类似于jinja2。它可以使用rust语言编写html模版，然后渲染成正式的html文件。

而jinjia2是python的模板引擎，可以使用python语言渲染html模版。

好处是，可以在html中使用rust的语法，比如if else，for循环等。

# 新建一个rust项目
```shell
cargo new tera-demo
cd tera-demo
```

# 添加tera依赖
在Cargo.toml中添加tera依赖：
```toml
[dependencies]
tera = "1.20.0"
actix-web = "4.4.0"
```

actix-web是为了可以在浏览器中实时查看渲染后的html文件。

# 创建一个html模版
在根目录下新建一个templates目录，然后新建一个hello.html文件：
```html
<h1>虽然，非常开心, 你好， {{ name }}!</h1>
```

# 修改main.rs文件
在src目录下新建一个main.rs文件，然后添加以下代码：
```rust
use actix_web::{get, App, HttpResponse, HttpServer, Responder};
use tera::Tera;
use std::sync::Mutex;

struct AppState {
    tera: Mutex<Tera>,
}

#[get("/")]
async fn index(data: actix_web::web::Data<AppState>) -> impl Responder {
    let tera = data.tera.lock().unwrap();
    let mut context = tera::Context::new();
    context.insert("name", "世界");

    match tera.render("hello.html", &context) {
        Ok(rendered) => HttpResponse::Ok()
            .content_type("text/html; charset=utf-8")
            .body(rendered),
        Err(e) => HttpResponse::InternalServerError().body(format!("Rendering error: {}", e)),
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let tera = match Tera::new("templates/**/*") {
        Ok(t) => t,
        Err(e) => {
            println!("Parsing error(s): {}", e);
            std::process::exit(1);
        }
    };

    println!("Server running at http://localhost:8080");

    HttpServer::new(move || {
        App::new()
            .app_data(actix_web::web::Data::new(AppState {
                tera: Mutex::new(tera.clone()),
            }))
            .service(index)
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
```

# 安装cargo-watch
```shell
cargo install cargo-watch
```

# 运行项目
```shell
cargo watch -x run
```

现在，打开浏览器，输入http://localhost:8080，就可以看到渲染后的html文件了。

注意，更新代码后浏览器并不会自动刷新，需要手动刷新。
