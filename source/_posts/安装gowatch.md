---
title: 安装gowatch
date: 2022-09-29 23:31:40
tags: go
categories: go
---

安装gowatch

<!--more-->

```go
go get github.com/silenceper/gowatch
```

安装完后在GOPATH的bin目录下, 把gowath 移动到全局(GOROOT)的bin目录下, 使用 go env查看目录

```go
go env
```
得到, 其中包含目录GOPATH及GOROOT

```
GO111MODULE="on"
GOARCH="arm64"
GOBIN=""
GOCACHE="/Users/gexiaolong/Library/Caches/go-build"
GOENV="/Users/gexiaolong/Library/Application Support/go/env"
GOEXE=""
GOEXPERIMENT=""
GOFLAGS=""
GOHOSTARCH="arm64"
GOHOSTOS="darwin"
GOINSECURE=""
GOMODCACHE="/Users/gexiaolong/go/pkg/mod"
GONOPROXY=""
GONOSUMDB=""
GOOS="darwin"
GOPATH="/Users/gexiaolong/go"
GOPRIVATE=""
GOPROXY="https://goproxy.cn,direct"
GOROOT="/usr/local/go"
GOSUMDB="sum.golang.org"
```
最后移动 sudo mv /Users/gexiaolong/go/bin/gowatch  /usr/local/go/bin/gowatch 成功后就可以在 项目中直接使用gowatch命令了

