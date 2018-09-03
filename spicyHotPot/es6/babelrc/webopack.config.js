let path = require('path');
let webpack = require('webpack');
let serverHost = "localhost";
let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'), //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
        publicPath: '/dist/',
        filename: "bundle.js"
    },
    //加载器
    module: {
        loaders: [
            {
                test: /\.html$/,
                loader: "raw-loader"
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
        ]
    },
  
    plugins: [
        new HtmlWebpackPlugin({
            title:"test3",
            filename:"./dist/index.html",//输出html文件，打包时插入js,不用自己手动引入
            inject: 'body',  //js插入的位置，true/'head'/'body'/false
            hash: true
        }),
    ],
    //使用webpack-dev-server
    devServer: {
        contentBase: './',
        host: serverHost,
        port: 9090, //默认9090
        inline: true, //可以监控js变化
        hot: true//热启动
    },
  
};
