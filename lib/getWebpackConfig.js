

const path = require('path')
const fs = require('fs-extra')
const webpack = require('webpack')
const resolveCwd = require('./resolveCwd')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const getWebpackCommonConfig = require('./getWebpackCommonConfig')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const chalk = require('chalk');

const pkg = require(resolveCwd('package.json'))

const cwd = process.cwd()

function getEntry(env) {

    const entry = pkg.config && pkg.config.entry;

    // if (!entry) return console.log('entry is null')

    if (env == 'development') {
        return [
            'webpack-hot-middleware/client?reload=true',
        ].concat(entry)
    }
    // production entry
    return entry
}

function getOutput(env) {

    const output = pkg.config && pkg.config.output;

    const outputPath = path.join(cwd, 'assets')

    if (env == 'development') {
        return {
            path: outputPath,
            filename: "js/bundle.[hash].js",
            publicPath: '/',
            chunkFilename: '[name].[chunkhash].js',
        }
    }
    const defaultOutput = {
        path: outputPath,
        publicPath: '/assets/',
        filename: "js/[chunkhash].js",
        chunkFilename: 'chunk/[name].[chunkhash].js'
    }

    // production output
    return Object.assign(defaultOutput, output)
}

function getModule(env) {
    // development css loader
    if (env == 'development') {
        const loaders = getWebpackCommonConfig.getLoaders(env)
        return {
            rules: loaders.concat(getWebpackCommonConfig.getCssLoaders(false))
        }
    }
    // production css loader
    return {
        rules: getWebpackCommonConfig.getLoaders().concat(getWebpackCommonConfig.getCssLoaders(true))
    }
}

function getPlugins(env) {
    const HtmlWebpackPluginConfig = pkg.config && pkg.config.HtmlWebpackPluginConfig
    
    if (env == 'development') {
        const defaultHtmlConfig = {
            filename: './index.html',
            template: './app/index.html',
            inject: 'body',
            hash: false,
            minify: {
                removeComments: false,
                collapseWhitespace: false
            }
        }
        return [
            new ProgressBarPlugin(),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(env || "development")
            }),
            new HtmlWebpackPlugin(Object.assign(defaultHtmlConfig))
        ]
    }

    const proConfig = {
        filename: '../view/index.html',    //生成的html存放路径，相对于path
        template: './app/index.html',    //html模板路径
        inject: 'body',
        hash: false,
        minify: {
            removeComments: true,    //移除HTML中的注释
            collapseWhitespace: true    //删除空白符与换行符
        }
    }
    return [
        new ProgressBarPlugin(),
        new ExtractTextPlugin('css/[chunkhash].css'),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env || "production")
        }),
        new UglifyJSPlugin({
            uglifyOptions: {
                warnings: false,
                output: {
                    comments: false
                }
            }
        }),
        new HtmlWebpackPlugin(Object.assign(proConfig, HtmlWebpackPluginConfig))
    ]
}

module.exports = ({ env = 'development', inlineSourceMap }) => {
    return {
        devtool: inlineSourceMap ? '#inline-source-map' : '#source-map',
        resolveLoader: getWebpackCommonConfig.getResolveLoader(),
        entry: getEntry(env),
        output: getOutput(env),
        module: getModule(env),
        resolve: getWebpackCommonConfig.getResolve(),
        plugins: getPlugins(env)
    }
}