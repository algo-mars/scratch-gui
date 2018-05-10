const defaultsDeep = require('lodash.defaultsdeep');
var path = require('path');
var webpack = require('webpack');

// Plugins
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// PostCss
var autoprefixer = require('autoprefixer');
var postcssVars = require('postcss-simple-vars');
var postcssImport = require('postcss-import');

const base = {
    devtool: 'cheap-module-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        host: '0.0.0.0',
        port: process.env.PORT || 8601
    },
    output: {
        library: 'GUI',
        filename: '[name].js',
        // comment this to start server in dev (and uncomment before build)
        publicPath: '/singlepage/scratch-gui-media/'
    },
    externals: {
        React: 'react',
        ReactDOM: 'react-dom'
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            include: path.resolve(__dirname, 'src')
        },
        {
            test: /\.css$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                options: {
                    modules: true,
                    importLoaders: 1,
                    localIdentName: '[name]_[local]_[hash:base64:5]',
                    camelCase: true
                }
            }, {
                loader: 'postcss-loader',
                options: {
                    ident: 'postcss',
                    plugins: function () {
                        return [
                            postcssImport,
                            postcssVars,
                            autoprefixer({
                                browsers: ['last 3 versions', 'Safari >= 8', 'iOS >= 8']
                            })
                        ];
                    }
                }
            }]
        }]
    },
    plugins: [].concat(process.env.NODE_ENV === 'production' ? [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        })
    ] : [])
};

module.exports = 
    // export as library
    defaultsDeep({}, base, {
        target: 'web',
        entry: {
            'scratch-gui': './src/containers/gui.jsx'
        },
        output: {
            libraryTarget: 'umd',
            path: path.resolve('dist')
        },
        externals: {
            React: 'react',
            ReactDOM: 'react-dom'
        },
        module: {
            rules: base.module.rules.concat([
                {
                  
                    test: /\.(svg|png|wav|gif|jpg)$/,
                    loader: 'file-loader',
                    options: {
                        outputPath: 'static/assets/',
                        publicPath: '/static/assets/'
                    }
                }
            ])
        },
        plugins: base.plugins.concat([
            new CopyWebpackPlugin([{
                from: 'node_modules/scratch-blocks/media',
                to: 'static/blocks-media'
            }]),
            new CopyWebpackPlugin([{
                from: 'extension-worker.{js,js.map}',
                context: 'node_modules/scratch-vm/dist/web'
            }])
        ])
    });
