import express from 'express';
import webpack from 'webpack';
import config from './webpack/webpack.common';
import  webpackDevMiddleware from 'webpack-dev-middleware';
const DEFAULT_PORT = 3000;
const app = express();
const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));
app.listen(process.env.PORT || DEFAULT_PORT, () => console.log('Example app listening on port 3000!'));
