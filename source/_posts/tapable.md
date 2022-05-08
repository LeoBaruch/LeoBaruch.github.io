---
title: tapable
tags: 前端工程化
categories: 
  - webpack
---

在阅读webpack的源码过程中,发现webpack编译的两个核心对象**Compiler**和**Compilation**都是继承自tapable, :

- Compiler: 负责整体编译流程的
- Compilation: 负责编译Module

所以熟悉tapable还是很有必要的,而apable本质上实现了一种**发布订阅模式**.

<!--more-->

## Tapable使用

### 版本

```js
  "tapable": "^2.2.1"
```


### 使用及分类

官方一共提供了9种钩子

```js
const {
	SyncHook,
	SyncBailHook,
	SyncWaterfallHook,
	SyncLoopHook,
	AsyncParallelHook,
	AsyncParallelBailHook,
	AsyncSeriesHook,
	AsyncSeriesBailHook,
	AsyncSeriesWaterfallHook
 } = require("tapable");

```

#### 基本使用

- 1. new 实例化一个钩子函数, 接收两个参数: 
  - 参数一: 为字符串数组, 数组中的值不重要,数组中个数对应后面监听方法tap的回调函数形参和触发事件方法call的实参个数; 
  - 参数二: 应用较少不需要额外介绍(官方文档也无体现)

- 2. tap函数 监听对应的事件，注册事件时接受两个参数：
  - 参数一: 字符串(作为标识位)或对象(可以额外设置触发优先级等)
  - 参数二: 回调函数, 形参对应步骤1中参数一的字符串数组个数

- 3. call函数 触发步骤二中tap中的回调函数

#### 分类

##### 按照同步/异步分类

Tapable 中所有注册的事件可以分为同步、异步两种执行方式:

- 同步钩子: tap 方法是唯一的注册事件的方法，call 唯一调用方法

- 异步钩子可以通过 tap、tapAsync、tapPromise三种方式来注册，并依次通过对应的 call、callAsync、promise 三种方式触发注册的函数。

且异步钩子也分为两类:

- 异步串行( AsyncSeries )：可以被串联（连续按照顺序调用）执行的异步钩子。

- 异步并行( AsyncParallel )：可以被并联（并发调用）执行的异步钩子。

{% asset_img 同异步分类.webp '同异步分类' %}

##### 按照执行机制分类

Tapable 可以按照异步/同步执行分类的同时也可以按照执行机制进行分类，比如：

- **Basic Hook** : 基本类型的钩子，它仅仅执行钩子注册的事件，并不关心每个被调用的事件函数返回值如何。

- **Bail** : 保险类型钩子，保险类型钩子在基础类型钩子上增加了一种保险机制，如果任意一个注册函数执行返回非 undefined 的值，那么整个钩子执行过程会立即中断，之后注册事件函数就不会被调用了。

- **Waterfall** : 瀑布类型的钩子，瀑布类型的钩子和基本类型的钩子基本类似，唯一不同的是瀑布类型的钩子会在注册的事件执行时将事件函数执行非 undefined 的返回值传递给接下来的事件函数作为参数。

- **Loop** : 循环类型钩子，循环类型钩子稍微比较复杂一点。循环类型钩子通过 call 调用时，如果任意一个注册的事件函数返回值非 undefeind ,那么会立即重头开始重新执行所有的注册事件函数，直到所有被注册的事件函数都返回 undefined。


[demo地址](https://github.com/LeoBaruch/webpack-collection/blob/main/tapable/demo/index.js)

### 参考资料
- [https://github.com/webpack/tapable](https://github.com/webpack/tapable)
- [https://juejin.cn/post/7040982789650382855#heading-3](https://juejin.cn/post/7040982789650382855#heading-3)



















