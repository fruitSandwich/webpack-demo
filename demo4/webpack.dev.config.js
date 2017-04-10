var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        app: path.resolve(__dirname, './src/app.js'),
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'eval',
    devServer: {
        contentBase: path.join(__dirname, "bundle"),
        compress: true,
        port: 9000
    }
};
