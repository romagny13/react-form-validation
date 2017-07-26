var path = require('path'),
    webpack = require('webpack');

var version = require('./package.json').version;
var isProd = process.env.NODE_ENV === 'production';

var banner =
    '/*!\n' +
    ' * React Form Validation v' + version + '\n' +
    ' * (c) ' + new Date().getFullYear() + ' romagny13\n' +
    ' * Released under the MIT License.\n' +
    ' */';

var plugins = [];
plugins.push(new webpack.BannerPlugin({
    banner: banner,
    raw: true,
    entryOnly: true,
}));

if (isProd) {
    plugins.push(new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
    }));
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
            screw_ie8: true,
            keep_fnames: true
        },
        compress: {
            screw_ie8: true
        },
        comments: false,
        sourceMap: false
    }));
}

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, "./lib/dist"),
        publicPath: "/lib/dist/",
        filename: isProd ? 'react-form-validation.min.js' : 'react-form-validation.js',
        libraryTarget: 'umd',
        library: 'ReactFormValidation'
    },
    devtool: isProd ? false : 'source-map',
    module: {
        rules: [
            { test: /\.(js|jsx)$/, exclude: [/node_modules/], use: "babel-loader" },
            { test: /\.css$/, use: ["style-loader", "css-loader"] }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    plugins: plugins
};
