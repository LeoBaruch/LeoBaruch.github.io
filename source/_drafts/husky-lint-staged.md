---
title: husky+lint-staged
tags: 前端工程化
---


## 简介
- husky:

  - husky是一个为 git 客户端增加 hook 的工具，githooks - git使用的工具 (githook在官网的介绍)，比如 pre-commit 钩子就会在你执行 git commit 的触发

  - 由于钩子可以在git commit中触发，所以我们可以在提交到暂缓区时，做一些lint 检查、单元测试、代码美化等操作

- lint-staged: 一个仅仅过滤出 Git 代码暂存区文件(被 git add 的文件)的工具

<!--more-->

## 安装与使用

### husky（最好参照官网，实时更新）:

```javascript
npx husky-init && npm install       # npm
npx husky-init && yarn              # Yarn 1
yarn dlx husky-init --yarn2 && yarn # Yarn 2+
pnpm dlx husky-init && pnpm install # pnpm

```
这行命令会修改package.json文件，设置并初始化一个pre-commit钩子的小样供你编辑，添加你想要的操作, 默认是: npm test;

```javascript

// package.json scripts会添加两行
scripts: {
  "prepare": "husky install",
  "lint-staged": "lint-staged"
}

```
```js
// 新增 .husky文件夹 其中 pre-commit文件npm test改成其他命令
// 比如后面添加的lint-staged 
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint-staged # npm test

```
### lint-staged

```js
npm i lint-staged  -D
```
然后在package.json里面配置

```js
  "lint-staged": {
    "src/**/*.{js,vue}": [
      "prettier --write",
      "eslint --fix",
      "git add"
    ]
  }

```
因为上文husky 在pre-commit的时候会运行**npm run lint-staged**命令，然后执行scripts里面的lint-staged, 最后找到lint-staged里面配置执行下面三条：

- 第一条命令是将代码进行格式化，用prettier这个代码格式化插件进行代码格式化。
- 第二条命令是将格式化的代码上有eslint问题，进行修复。
- 第三条命令是将处理过的代码重新 add 到 git 中。




