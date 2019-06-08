const path = require('path');
// ref https://webpack.js.org/configuration

module.exports = env => {
    let mode = (env !== undefined && env.APP_ENV === 'prod') ? 'production' : 'development';
    return {
        mode: mode,
        entry: './src/index.js',
        output: {
            filename: 'cwd-bundle.js',
            library: 'cwd',
            libraryTarget: 'umd',
            globalObject: 'this',
            path: path.resolve(__dirname, 'dist')
        }
    };
};