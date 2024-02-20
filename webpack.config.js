const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack"); //to access built-in plugins

var __dirname = "./";
module.exports = {
  entry: path.resolve(__dirname, "src", "index.tsx"),
  module: {
    // rules: [{ test: /\.txt$/, use: "ts-loader", exclude: /node_modules/ }],
  },
//   plugins: [new HtmlWebpackPlugin({ template: "./public/index.html" })],
//   output: {
//     path: path.resolve(__dirname, "build"),
//     filename: "js",
//   },
  devServer: {
    historyApiFallback: true,
  },
};
