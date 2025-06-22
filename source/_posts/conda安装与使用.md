---
title: conda安装与使用
tags:
  - conda
  - python
categories:
  - python
date: 2025-06-22 18:10:19
---


## conda安装

<!--more-->

以下为mac环境安装命令

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

## conda常用命令

### 通用环境配置

- 新建虚拟环境: conda create -n [环境名] [python版本] 
```bash
conda create -n llm-universe python=3.10
```
- 激活虚拟环境: conda activate [环境名]
```bash 
conda activate llm-universe
```
- 查看当前环境: conda info
- 查看所有安装python环境, 前面有符号*的表示当前激活环境: conda info --env
- 退出anaconda虚拟环境: conda deactivate
- 默认不进入anaconda的base环境: conda config --set auto_activate_base false