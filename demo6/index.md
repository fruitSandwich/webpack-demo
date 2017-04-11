# 使用Webpack制作Library

前面几节内容都是关于如何使用Webpack打包应用源码。webpack也可以打包library源码。

> library 一般作为app的第三方依赖。

下面举一个官方的<a href='https://github.com/kalcifer/webpack-library-example'>例子</a>


## 1. library源码和期望使用方式

假设我们写了一个小library叫做webpack-numbers，用来相互转换数字和英文。
用ES2015模块实现，看起来可能是这样子的:

src/index.js

```
import _ from 'lodash';
import numRef from './ref.json';

export function numToWord(num) {
    return _.reduce(numRef, (accum, ref) => {
        return ref.num === num ? ref.word : accum;
    }, '');
};

export function wordToNum(word) {
    return _.reduce(numRef, (accum, ref) => {
        return ref.word === word && word.toLowerCase() ? ref.num : accum;
    }, -1);
};
```

我们期望这样来使用这个库:

```
import * as webpackNumbers from 'webpack-numbers';

...
webpackNumbers.wordToNum('Two') // output is 2
...

// 或者 CommonJS modules

var webpackNumbers = require('webpack-numbers');

...
webpackNumbers.numToWord(3); // output is Three
...

```

或者直接在html中引入:


```
<html>
...
<script src="./webpack-numbers.js"></script>
<script>
    ...
    /* webpackNumbers is available as a global variable */
    webpackNumbers.wordToNum('Five') //output is 5
    ...
</script>
</html>
```

## 2. 配置webpack

有了上面的逻辑，接下来的目标就是打包这个library，打包时需要满足下面几个条件:

- 不打包依赖项loadash，让用户自己加载
- 打包文件名为webpack-numbers，全局变量名为webpackNumbers
- library可以使用ES6模块(import webpackNumbers from 'webpack-numbers')
也可以使用CommonJs模块(require('webpack-numbers'))
- 在html中使用script标签引入包之后用全局变量webpackNumbers引用包
- library可以在Node.js中使用

1. 添加webpack配置

    添加webpack基础配置

    webpack.config.js
    ```
    var path = require('path');

    module.exports = {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'webpack-numbers.js'
        }
    };
    ```

    打包library的基础配置，打包结果如下:

    ```
    Hash: 72c6fab03f354a3dab68
    Version: webpack 2.3.3
    Time: 545ms
                 Asset    Size  Chunks                    Chunk Names
    webpack-numbers.js  545 kB       0  [emitted]  [big]  main
       [0] ./~/lodash/lodash.js 540 kB {0} [built]
       [1] ./src/ref.json 235 bytes {0} [built]
       [2] (webpack)/buildin/global.js 509 bytes {0} [built]
       [3] (webpack)/buildin/module.js 517 bytes {0} [built]
       [4] ./src/index.js 436 bytes {0} [built]
    ```

2. 添加externals(外部依赖)

    上面的打包结果是，index.js和依赖项lodash.js打包到一块去了。
    library在设计上应当纯粹，即使使用了第三方依赖项也不应该在library中包含第三方的代码。
    所以在打包的时候需要告诉webpack忽略外部依赖项。

    可以使用webpack的externals配置项来实现:

    ```
    module.exports = {
        ...
        externals: {
            "lodash": {
                commonjs: "lodash",
                commonjs2: "lodash",
                amd: "lodash",
                root: "_"
            }
        }
        ...
    };
    ```

    这意味着library中所有引入的lodash比如(import 'lodash'或 requre('lodash'))
    都会使用客户环境中访问到对应的内容。

    > externals对象的key是给require时用的，比如require('react')，
    对象的value表示的是如何在global（即window）中访问到该对象，这里是window.React。

3. 添加 libraryTarget

    为了在各种环境下使用library，我们需要让library兼容各种环境。比如CommonJS,AMD,node.js还有作为全局变量。
    必须添加library、libraryTarget配置项。

    ```
    module.exports = {
        ...
        output: {
            ...
            library: 'webpackNumbers',
            libraryTarget: 'umd' // Possible value - amd, commonjs, commonjs2, commonjs-module, this, var
        }
        ...
    };
    ```

    umd output效果(可以适配各种环境):

    ```
    (function webpackUniversalModuleDefinition(root, factory) {
        if(typeof exports === 'object' && typeof module === 'object')
            module.exports = factory();
        else if(typeof define === 'function' && define.amd)
            define("MyLibrary", [], factory);
        else if(typeof exports === 'object')
            exports["MyLibrary"] = factory();
        else
            root["MyLibrary"] = factory();
    })(this, function() {
        //what this module returns is what your entry chunk returns
    });
    ```

    如果libraryTarget没有指定，默认为var模式即导出为全局变量。

## 3. 配置npm package主文件

把打包好的bundle作为package的主文件,配置package.json:

```
    "main": "dist/webpack-numbers.js",
    "module": "src/index.js", // To add as standard module as per https://github.com/dherman/defense-of-dot-js/blob/master/proposal.md#typical-usage
```

参考:
- <a href='https://webpack.js.org/guides/author-libraries/'>webpack author-libraries</a>
- <a href='https://docs.npmjs.com/files/package.json#main'>package.json配置</a>

