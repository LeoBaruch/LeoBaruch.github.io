---
title: commit-message
date: 2022-05-26 22:27:48
tags: git 
categories: git
---

## Commit message 提交标准

Git 每次提交代码，都要写 Commit message（提交说明），否则就不允许提交, 一般来说，commit message 应该清晰明了，说明本次提交的目的

本文介绍的是[Angular 规范](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#)

<!--more-->

### commit message的格式

包含: Header、Body和Footer

```html
<type>(<scope>): <subject>
// 空一行
<body>
// 空一行
<footer>
```
其中，Header 是必需的，Body 和 Footer 可以省略,暂时不讲

不管是哪一个部分，任何一行都不得超过72个字符（或100个字符）,简短,保持美观

#### Header

Header部分只有一行，包括三个字段：
- type（必需）
- scope（可选）
- subject（必需）

##### type

type用于说明 commit 的类别，只允许使用下面7个标识。

```
feat：新功能（feature）
fix：修补bug
docs：文档（documentation）
style： 格式（不影响代码运行的变动）
refactor：重构（即不是新增功能，也不是修改bug的代码变动）
test：增加测试
chore：构建过程或辅助工具的变动
```

如果type为feat和fix，则该 commit 将肯定出现在 Change log 之中。其他情况（docs、chore、style、refactor、test）由你决定，要不要放入 Change log，建议是不要。

##### scope

scope用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。

##### subject

subject是 commit 目的的简短描述，不超过50个字符。

比较规范的提交应该如下:

{% asset_img commit.png 'commit' %}


