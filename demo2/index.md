# Webpack项目环境和配置

## 1.项目环境下使用Webpack

demo1中在全局安装webpack的环境下使用webpack命令实现了打包编译:
```
npm install webpack -g

webpack index.js bundle.js
```

也可以脱离全局环境在项目环境中安装Webpack

```
npm install --save-dev webpack

node_modules/.bin/webpack index.js bundle.js
```

可以使用npm script启动简化命令,首先package.json添加 npm scripts
```
 "scripts": {
    "build": "webpack index.js bundle.js"
  },
```
启动编译
```
npm run build
```

这样即使主机环境没有安装webpack也可以通过项目启动webpack，这也是很多项目通常的做法。

## 2.webpack配置
前面的例子里不管是全局环境webpack命令或者是项目环境下通过npm script启动webpack都是直接使用webpack
命令+参数的形式调用的webpack。如果参数非常长的话每次调用会非常麻烦比如：
```
webpack entry.js bundle.js --module-bind 'css=style-loader!css-loader'
```

Webpack 在执行的时候，除了在命令行传入参数，还可以通过指定的配置文件来执行。
默认情况下，会搜索当前目录的 webpack.config.js 文件，这个文件是一个 node.js 模块，返回一个 json 格式的配置信息对象，
或者通过 --config 选项来指定配置文件。

实现上面"webpack index.js bundle.js"的config:

webpack.config.js
```
var path = require('path');

module.exports = {
    entry: './index.js',//入口
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};
```

如果webpack.config.js在当前运行目录下，直接运行webpack命令即可，或者指定config文件：

```
webpack --config demo2/webpack.config.js

或写进npm script：

"scripts": {
    "demo2": "webpack --config demo2/webpack.config.js"
  }

npm run demo2
```

