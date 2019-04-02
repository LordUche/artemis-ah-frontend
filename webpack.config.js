const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require('mini-css-extract-plugin'); 

module.exports = env => {
  return {
    entry: "./src/App.jsx",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist")
    },
    resolve: {
      extensions: [".js", ".jsx"]
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
        },
        {
          test: /\.(css|scss)$/,
          use: [
            "style-loader",
            MiniCSSExtractPlugin.loader,
            "css-loader",
            "sass-loader"
          ]
        }
      ]
    },
    devtool: env.production ? 'source-maps' : 'eval',
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        filename: "./index.html"
      }),
      new MiniCSSExtractPlugin({
        filename: "./style.css"
      })    
    ],
    devServer: {
      historyApiFallback: true
    }
  }
};