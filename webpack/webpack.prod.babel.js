import webpack from 'webpack';
import merge from 'webpack-merge';
import common from './webpack.common.js';
import CompressionPlugin from 'compression-webpack-plugin';

module.exports = merge(common, {
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      sourceMap: true,
      cache: true,
      parallel: true,
      uglifyOptions: { ecma: 8 }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveSplittingPlugin({
      minSize: 30000,
      maxSize: 50000,
      chunkOverhead: 0,
      entryChunkMultiplicator: 1
    }),
    new webpack.optimize.CommonsChunkPlugin({
      minChunks: Infinity,
      async: true
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0
    })
  ]
});
