var path = require('path'),
    webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, "./dist"),
        publicPath: "/dist/",
        filename: 'react-form-validation.min.js',
        libraryTarget: 'umd',
        library: 'ReactFormValidation'
    },
    module: {
        rules: [
            { test: /\.(js|jsx)$/, exclude: [/node_modules/], use: "babel-loader" },
            { test: /\.css$/, use: ["style-loader", "css-loader"] }
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
