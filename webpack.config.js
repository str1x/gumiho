const path = require('path');

const config = {
    entry: path.resolve(__dirname, './src/index.js'),
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        libraryTarget: 'umd',
    },
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, 'src'),
            '@utils': path.resolve(__dirname, '/src/utils'),
        },
        extensions: ['.js'],
    },
}

module.exports = config;
