const path = require("path");
const config = {
  entry: path.join(__dirname, "../src/index.js"),
  output: {
    filename: "montoring.js",
    library: "montoring",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [path.resolve(__dirname, "../node_modules")]
      }
    ]
  },
  resolve: {
    extensions: [".js"],
    alias: {
      root: path.resolve(__dirname, "../src")
    }
  },
  devtool: 'source-map'
};
module.exports = config;
