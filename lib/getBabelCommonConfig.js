'use strict'

module.exports = function (env) {
    const plugins = [
        'transform-decorators-legacy',
        ["import", { libraryName: "antd", style: true }],
        'babel-plugin-transform-runtime'
    ]

    const presets = [
        ['babel-preset-env', {
            targets: {
                chrome: 52,
                "loose": true
            }
        }],
        "babel-preset-stage-2",
        "babel-preset-react"
    ]

    if (env == 'development') {
        presets.push('react-hmre')
    }

    return {
        presets,
        plugins
    }
}