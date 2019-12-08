const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: path.join(__dirname,'src/javascript.js'),
    output: {
        path: path.join(__dirname,'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: [".js",".json"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname,'src/index.html')
        }),
        new ExtractTextPlugin('style.css'),
        new UglifyJSPlugin(),
        new ManifestPlugin({
            fileName: 'manifest.json',
            seed: {
                "name": "Controle de Portaria de Condomínios",
                "short_name": "Cont. Portaria",
                "icons":[
                    {"src":"img/android-chrome-192x192.png","sizes":"192x192","type":"image/png"},
                    {"src":"img/android-chrome-512x512.png","sizes":"512x512","type":"image/png"}
                ],
                "start_url": "/index.html",
                "display": "standalone",
                "background_color": "#3E4EB8",
                "theme_color": "#2F3BA2"
            }
        }),
        new WorkboxPlugin.GenerateSW(),
    ],
    module: {
        rules: [
            {
                test: /.js?$/,
                exclude: /node_modules/,
                include: path.join(__dirname,'src'),
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    }
                ]
            },
            {
                test: /\.(jpe?g|ico|png|gif|svg)$/i,
                loader: 'file-loader?name=img/[name].[ext]'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
        ],
    },
    devServer: {
        publicPath: "/",
        contentBase: "./dist"
    }
};
