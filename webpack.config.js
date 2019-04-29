const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');
const webpack = require('webpack');
require('dotenv').config();

module.exports = env => ({
  entry: './src/App.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css']
  },
  node: {
    net: 'empty',
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'eslint-loader',
            options: {
              useEslintrc: true
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: { minimize: true }
        }
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', MiniCSSExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: '[name].[ext]',
              outputPath: './assets/img/'
            }
          }
        ]
      }
    ]
  },
  devtool: env.production ? 'source-maps' : 'eval',
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html'
    }),
    new MiniCSSExtractPlugin({
      filename: './style.css'
    }),
    new Dotenv(),
    new webpack.DefinePlugin({
      'process.env.SECRET_KEY': JSON.stringify(process.env.SECRET_KEY),
      'process.env.UPLOAD_URL': JSON.stringify(process.env.UPLOAD_URL),
      'process.env.PUSHER_APP_KEY': JSON.stringify(process.env.PUSHER_APP_KEY),
    })
  ],
  devServer: {
    historyApiFallback: true
  }
});
