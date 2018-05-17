# yoyi-tools

[![npm](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/yoyi-tools)
![CircleCI](https://img.shields.io/circleci/project/github/RedSparr0w/node-csgo-parser.svg)
[![npm download][download-image]][download-url]

[download-image]: https://img.shields.io/npm/dm/yoyi-tools.svg?style=flat-square
[download-url]: https://npmjs.org/package/yoyi-tools

## Install 
```
    npm install yoyi-tools 
```

## Usage

```
    yoyi-tools run start|server : stÂart dev server 
    yoyi-tools run build :  build 
```

## Need to configure the entry

In package.json 

```js Â

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

