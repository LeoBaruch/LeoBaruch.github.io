---
title: conda安装与使用
tags:
  - conda
  - python
categories:
  - python
date: 2025-06-22 18:10:19
---

## conda 安装

<!--more-->

以下为 mac 环境安装命令

### 1.安装

```bash
mkdir -p ~/miniconda3
curl https://repo.anaconda.com/miniconda/Miniconda3-latest-MacOSX-arm64.sh -o ~/miniconda3/miniconda.sh
# intel 芯片
# curl https://repo.anaconda.com/miniconda/Miniconda3-latest-MacOSX-x86_64.sh -o ~/miniconda3/miniconda.sh
bash ~/miniconda3/miniconda.sh -b -u -p ~/miniconda3
rm -rf ~/miniconda3/miniconda.sh

```

### 2.初始化

```
~/miniconda3/bin/conda init bash
~/miniconda3/bin/conda init zsh

```

### 3.新建终端，检查 conda 是否安装成功

```bash
conda --version

```

## conda 常用命令

### 通用环境配置

- 新建虚拟环境: conda create -n [环境名] [python 版本]

```bash
conda create -n llm-universe python=3.10
```

- 激活虚拟环境: conda activate [环境名]

```bash
conda activate llm-universe
```

- 查看当前环境: conda info --envs, 或者 conda env list. 这两个命令都会列出您系统中的所有 Conda 环境及其存储路径。当前正在使用的活动环境名称旁边会显示一个星号 (\*)
- 退出 anaconda 虚拟环境: conda deactivate
- 默认不进入 anaconda 的 base 环境: conda config --set auto_activate_base false
