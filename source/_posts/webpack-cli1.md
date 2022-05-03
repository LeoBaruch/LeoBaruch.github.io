---
title: webpack-cli 源码解析(上)
date: 2022-05-03 22:32:11
tags: 前端工程化
categories: 
  - webpack
---

文中所引用的源码版本:

- webpack@4.46.0

## webpack 命令

当我们在项目中的package.json中的字段“scripts”对象配置属性: "build": "webpack entry.js bundle.js" . 然后npm run build会发生什么呢?

首先npm会让命令行工具进入node_modules/.bin目录中查询是否存在“**webpack**“命令,若存在则执行,没找到则报错.实际命令的入口文件是“webpack”这个npm包的package.json中bin字段的文件路径, 即 node_modules/webpack/bin/webpack.js.

```js
"bin": "./bin/webpack.js",
```

## 分析 /bin/webpack.js源码

大致流程是,判断是否安装了命令行工具webpack-cli(或者webpack-command, 默认webpack-cli), 

- 若没有安装,则提示安装webpack-cli,
- 若安装了其中一个,则引用(执行)
- 若两个命令行工具都安装了,则提示卸载其中一个或者直接执行他们自己的命令(webpack-cli xx xx). 原文: ***please remove one of them or use them directly via their binary***.


### 判断命令行是否安装逻辑

```js
// 使用node内部的 require() 工具查找模块的位置，但不加载模块，只返回解析的文件名。
// 如果找不到模块，则会抛出 MODULE_NOT_FOUND 错误。
const isInstalled = packageName => {
	try {
		require.resolve(packageName);

		return true;
	} catch (err) {
		return false;
	}
};

const CLIs = [
	{
		name: "webpack-cli",
		package: "webpack-cli",
		binName: "webpack-cli",
		alias: "cli",
		installed: isInstalled("webpack-cli"),
		recommended: true,
		url: "https://github.com/webpack/webpack-cli",
		description: "The original webpack full-featured CLI."
	},
	{
		name: "webpack-command",
		package: "webpack-command",
		binName: "webpack-command",
		alias: "command",
		installed: isInstalled("webpack-command"),
		recommended: false,
		url: "https://github.com/webpack-contrib/webpack-command",
		description: "A lightweight, opinionated webpack CLI."
	}
];

const installedClis = CLIs.filter(cli => cli.installed);

```

### 没有安装命令行

当上面代码中的**installedClis.length === 0**时,即没有安装任何命令行工具,则提示安装webpack-cli

```js

  const runCommand = (command, args) => {
    const cp = require("child_process");
    return new Promise((resolve, reject) => {
      const executedCommand = cp.spawn(command, args, {
        stdio: "inherit",
        shell: true
      });

      executedCommand.on("error", error => {
        reject(error);
      });

      executedCommand.on("exit", code => {
        if (code === 0) {
          resolve();
        } else {
          reject();
        }
      });
    });
  };
  // 判断是否使用yarn安装包
	const isYarn = fs.existsSync(path.resolve(process.cwd(), "yarn.lock"));

	const packageManager = isYarn ? "yarn" : "npm";
	const installOptions = [isYarn ? "add" : "install", "-D"];

	console.error(
		`We will use "${packageManager}" to install the CLI via "${packageManager} ${installOptions.join(
			" "
		)}".`
	);

	const question = `Do you want to install 'webpack-cli' (yes/no): `;

	const questionInterface = readLine.createInterface({
		input: process.stdin,
		output: process.stderr
	});
	questionInterface.question(question, answer => {
		questionInterface.close();

		const normalizedAnswer = answer.toLowerCase().startsWith("y");

		if (!normalizedAnswer) {
			console.error(
				"You need to install 'webpack-cli' to use webpack via CLI.\n" +
					"You can also install the CLI manually."
			);
			process.exitCode = 1;

			return;
		}

		const packageName = "webpack-cli";

		console.log(
			`Installing '${packageName}' (running '${packageManager} ${installOptions.join(
				" "
			)} ${packageName}')...`
		);
    // 安装完webpack-cli 后 require 引入
		runCommand(packageManager, installOptions.concat(packageName))
			.then(() => {
				require(packageName); //eslint-disable-line
			})
			.catch(error => {
				console.error(error);
				process.exitCode = 1;
			});
	});
```

### 只安装了一个命令行工具

```js
  const path = require("path");
  // 解析出package.json路径
	const pkgPath = require.resolve(`${installedClis[0].package}/package.json`);
	const pkg = require(pkgPath);
  // 注意: 这里是为了拼接引入bin命令的文件,而不是模块主入口(默认引入“main”字段)
	require(path.resolve(
    // package.json所在目录
		path.dirname(pkgPath),
    // bin字段的入口文件相对路径
		pkg.bin[installedClis[0].binName]
	));

```








