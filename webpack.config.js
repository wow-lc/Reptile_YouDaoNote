const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
    mode: "production",
    entry: "./script/index.js",
    output: {
        path: path.resolve(__dirname,"youdaoNote_chrome_plugin","js","dist"),
        filename: "[name].js"
    },
    plugins: [
        new CleanWebpackPlugin()
    ],
}