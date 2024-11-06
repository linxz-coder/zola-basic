+++
title = "rust控制流-条件及循环"
date = 2024-11-06
+++

rust控制流

# if表达式

```rust
fn main() {
    let number = 3;

    if number < 5 {
        println!("condition was true");
    } else {
        println!("condition was false");
    }
}
```

## 在let语句中使用if

```rust
fn main() {
    let condition = true;
    let number = if condition { 5 } else { 6 };

    println!("The value of number is: {number}");
}
```

如果在JavaScript中，需要通过三目表达式来完成。如：

```javascript
let number = condition ? 5 : 6;
```

# 循环
## 使用loop循环
```rust
fn main() {
    loop {
        println!("again!");
    }
}
```

注意，以上代码会无限循环，需要在适当时候break:

```rust
fn main() {
    let mut counter = 0;

    let result = loop {
        counter += 1;

        if counter == 10 {
            break counter * 2;
        }
    };

    println!("The result is {result}");
}
```

## 使用while循环

```rust
fn main() {
    let mut number = 3;

    while number != 0 {
        println!("{number}!");

        number -= 1;
    }

    println!("LIFTOFF!!!");
}
```

## 使用for循环
```rust
fn main() {
    let a = [10, 20, 30, 40, 50];

    for element in a {
        println!("the value is: {element}");
    }
}
```

