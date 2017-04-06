var fs = require('fs');
var zlib = require('zlib');
var rollup = require('rollup');
var uglify = require('uglify-js');
var babel = require('rollup-plugin-babel');

var version = process.env.VERSION || require('../package.json').version;
var banner =
    '/*!\n' +
    ' * romagny13-react-form-validation v' + version + '\n' +
    ' * (c) ' + new Date().getFullYear() + ' romagny13\n' +
    ' * Released under the MIT License.\n' +
    ' */';

rollup.rollup({
    entry: "./src/index.js",
    external: ['react', 'react-dom'],
    plugins: [babel({
        babelrc: false,
        presets: ['react', 'es2015-rollup'],
        plugins: ['transform-object-rest-spread'],
        exclude: 'node_modules/**'
    })]
})
    .then(function (bundle) {
        return write('dist/react-form-validation.js', bundle.generate({
            format: 'umd',
            banner: banner,
            moduleName: 'ReactFormValidation'
        }).code)
    })
    .then(function () {
        return write(
            'dist/react-form-validation.min.js',
            banner + '\n' + uglify.minify('dist/react-form-validation.js').code
        )
    })
    .then(function () {
        return new Promise(function (resolve, reject) {
            fs.readFile('dist/react-form-validation.min.js', function (err, buf) {
                if (err) return reject(err)
                zlib.gzip(buf, function (err, buf) {
                    if (err) return reject(err)
                    write('dist/react-form-validation.min.js.gz', buf).then(resolve)
                })
            })
        })
    })
    .catch(logError);

function write(dest, code) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(dest, code, function (err) {
            if (err) return reject(err)
            console.log(blue(dest) + ' ' + getSize(code))
            resolve()
        })
    })
};

function getSize(code) {
    return (code.length / 1024).toFixed(2) + 'kb'
};

function logError(e) {
    console.log(e)
};

function blue(str) {
    return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
};
