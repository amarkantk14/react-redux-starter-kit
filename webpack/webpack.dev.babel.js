import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import common from './webpack.common';
const isDevelopmentMode = process.env.NODE_ENV !== 'production';

module.exports = merge(common, {
  devtool: isDevelopmentMode ? 'eval' : false,
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
    compress: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: ['/node_modules/']
    },
    host: '127.0.0.1',
    port: 8080,
    index: 'index.html',
    publicPath: '/',
    open: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({ debug: true }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
    new webpack.HashedModuleIdsPlugin()
  ]
});
