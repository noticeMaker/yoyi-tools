# yoyi tools 

offline tools for react component

[![npm](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/yoyi-tools)
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[coveralls-url]: https://coveralls.io/r/react-component/rc-tools?branch=master
[gemnasium-image]: http://img.shields.io/gemnasium/react-component/rc-tools.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/react-component/rc-tools
[node-image]: https://img.shields.io/badge/node.js-%3E=6.0.0-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/yoyi-tools.svg?style=flat-square
[download-url]: https://npmjs.org/package/yoyi-tools

## Install 
```
    npm install yoyi-tools 
```

## Usage

```
    yoyi-tools run start|server : start dev server 
    yoyi-tools run build :  build 
```

## Need to configure the entry

In package.json 

```js 

config: {
    entry: '',     // require,  webpack entry for build dist, 
    port: 8002,     // dev server port, default 8002
    output:{},      // webpack output for build dist
    HtmlWebpackPluginConfig: {} //webpack plugin config for build dist 
}

```
Or in webpack.config.js 

You can have a custom configuration, It will merge with the default configuration

```
    module.exports = function(defaultConfig) {
        
        defaultConfig.entry = {
            // entry
        }

         defaultConfig.entry = {
            // entry
        }
        
        defaultConfig.plugins = {
            // some plugins
        }
        // or
        defaultConfig.plugins.push(['other plugin'])
        ....
    }


```

