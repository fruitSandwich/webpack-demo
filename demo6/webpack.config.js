/**
 * Created by dujiaheng on 2017/4/11.
 */
var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'webpack-numbers.js',
        library: 'webpackNumbers',
        libraryTarget: 'umd'
    },
    externals: {
        "lodash": {
            commonjs: "lodash",
            commonjs2: "lodash",
            amd: "lodash",
            root: "_"
        }
    }
};