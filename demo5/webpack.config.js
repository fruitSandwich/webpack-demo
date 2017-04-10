var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: path.resolve(__dirname, './src/app.js'),
    output: {
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            '@util': path.resolve(__dirname, './util'),
        },
        modules: ['../lib', 'node_modules']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['env']
                }
            },
            {test: /\.css$/, use: ['style-loader', 'css-loader']}
        ]
    },
    devtool: 'eval',
    devServer: {
        // contentBase: path.join(__dirname, "bundle"),
        compress: true,
        port: 9000
    }
};
