/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-05-02 23:05:02
 * @LastEditTime: 2020-05-18 22:58:01
 */

const { resolve } = require('path');
const webpack = require('webpack');

const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 压缩抽离后的js => 注意使用mini-css-extract-plugin插件时,尽管production模式下如果new TerserJSPlugin(); js代码任然不进行压缩
const TerserJSPlugin = require('terser-webpack-plugin');
// 用于抽离html中的style内容到单独的css文件中
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩抽离后的css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// 图片压缩
const imagemin = require('imagemin');
// 使用多线程打包
const HappyPack = require('happypack');

module.exports = {
    mode: 'production',
    entry: resolve("./src/index.js"),
    output: {
        path: resolve("./dist"),
        filename: "assets/js/[name].[hash:8].js",
        publicPath: ""
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'happypack/loader',
                    },
                    // {
                    //     loader: 'eslint-loader',
                    // },
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        },
                        // plugins:[]
                    }
                ]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /node_modules/,
                use: [
                    {
                        // loader: 'style-loader'
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'stylus-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader'
                    },
                ]
            },
            {
                test: /\.less$/i,
                exclude: /node_modules/,
                use: [
                    {
                        // loader: 'style-loader'
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader'
                    },

                    {
                        loader: 'less-loader'
                    },
                ]

            },
            {
                test: /\.(jpg|png|jpe?g|gif|bmp)$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'url-loader',
                        // 做一个限制，当我们的图片小于2kb的时候，用base64来转换; 否则用file-loader产生真实的图片
                        options: {
                            // 输出正常的图片名称
                            name: "assets/img/[name].[hash:8].[ext]",
                            // limit: 1  // 小于1字节的用base64  [1024byte == 1kb]
                            limit: 1 * 1024,
                            // 公共路径, 会在图片资源前加上统一的指定路径地址
                            publicPath: 'http://127.0.0.1:3000'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ]
            },
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'url-loader?limit=10000',
            },
            {
                test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
                use: 'file-loader',
            }
        ]
    },
    devServer: {
        port: 3000,
        progress: true,
        contentBase: './dist'
    },
    optimization: {
        minimizer: [
            // 压缩抽取的js
            new TerserJSPlugin({}),
            // 压缩抽取的css
            new OptimizeCSSAssetsPlugin({}),
        ],
        // 抽离公共代码块 (多页面应用场景下)
        splitChunks: {
            cacheGroups: {
                // 公共的
                common: {
                    // 公共的模块
                    chunks: "initial", // 从开始处抽离，有多种配置，像异步模块什么的
                    minSize: 0, // 最小大小 (大于0kb的就抽离)
                    minChunks: 2 //  引用次数(大于2次以上的就抽离)
                },
                // 第三方的
                vendor: {  // 此处为了抽离第三方的公共模块，比如jquery（前提是index和other都引入jquery了）
                    priority: 1,  //权重， 如果不给这个字段，那么就此例来说，会先走上边的“common”，会把jquery和a.js，b.js合并在一个文件中。
                    //如果还有别的入口只使用jquery了，但是a和b对于它来说就是无用的。加上权重之后，会将第三方模块单独抽离
                    test: /node_modules/,
                    minSize: 0, // 最小大小
                    chunks: "initial",
                    minChunks: 2 //  引用次数
                }
            }
        },

    },
    plugins: [
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
            template: resolve('./src/static/index.html'),
            filename: "index.html",
            minify: {
                // 是否把html打包成一行 
                collapseWhitespace: true,
            },
            hash: true,
        }),
        // css抽取插件
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].[hash:8].css',
            chunkFilename: '[id].css',
            ignoreOrder: false, // 启用以删除有关顺序冲突的警告  
        }),
        // 多线程打包; [适用于项目较大的情况下]
        new HappyPack({
            threads: 4,
            loaders: ['babel-loader']
        }),

        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': JSON.stringify('production')
        // }),

        new webpack.ContextReplacementPlugin(/moment[\/\\]locale/, /(en|zh-cn)\.js/),
        // webpack自带版本插件
        // new webpack.BannerPlugin("make 2020 wq by"),
    ],
}

console.log("process.env.NODE_ENV 的值是(webpack.config.prod.js)：" + process.env.NODE_ENV)
