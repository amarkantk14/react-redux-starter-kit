const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const APP_DIR = path.resolve(__dirname, 'src')
const BUILD_DIR = path.resolve(__dirname, 'dist')
const debug = process.env.NODE_ENV !== 'production'

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: APP_DIR.concat('/index.html'),
  filename: 'index.html',
  inject: 'body'
})

let OptPlugin = debug ? [] : [
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
]
module.exports = {
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: '[name].bundle.js'
  },
  devtool: debug ? 'source-map' : false,
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.html$/, loader: 'html-loader' }
    ]
  },
  plugins: [...OptPlugin, HtmlWebpackPluginConfig]
}
