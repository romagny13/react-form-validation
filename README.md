

* Webpack

```
npm i webpack -D
```

Babel

```
npm i babel-cli babel-loader babel-preset-latest -D
```

* React

```
npm i react react-dom -S
```

preset for React

```
npm i babel-preset-react -D
```

* .babelrc

```json
{
  "presets": ["react","latest"]
}
```

## Build

Plugins (minification, etc.)

```js
var path = require('path'),
    webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, "./dist"),
        publicPath: "/dist/",
        filename: 'mylib.min.js',
        libraryTarget: 'umd',
        library: 'MyLib'
    },
    module: {
        rules: [
            { test: /\.(js|jsx)$/, exclude: [/node_modules/], use: "babel-loader" }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        })
    ]
};
```

NPM Script

```json
"scripts": {
    "build": "webpack --config webpack.prod --progress --hide-modules"
}
```

```
npm run build
```

## Dev Server

```
npm i webpack-dev-server -D
```

```js
var path = require('path'),
    webpack = require('webpack');

module.exports = {
    entry: './example/es6/index.js',
    output: {
        path: path.resolve(__dirname, "./dist"),
        publicPath: "/dist/",
        filename: 'build.js'
    },
    module: {
        rules: [
            { test: /\.(js|jsx)$/, exclude: [/node_modules/], use: "babel-loader" }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    devServer: {
        contentBase: './example/es6',
        historyApiFallback: true,
        noInfo: true
    },
    devtool: "#eval-source-map"
};

```

NPM Script
```json
"scripts": {
    "dev": "webpack-dev-server --config webpack.dev --open --inline --hot"
},
```

```
npm run dev
```

## Test

Mocha

```
npm i chai mocha @types/chai @types/mocha -D
```

Karma

```
npm i karma -D
```

```
npm i karma karma-mocha karma-phantomjs-launcher karma-webpack -D
```

karma.conf.js
```
karma init
```

Mocha + PhantomJS + patterns ('test/index.js' and 'src/**/*.spec.ts')

files 
```js
files: [
      'node_modules/babel-polyfill/browser.js',
      './test/index.js',
      './src/**/*.spec.js'
    ],
```

preprocessors
```js
 preprocessors: {
            'test/index.js': ['webpack'],
            'src/**/*.spec.js': ['webpack']
        },
```

webpack
```js
 webpack: {
      module: {
        rules: [
          { test: /\.(js|jsx)$/, exclude: [/node_modules/], use: "babel-loader" }
        ]
      },
      externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
        'react-addons-test-utils': true,
        fs: '{}'
      }
    },

webpackMiddleware: {
      stats: {
        colors: true,
        chunks: false
      }
    },
```

plugins
```js
 plugins: [
            require('karma-webpack'),
            require('karma-mocha'),
            require('karma-phantomjs-launcher')
        ],
```

NPM Script
```json
"scripts": {
    "test": "karma start"
  },
```

React

```
npm i enzyme react-test-renderer nock -D
```
And with Redux
 ```
npm i redux-mock-store -D
```

```
npm test
```