let Webpack = require('webpack')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let path = require('path')
module.exports = {
    entry: {
        app: './form-tooltip.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '/'
    },
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            inject: true
        }),
        new Webpack.HotModuleReplacementPlugin(),
        new Webpack.NamedModulesPlugin()
    ],
    devServer:{
        contentBase: './',
        hot: true,
        publicPath: '/',
        host: 'localhost'
    }
}
