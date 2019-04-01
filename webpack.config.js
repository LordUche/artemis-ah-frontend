const HtmlWebpackPlugin = require("html-webpack-plugin"); 
const path = require("path");

module.exports = {
  entry: "./src/App.jsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test:/\.html$/,
        use: {
          loader: "html-loader",
          options: { minimize: true }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html"
    })
  ]
};