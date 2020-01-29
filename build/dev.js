const config = require('./common')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  ...config,
  mode: 'development',
  devServer: {
    compress: true,
    historyApiFallback: true,
    hot: true,
    https: false,
    noInfo: false
  },
  plugins: [new HtmlWebpackPlugin]
}