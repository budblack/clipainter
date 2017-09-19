const webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CleanPlugin = require('clean-webpack-plugin'),
    CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    node: {
        fs: 'empty'
    },
    entry: __dirname + '/src/index.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist',
        publicPath: '/',
        chunkFilename: 'chunk/[name].[chunkhash:6].js'
    },
    resolve: {
        extensions: [
            '.js',
            '.vue'
        ]
    },
    module: {
        unknownContextCritical: false,
        loaders: [
            {
                test: /\.modernizr-autorc$/,
                loader: 'modernizr-auto-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: /src/,
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf|json)\??.*$/,
                loader: 'url-loader?limit=10240&name=[path][name].[ext]'
            }
        ]
    },
    plugins: [
        new CleanPlugin('dist/*'),
        new HtmlWebpackPlugin(
            {
                title: 'Clptr',
                filename: 'index.html',
                template: __dirname + '/src/_static/index.html',
                inject: true,
                hash: true,
                minify: {
                    removeComments: true,
                    collapseWhitespace: false
                }
            }
        ),
        new webpack.HotModuleReplacementPlugin(),
        new CopyPlugin([])
    ],
    devServer: {
        contentBase: './dist',
        host: '0.0.0.0',
        port: 3001,
        disableHostCheck: true,
        inline: true
    }
};
