+++
title = "rust-cargo是什么？"
date = 2024-11-05
+++

Cargo 是内置的依赖管理器和构建工具，它能轻松增加、编译和管理依赖，并使依赖在 Rust 生态系统中保持一致。

类似于JavaScript的NPM（包管理工具）。

用Cargo的优势：`不管你用什么操作系统，操作命令都是一样的`。

# 安装cargo

```bash
cargo version
```

# 用cargo创建新项目

```bash
cargo new hello_cargo
```

# cargo编译

```bash
cargo build
```

# cargo运行程序

```bash
./target/debug/hello_cargo
```

# 编译带运行的快捷方式

可以不用build和手动运行，直接run。

```bash
cargo run
```

# 快速检查
```bash
cargo check
```

# cargo发布生产环境
```bash
cargo build release
```
