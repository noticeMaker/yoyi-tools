'use strict'

const getWebpackConfig = require('./getWebpackConfig')

const webpack = require('webpack')

const chalk = require('chalk')

const path = require('path')

const watch = require('gulp-watch')

const ts = require('gulp-typescript')

const tsConfig = require('./getTSCommonConfig')()

const gulp = require('gulp')

const resolveCwd = require('./resolveCwd')

const fs = require('fs-extra')

const rimraf = require('rimraf')

const pkg = require(resolveCwd('package.json'))

const assign = require('object-assign')

// .h 

// compile all

// start dev env
gulp.task('start', server)

gulp.task('server', ['start'])

// compile tsc
gulp.task('build', build)

//  .c

function server(done) {
    const port = pkg.config && pkg.config.port || 8002
    console.log(`Listening at http://localhost:${port}`);
    const app = require('./server/')();
    app.listen(port)
}


function build(done) {

    let webpackConfig = getWebpackConfig({
        env: 'production',
        inlineSourceMap: false
    })

    if (fs.existsSync(resolveCwd('webpack.config.js'))) {
        webpackConfig = require(resolveCwd('webpack.config.js'))(webpackConfig);
    } 
    rimraf.sync(webpackConfig.output.path)

    webpack(webpackConfig, (err, stats) => {
        if (err) {
            console.error('error', err, stats.hasErrors())
        }

        console.log(stats.toString({
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false
        }))
        done(err)
    })

}