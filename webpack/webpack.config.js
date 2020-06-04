const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const TestPlugin = require('./plugin/testPlugin')
const designWidth = 750
module.exports = {
    entry: __dirname + "/app/main.js",//已多次提及的唯一入口文件
    output: {
        path: __dirname + "/build",//打包后的文件存放的地方
        filename: "bundle.js"//打包后输出文件的文件名
    },
    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
        port: 7001
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: [
                    { loader: "babel-loader" },
                    { loader: path.resolve( __dirname, './loaders/replaceLoader.js')},
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    },
                    { loader: "postcss-loader" }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    {
                        loader: 'postcss-loader',
                        options: {
                            modules: true
                        },
                    },
                    'sass-loader', 
                    {
                        loader:'webpack-px-to-rem',
                        query:{
                           basePx: designWidth*100/1080, min:1,floatWidth:3
                        } 
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: "url-loader?limit=8192&name=build/img/[name].[hash:8].[ext]"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/app/h5.tpl.html"//new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin("style.css"),
        new TestPlugin({name:'yangli'})
    ]
}
