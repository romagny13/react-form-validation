var path = require('path');

module.exports = {
    debug: true,
    noInfo: false,
    target: 'web',
    entry: './test/unit/index.js',
    output: {
        path: path.resolve(__dirname, 'test'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ["", ".js", ".jsx"]
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    }
}

