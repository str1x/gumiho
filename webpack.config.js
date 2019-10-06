const path = require('path');

const config = {
    entry: path.resolve(__dirname, './src/index.ts'),
    devtool: 'source-map',
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
            },
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
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
        extensions: ['.ts'],
    },
}

module.exports = config;
