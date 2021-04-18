const config = require("./common");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackInjectAttributesPlugin = require('html-webpack-inject-attributes-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const path = require("path");

module.exports = {
  ...config,
  mode: "development",
  devServer: {
    compress: true,
    historyApiFallback: false,
    hot: true,
    https: false,
    noInfo: false,
    contentBase: path.join(__dirname, "../dist"),
  },
  plugins: [
     new CopyPlugin([{
         from: `${path.join(__dirname, "../thrid")}/*`,
      }]),
    new HtmlWebpackInjectAttributesPlugin({
      inject: "true",
      crossorigin: "anonymous",
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../src/public/index.html"),
      inject: false,
      attributes: {
        crossorigin: "anonymous",
      },
    }),
  ],
};
