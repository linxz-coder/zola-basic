+++
title = "如何使用github actions？"
date = 2024-09-21
+++

## 获取一个github actions权限的toekn
github首页 -> settings -> Developer settings -> Personal access tokens -> Generate new token

勾选actions即可，这样会生成token，请保存下来。（我选择token有效期为永久，具体根据自己需求）

## 项目中打开workflow权限
在项目中，选择settings -> Actions -> General -> 勾选 Read and write permissions

## 在仓库中添加token，给github actions权限
在项目中，选择settings -> Secrets and variables -> actions -> New repository secret

随便改一个名字，比如我的是`ACTIONS_PAT`，然后把刚才生成的token粘贴进去。

## 创建workflow文件
在项目中，新建`.github/workflows`文件夹，然后新建一个`.yml`文件，比如`generate_readme.yml`。


我需要实现一个功能，每次push代码时，自动更新README.md文件，作为我的博客目录。

```yml
name: Generate README

on:
  push:
    branches:
      - main  # 当推送到主分支时触发
  pull_request:
    branches:
      - main

jobs:
  generate-readme:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Install Python
        uses: actions/setup-python@v2
        with:
          python-version: 3.x

      - name: Install dependencies
        run: |
          pip install markdown
          pip install PyYAML

      - name: Generate README
        run: python generate_readme.py

      - name: Commit and push changes
        env:
          GITHUB_TOKEN: ${{ secrets.ACTIONS_PAT }}
        run: |
          git config --local user.email "your-email@example.com"
          git config --local user.name "github-actions[bot]"
          git add README.md
          git commit -m "Auto-generate README with md file index"
          git push
```

## 编写python脚本
在项目中，新建一个`generate_readme.py`文件，用于生成README.md文件。

```python
import os
import yaml

def extract_info_from_md(md_file):
    with open(md_file, 'r', encoding='utf-8') as file:
        lines = file.readlines()
    
    # 提取 front matter 部分
    if lines[0].strip() == "---":
        front_matter = []
        for line in lines[1:]:
            if line.strip() == "---":
                break
            front_matter.append(line)
        front_matter = yaml.safe_load(''.join(front_matter))
        return front_matter
    return None

def generate_readme(md_files):
    readme_content = "# 项目文档目录\n\n"
    for md_file in md_files:
        info = extract_info_from_md(md_file)
        if info:
            title = info.get('title', '无标题')
            # 这里使用 GitHub 仓库中的相对路径生成 URL
            url = f"./{md_file}"
            readme_content += f"- [{title}]({url})\n"
    return readme_content

def main():
    md_files = [f for f in os.listdir('.') if f.endswith('.md') and f != 'README.md']
    readme_content = generate_readme(md_files)
    
    with open('README.md', 'w', encoding='utf-8') as f:
        f.write(readme_content)

if __name__ == "__main__":
    main()
```

这样一来，每次push代码时，github actions会自动运行workflow，自动生成README.md文件。

## 参考
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [阮一峰的 GitHub Actions 入门教程](https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)