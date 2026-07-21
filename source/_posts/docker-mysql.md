---
title: 使用 Docker Desktop 配置 MySQL
tags:
  - Docker
  - MySQL
categories:
  - Docker
date: 2026-07-21 11:35:48
---

本文记录如何通过 Docker Desktop 快速创建一个本地 MySQL 容器，并将数据库文件持久化到宿主机。

<!--more-->

## 配置一览

{% asset_img mysql-docker-desktop-config.svg 'Docker Desktop 运行 MySQL 配置示意图' %}

| 配置项 | 填写内容 | 说明 |
| --- | --- | --- |
| Image | `mysql:latest` | MySQL 官方镜像 |
| Container name | `mysql-local-dev` | 本地开发用 MySQL 容器 |
| Host port | `3306` | 映射到容器的 `3306/tcp` |
| Host path | `/Users/developer/docker-data/mysql` | 宿主机数据目录，可按实际路径调整 |
| Container path | `/var/lib/mysql` | MySQL 默认数据目录 |
| Environment variable | `MYSQL_ROOT_PASSWORD=Aa123456` | 设置 `root` 用户密码 |

> `33060/tcp` 是 MySQL X Protocol 端口，普通本地开发可以不映射。

## Docker Desktop 操作步骤

1. 在 Docker Desktop 中搜索并拉取 `mysql:latest` 镜像。
2. 点击 **Run**，按上表填写容器名、端口、数据卷和环境变量。
3. 点击 **Run** 启动容器。
4. 在 **Containers** 页面确认 `mysql-local-dev` 状态为 Running。

启动前先创建数据目录：

```bash
mkdir -p ~/docker-data/mysql
```

如果希望使用表格中的绝对路径，请将 `developer` 替换为当前 macOS 用户名。

## 等价的命令行配置

```bash
docker run -d \
  --name mysql-local-dev \
  -p 3306:3306 \
  -v ~/docker-data/mysql:/var/lib/mysql \
  -e MYSQL_ROOT_PASSWORD=Aa123456 \
  --restart unless-stopped \
  mysql:latest
```

查看容器状态：

```bash
docker ps --filter name=mysql-local-dev
```

进入 MySQL：

```bash
docker exec -it mysql-local-dev mysql -uroot -p
```

出现密码提示后输入 `Aa123456`。

## 常见问题

- **端口被占用**：将端口映射改为 `3307:3306`，连接时使用宿主机端口 `3307`。
- **数据无法写入**：检查宿主机目录是否存在，以及 Docker Desktop 是否有权访问该目录。
- **忘记密码**：修改环境变量后仅重启容器不会生效；本地测试环境可重新创建容器和数据目录。

> 这里的密码仅用于本地学习示例，正式环境应使用随机强密码或 Docker Secrets。
