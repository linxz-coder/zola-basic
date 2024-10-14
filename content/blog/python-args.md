+++
title = "如何要求用户在terminal输入python脚本参数？"
date = 2023-11-13
+++

比如：

```bash
python run.py hello
```

需要用到`argparse`库，run.py的代码如下：

```python
import argparse

def main():
    parser = argparse.ArgumentParser(description="请输入hello或者yes")
    parser.add_argument("command", choices=['hello', 'yes'], 
                        help="Command to execute: 'hello' or 'yes'")
    
    args = parser.parse_args()

    if args.command == 'hello':
        print("hello world")
    elif args.command == 'yes':
        print("yes man")

if __name__ == "__main__":
    main()
```

以上代码指用户可以输入`hello`或者`yes`获取不同的输出。

以上功能可以用`sys`模块来完成，但是sys实现起来比较功能比较少，一般很少用，仅供参考：

```python
import sys

def main():
    if len(sys.argv) ! = 2:
        print("Usage: python fun.py [hello/yes]")
        sys.exit(1)

    command = sys.argv[1]

    if command == 'hello':
        print("hello world")
    elif command == 'yes':
        print("yes man")
    else:
        print("Invalid command. Use 'hello' or 'yes'.")

if __name__ == "__main__":
    main()
```

