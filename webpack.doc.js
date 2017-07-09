var path = require('path'),
    webpack = require('webpack');

module.exports = {
    entry: './docs/index.js',
    output: {
        path: path.resolve(__dirname, "./dist"),
        publicPath: "/dist/",
        filename: 'build.js'
    },
    module: {
        rules: [
            { test: /\.(js|jsx)$/, exclude: [/node_modules/], use: "babel-loader" },
            { test: /\.css$/, use: ["style-loader", "css-loader"] }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"],
        alias: {
           'romagny13-react-form-validation': path.resolve(__dirname, './src')
        }
    },
   /* devServer: {
        contentBase: './docs',
        historyApiFallback: true,
        noInfo: true
    },*/
    devtool: "#eval-source-map"
};
