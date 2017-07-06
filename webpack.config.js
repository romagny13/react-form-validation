var path = require('path'),
    webpack = require('webpack');

var entry = process.env.NODE_ENV === "production" ? "./src/index.js" : "./example/es6/index.js";
var filename = process.env.NODE_ENV === "production" ? "react-form-validation.js" : "build.js";
module.exports = {
    entry: entry,
    output: {
        path: path.resolve(__dirname, "./dist"),
        publicPath: "/dist/",
        filename: filename,
        libraryTarget: 'umd',
        library: 'ReactFormValidation'
    },
    module: {
        rules: [
            { test: /\.(js|jsx)$/, exclude: [/node_modules/], use: "babel-loader" },
            { test: /\.css$/, use: ["style-loader", "css-loader"] },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: "file-loader" },
            { test: /\.(woff|woff2)$/, use: "url-loader?prefix=font/&limit=5000" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: "url-loader?limit=10000&mimetype=application/octet-stream" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: "url-loader?limit=10000&mimetype=image/svg+xml" },
            { test: /\.(jpe?g|png|gif)$/i, use: 'file-loader?name=[name].[ext]' },
            { test: /\.json$/, use: 'json-loader' }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
        'react-addons-test-utils': true,
        fs: '{}'
    },
    node: {
        fs: 'empty'
    },
    devServer: {
        contentBase: './example/es6',
        historyApiFallback: true,
        noInfo: true
    },
    devtool: "#eval-source-map"
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
        /* new webpack.optimize.UglifyJsPlugin({
             compress: {
                 warnings: false
             }
         })*/
    ])
}