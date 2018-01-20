const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const APP_DIR = path.resolve(__dirname, 'src')
const BUILD_DIR = path.resolve(__dirname, 'dist')
const DEBUG = process.env.NODE_ENV !== 'production'

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: APP_DIR + '/index.html',
  filename: 'index.html',
  inject: 'body'
})

let OptPlugins = DEBUG ? [] : [
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
]

let devPlugins = [
  HtmlWebpackPluginConfig,
  new webpack.HotModuleReplacementPlugin()
]
module.exports = {
  entry: ['babel-polyfill', 'react-hot-loader/patch', APP_DIR + '/index.js'],
  output: {
    path: BUILD_DIR,
    filename: '[name].bundle.js'
  },
  devtool: DEBUG ? 'eval' : false,
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devServer: {
    contentBase: BUILD_DIR,
    hot: true
  },
  module: {
    loaders: [
      { test: /\.(js|jsx)$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.html$/, loader: 'html-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  },
  plugins: [...OptPlugins, ...devPlugins]
}
