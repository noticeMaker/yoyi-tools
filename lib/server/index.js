

const path = require('path')
const express = require('express')
const webpack = require('webpack')
const bodyParser = require('body-parser')

const webpackMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const getWebpackConfig = require('../getWebpackConfig')

const fs = require('fs')

const cwd = process.cwd()

module.exports = function () {

    const app = express()

    let webpackConfig = getWebpackConfig({
        env: 'development',
        inlineSourceMap: false
    })

    if (fs.existsSync(path.join(cwd, 'webpack.config.js'))) {
        webpackConfig = require(path.join(cwd, 'webpack.config.js'))(webpackConfig);
    }

    const compiler = webpack(webpackConfig)
    const middleware = webpackMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false
        }
    })

    app.use(middleware)
    app.use(webpackHotMiddleware(compiler))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))

    app.use('/helpdoc', express.static(cwd + '/helpdoc'))

    app.use('/favicon', express.static(cwd + '/favicon'))

    app.get('*', function response(req, res) {
        res.write(middleware.fileSystem.readFileSync(path.join(cwd, './assets/index.html')));
        res.end()
    })

    return app
}