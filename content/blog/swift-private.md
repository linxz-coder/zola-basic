+++
title = "swift里面的private是什么意思？"
date = 2024-11-21
+++

只能在class内部访问，而不能在外部访问。

## 带private

```swift
class MyClass {
    private let filenameTextField: UITextField = UITextField()
    
    func configureTextField() {
        filenameTextField.placeholder = "Enter filename"
    }
}
```

## 不带private：可以在class外部访问，不安全

```swift
class MyClass {
    let filenameTextField: UITextField = UITextField()
}

let myClass = MyClass()
myClass.filenameTextField.text = "Some text" // 外部可以直接访问和修改
```
