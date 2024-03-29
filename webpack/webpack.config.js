/**
 * @overview generated by ghoti-cli
 * @fileoverview webpack production configs
 */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, '..', 'dist');
const APP_DIR = path.resolve(__dirname, '..', 'src');
const PUBLIC_DIR = path.resolve(__dirname, '..', 'public', 'template.html');
const FAVICON_DIR = path.resolve(__dirname, '..', 'public', 'favicon.png');
const MANIFEST_DIR = path.resolve(__dirname, '..', 'public', 'manifest.json');

let config = {
    entry: APP_DIR + "/index.tsx",
    mode: "production",
    output: {
        filename: "bundle.js",
        path: BUILD_DIR
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".css", ".sass"]
    },
    node: { fs: 'empty' },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [{
                    loader: 'awesome-typescript-loader',
                    options: {
                        configFileName: './tsconfig.json'
                    }
                }]
            },
            {
                test: /\.sass$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                enforce: "pre",
                test: /\.(t|j)sx?$/,
                loader: "source-map-loader",
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'RPN GO',
            template: PUBLIC_DIR
        }),
        new CopyWebpackPlugin([{
            from: FAVICON_DIR,
            to: BUILD_DIR,
        }, {
            from: MANIFEST_DIR,
            to: BUILD_DIR,
        }], {}),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
        }),
        new UglifyJSPlugin()
    ]
};

module.exports = config;