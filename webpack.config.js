const webpack = require('webpack');  
//这里引入webpack是为了使用webpack的热更新功能以及其他自带插件，见 module.exports.plugins
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
    entry: './webpack.entry.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),

        new HtmlWebpackPlugin({  // 该插件将生成一个 HTML5 文件
            template: './src/index.html',
            filename: 'index.html'
        }),
        // 当接收到热更新信号时，在浏览器console控制台打印更多可读性高的模块名称等信息
        new webpack.NamedModulesPlugin()
        // new webpack.DefinePlugin({  //允许创建一个在编译时可以配置的全局常量
        //     // 'SERVICE_URL': JSON.stringify('http://dev.example.com')
        // })
    ], //配置插件
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }, {
            test: /\.(html|tpl)$/,
            use: [ 'html-loader' ]
        }, {
            test: /\.(png|gif|jpg)$/,
            use: [{
                loader: 'url-loader'
            }]
        }]  //配置各种用于源文件编译加载的loader
        // loader的作用是为了让webpack可以打包其他类型的模块
    },
    devServer: {  //配置开发静态http服务
        contentBase: path.join(__dirname, "src"),//本地服务器所加载的页面所在的目录
        // 静态文件目录位置，只有当你需要在webpack-dev-server本地服务器查看或引用静态文件时用到。
        //output中配置的打包路径只在手动打包时起作用，而webpack-dev-server自动打包的开发环境下的bundle.js,路径由contentBase指定。
        host: 'localhost',
        port: 9528,
        open: true,
        inline:true,
        hot: true, // 还需要配置一个插件 HotModuleReplacementPlugin
    },
    mode: 'development'
}
