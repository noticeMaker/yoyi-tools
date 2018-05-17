
const path = require('path')

const fs = require('fs')

const resolveCwd = require('./resolveCwd')

const ExtractTextPlugin = require('extract-text-webpack-plugin')

const getBabelCommonConfig = require('./getBabelCommonConfig')

const tsConfig = require('./getTSCommonConfig')()

const assign = require('object-assign')

const pkg = require(resolveCwd('package.json'))

const cwd = process.cwd()

delete tsConfig.noExternalResolve

tsConfig.declaration = false

function getResolve() {
    const resolve = {
        modules: [cwd, 'node_modules'],
        extensions: ['.js', '.jsx', 'less']
    }
    return resolve
}

function getResolveLoader() {
    return {
        modules: [
            path.resolve(__dirname, '../node_modules'),
            // npm3 flat module
            path.resolve(__dirname, '../../'),
        ],
        moduleExtensions: ['-loader'],
    }
}

function getLoaders(env) {
    const babelConfig = getBabelCommonConfig(env)

    const babelLoader = {
        loader: 'babel',
        options: babelConfig,
    }

    return [
        assign(
            {
                test: /\.js?$/,
                exclude: /node_modules/,
            },
            babelLoader
        ),
        {
            test: /\.(jpe?g|png|gif|svg|eot)$/i,
            loaders: ['url?limit=8192&name=imgs/[hash:8].[ext]']
        },
        {
            test: /\.json$/,
            loaders: ['json'],
            exclude: /node_modules/,
            include: __dirname
        },
        {
            test: /\.(swf|flv|xap)$/,
            loader: 'file'
        }
    ]
}

function getCssLoaders(extractCss, theme) {
    let cssLoader = [
        {
            loader: 'css',
        }
    ];
    let lessLoader = cssLoader.concat([
        {
            loader: 'less'
        },
    ])

    if (extractCss) {
        cssLoader = ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader'
        });
        lessLoader = ExtractTextPlugin.extract({
            use: ['css-loader', 'less-loader'],
            fallback: 'style-loader'
        });
    } else {
        const styleLoader = {
            loader: 'style',
        };
        cssLoader.unshift(styleLoader);
        lessLoader.unshift(styleLoader);
    }
    return [
        {
            test: /\.css$/,
            use: cssLoader,
        },
        {
            test: /\.less$/,
            use: lessLoader,
        },
    ];
}

module.exports = {
    getResolve,
    getResolveLoader,
    getLoaders,
    getCssLoaders
}