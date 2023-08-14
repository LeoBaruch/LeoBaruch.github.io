---
title: Cargo下载包太慢解决
date: 2023-08-15 00:03:37
tags: rust cargo
categories: rust cargo
---
由于Cartes仓库源是github，更新太慢了，替换成国内的源。步骤如下:

- 打开或新建用户目录下/.cargo/config文件: ~/.cargo/config
- 在文件中增加以下配置

<!--more-->

``` toml
[source.crates-io]
registry = "https://github.com/rust-lang/crates.io-index"
# 指定镜像(下面几个里选一个)
replace-with = 'tuna'

# 清华大学
[source.tuna]
registry = "https://mirrors.tuna.tsinghua.edu.cn/git/crates.io-index.git"

# 中国科学技术大学
[source.ustc]
registry = "git://mirrors.ustc.edu.cn/crates.io-index"

# 上海交通大学
[source.sjtu]
registry = "https://mirrors.sjtug.sjtu.edu.cn/git/crates.io-index"

# rustcc社区
[source.rustcc0]
registry = "https://code.aliyun.com/rustcc/crates.io-index.git"

[source.rustcc1]
registry="git://crates.rustcc.cn/crates.io-index"

[source.rustcc2]
registry="git://crates.rustcc.com/crates.io-index"

```

