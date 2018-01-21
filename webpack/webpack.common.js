import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin  from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
const APP_DIR = path.resolve(__dirname, '../src');
const BUILD_DIR = path.resolve(__dirname, '../dist');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: APP_DIR + '/index.html',
  filename: 'index.html',
  inject: 'body'
});
console.log(APP_DIR);
module.exports = {
  context: APP_DIR,
  entry: {
    main: [
      'babel-polyfill',
      'babel-core/register',
      'react-hot-loader/patch',
      APP_DIR + '/index.js'
    ],
    vendor: ['react', 'lodash']
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].[hash].js',
    chunkFilename: '[id].[chunkhash].bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new CleanWebpackPlugin([BUILD_DIR]),
    HtmlWebpackPluginConfig
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx', '.css']
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
      },
      {
        test: /\.(eot|otf|svg|ttf|woff|woff2)(\?[\s\S]+)?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[hash].[ext]'
          }
        }],
        include: path.join(__dirname, 'public', 'fonts')
      }
    ]
  }
};
