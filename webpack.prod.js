const path = require('path');
const HtmlWebPackPlugin    = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode : 'production',
    optimization: {
        minimizer :[ new OptimizeCssAssetPlugin()]
    },
    output:{
        filename : 'main.[contenthash].js',
        path: path.resolve(__dirname, 'dist'),

    },
    module : {
        rules : [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            },
            {
                test : /\.css$/,
                exclude: /style\.css$/,
                use : [
                    'style-loader',
                    'css-loader'
                   
                ]
            },
            {
                test : /style\.css$/,
                use : [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                   
                ]
            },
            {
                test : /\.html$/,
                loader : 'html-loader',
                options : {
                    attributes : false,
                    minimize: false
                }
            },
            {
                test : /\.(png|jpeg|jpg|svg|gif)$/,
                use : [
                    {
                        loader : 'file-loader',
                        options : {esModule : false}
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({ verbose: true }),
        new HtmlWebPackPlugin({
            template : './src/index.html',
            filename : './index.[contenthash].html'
        }),
        new MiniCssExtractPlugin({
            filename : '[name].[contenthash].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
            {from:'src/assets', to:'assets/'}
        ]}),
        new MinifyPlugin(),
       
    ]
}