# Webpack Modules(模块)和loaders(装载器)

## 1. Modules(模块)

模块化编程中，开发者将程序分割成的离散块叫做模块。

每个模块比起整个程序在验证、调试、测试上关注面更小。书写好的模块会有坚实的抽象和封装边界，
所以每个模块在整个应用中都有连贯的设计和明确的目的。

node.js在一开始就提供了模块化编程机制。然而在Web中，支持模块化的机制也渐渐出现。
webpack就是Web模块化机制的一种。

### 1.1 Webpack Module

相比于<a href='https://nodejs.org/api/modules.html'>node.js模块</a>,
webpack模块表达依赖关系的方式更加丰富，比如：

- ES2015的import语句
- CommonJS的require()语句
- AMD的define和require语句
- css/sass/less的@import语句
- img的url比如stylesheet中的(url(...))或者html中的(<img src=...>)

### 1.2 Modules type
通过loader,webpack支持用多种语言和预处理模块。loader让webpack知道如何处理
非javascript模块还有他们的依赖一并打包。webpack社区给各种流行语言制作了loader比如：
- CoffeeScript
- TypeScript
- ESNext(Babel)
- Sass
- Less
- Stylus

### 1.3 Module Resolution(模块的解析)

resolver(解析器)是一个单独的库，通过绝对路径装载模块。一个模块可以被其他模块
作为依赖引入比如:

```
import foo from 'path/to/module'
// or
require('path/to/module')
```

依赖模块可以来自应用程序代码或第三方库。解析器帮助webpack找到需要引入打包的模块代码
通过每一个require或import语句。

webpack解析规则

1. Absolute paths(绝对路径)

    ```
    import "/home/me/file";

    import "C:\\Users\\me\\file";
    ```

2. Relative paths(相对路径)

    ```
    import "../src/file1";
    import "./file2"
    ```

3. Module paths(模块路径)

    ```
    import "module";
    import "module/lib/file";
    ```

## 1.4 resolve option

webpack提供了合理的默认解析方案(上一节的三种)，但还有可能有一些细节上需要修改。
webpack.config.js配置文件中,resolve配置项可以更改指定模块的解析方法。

比如:

```
{
 resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  }
}
```

下面来说说几个重要的resolve配置项

1. resolve.alias(别名)

    给某些模块创建一个别名，让他们import或require更方便。比如给src下的某个模块创建别名:

    ```
    alias: {
      Utilities: path.resolve(__dirname, 'src/utilities/'),
      Templates: path.resolve(__dirname, 'src/templates/')
    }
    ```

    效果:

    ```
    import Utility from '../../utilities/utility';//不使用别名,路径不一样,导入相对路径写法也不一样

    import Utility from 'Utilities/utility';//不管模块在哪写法一样。
    ```

    后缀"$"也可以添加到别名的末尾，来指定别名对应的模块是个单文件模块:

    ```
    alias: {
      xyz$: path.resolve(__dirname, 'path/to/file.js')
    }
    ```

    效果：

    ```
    import Test1 from 'xyz'; // Success, file.js is resolved and imported
    import Test2 from 'xyz/file.js'; // Error, /path/to/file.js/file.js is invalid
    ```

2. resolve.extensions(扩展名)

    自动解析某些扩展名的文件。默认配置如下:

    ```
    extensions: [".js", ".json"]
    ```

    用户在导入模块时可以省略配置好的后缀名:

    ```
    import File from '../path/to/file'
    ```

    如果想添加某些默认省略后缀名的模块,比如.jsx、.vue、.ts则需要在extensions加上。


3. resolve.modules

    告诉webpack当解析modules时应该搜索哪些文件夹。

    绝对路径和相对路径都可以使用，但他们还是有些不一样的。这里使用相对路径指的是相对于node_modules
    比如(./node_modules、./lib(与node_module同层))

    resolve.modules默认是:

    ```
    modules: ["node_modules"]
    ```

    所以使用模块路径(Module paths),比如"import 'jquery'"指的是node_module中的模块名。

    如果想要加一个文件夹也和node_module一样可以在app中使用模块路径导入，可以：

    ```
    modules: [path.resolve(__dirname, "src"), "node_modules"]
    ```

    > 其实使用alias也可以达到类似的效果。


## 2.loaders(装载器)

Loaders是应用于模块源码转换的，让你在预处理文件上使用require()或"装载"他们。
loaders有点像其他构建工具的"tasks"，提供强大的方式处理前端构建步骤。loaders也可以
转换不同的语言(比如typeScript)到javaScript，或者把图像转换为data Url的形式。
甚至可以允许你使用require()在javascript中引入css文件。

### 2.1 css-loader

装载css文件,首先安装loader

```
npm install --save-dev style-loader css-loader
```

webpack.config.js配置loader

```
module.exports = {
  module: {
    rules: [
      {test: /\.css$/, use: ['style-loader', 'css-loader']}
    ]
  }
};
```

应用中使用:

```
import css from 'file.css';
```

## 2.2 babel-loader
babel是下一代(ES2015、ES2016等)javaScript的编译工具。

安装:

```
npm install babel-loader babel-core babel-preset-env --save-dev
```

webpack.config.js配置

```
module: {
  loaders: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      query: {
        presets: ['env']
      }
    }
  ]
}
```

使用babel和babel-loader在webpack中可以使用下一代javaScript编写应用,比如：

```
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return "point(" + this.x + ',' + this.y + ")"
    }
}
```

## 2.3 其他loaders

有以下几种类型的loaders：

1. Files
    - raw-loader
    - val-loader
    - url-loader
    - file-loader
2. JSON
    - json-loader
    - json5-loader
    - cson-loader
3. Transpiling
    - script-loader
    - babel-loader
    - traceur-loader
    - ts-loader
    - coffee-loader
4. Templating
    - html-loader
    - pug-loader
    - jade-loader
    - markdown-loader
    - posthtml-loader
    - handlebars-loader
5. Styling
    - style-loader
    - css-loader
    - less-loader
    - sass-loader
    - stylus-loader
    - postcss-loader
6. Linting && Testing
    - mocha-loader
    - eslint-loader
    - jshint-loader
    - jscs-loader
    - coverjs-loader
7. Frameworks
    - vue-loader
    - polymer-loader
    - angular2-template-loader

常见loader可看webpack<a href='https://webpack.js.org/loaders/'>官方说明</a>

更多loader可查看<a href='https://github.com/webpack-contrib/awesome-webpack#loaders'>awesome-webpack</a>


本节涉及内容<a href='./webpack.config.js'>示例</a>