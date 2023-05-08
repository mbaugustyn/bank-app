const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: "./src/index.tsx",
    mode: 'production',
    cache: false,
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "build"),
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "public", "index.html"),
            favicon: './public/favicon.ico',
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, "build"),
        },
        port: 3000,
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    },
                }
            },
            {
                test: /\.(tsx?)$/,
                loader: "ts-loader",

            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],

    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx", "json"],
    },
};
