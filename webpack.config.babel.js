import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin  from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

const APP_DIR = path.resolve(__dirname, 'src');
const BUILD_DIR = path.resolve(__dirname, 'dist');
const DEBUG = process.env.NODE_ENV !== 'production';

const DevPlugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.LoaderOptionsPlugin({
    debug: true
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor'
  }),
  new CleanWebpackPlugin([BUILD_DIR]),
  new webpack.HashedModuleIdsPlugin()
];

const OptPlugins = DEBUG ? [] : [
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
];

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: APP_DIR + '/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  context: APP_DIR,
  entry: {
    main:[
      'babel-polyfill',
      'babel-core/register',
      'react-hot-loader/patch',
      APP_DIR + '/index.js'
    ],
    vendor: [
      'react',
      'lodash'
    ]
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].[hash].js',
    chunkFilename: '[id].[chunkhash].bundle.js',
    hotUpdateChunkFilename: "[id].[hash].hot-update.js"
  },
  devtool: DEBUG ? 'eval' : false,
  resolve: {
    extensions: ['*', '.js', '.jsx', '.css']
  },
  devServer: {
    contentBase: BUILD_DIR,
    hot: true,
    compress: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: ['/node_modules/']
    },
    headers: {
      "X-Powered-by": "Tripogon, Inc"
    },
    host: "127.0.0.1",
    port: 8080,
    /*
    https: {
      key: fs.readFileSync("./privateKey.key"),
      cert: fs.readFileSync("./certificate.crt"),
      ca: fs.readFileSync("/path/to/ca.pem"),
    },
    */
    index: 'index.html',
    publicPath: '/',
    open: true
  },
  module: {
    loaders: [
      { test: /\.(jsx?)$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.html$/, loader: 'html-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.(json|xml|svg|png|jpe?g|gif|ico)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }  
          }
        ]
      }
    ]
  },
  plugins: [
    ...OptPlugins,
    ...DevPlugins,
    HtmlWebpackPluginConfig
  ]
}
