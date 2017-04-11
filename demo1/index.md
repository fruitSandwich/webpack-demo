# Webpack的简单使用

## 1.模块化场景
有一个非常简单的Web应用，只有三个文件:index.html、index.js、jquery.min.js。其中index.html中引用index.js和jquery，index.js中又使用jquery操作了index.html中的dom，代码如下:

index.html
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div id="app"></div>

<script src="jquery.min.js"></script>
<script src="index.js"></script>
</body>
</html>
```

index.js
```
$("#app").text('hello world')
```

最终Web<a href='./origin/index.html'>渲染效果</a>：

hello world

符合预期。

但是如果我们把index.js和jquery的加载顺序换一下呢?比如：
error.html
```
<script src="index.js"></script>
<script src="jquery.min.js"></script>
```
先加载index.js后加载jquery.min.js，此时浏览器会<a href='./origin/error.html'>报错</a>：

```
Uncaught ReferenceError: $ is not defined
    at index.js:1
```

浏览器是按html中的引入script标签的顺序加载执行js文件的。加载运行index.js的时候其中使用了$此时jquery还没有引入所以报错了。
在引入script比较少的时候可以人为的控制引入的顺序，已达到依赖加载的顺序，但是使用的模块多的时候会变得非常难以维护。

很多web插件一般都要引入一套js一套css，有些甚至除了引入自身的js和css还要在引入自身之前引入自身依赖，比如很多jquery插件就需要在引入之前先引入jquery。

这时候需要模块化系统来管理这些依赖，关于模块化系统可以参考<a href='http://blog.fruitsandwich.cc/javascript-module/'>javascript模块化</a>。

模块化可选择：
- requireJs
- SeaJs
- Browserify
- Webpack

这里我们介绍Webpack的用法和介绍

## 2.全局安装在命令行下使用Webpack

全局安装webpack
```
npm install webpack -g
```
修改第一节的index.html、index.js

index.js
```
import $ from '../jquery.min.js';//先引入依赖

$("#app").text('hello world');
```
执行webpack命令:

```
webpack index.js bundle.js
```

执行结果:
```
Hash: 1c954abadece24c4100d
Version: webpack 2.3.1
Time: 386ms
    Asset     Size  Chunks             Chunk Names
bundle.js  90.3 kB       0  [emitted]  main
   [0] ../jquery.min.js 86.7 kB {0} [built]
   [1] (webpack)/buildin/amd-options.js 82 bytes {0} [built]
   [2] ./index.js 74 bytes {0} [built]
```

修改index.html，引入编译后的script
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<div id="app"></div>

<script src="bundle.js"></script>
<!--引入打包编译后的文件-->
</body>
</html>
```

运行后如预期<a href='./dist/index.html'>渲染效果</a>：

hello world