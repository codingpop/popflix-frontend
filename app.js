import path from 'path';
import history from 'connect-history-api-fallback';
import dotenv from 'dotenv';
import webpack from 'webpack';
import express from 'express';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackDevMiddleware from 'webpack-dev-middleware';

import config from './config/webpack.config';

dotenv.config();

const app = express();
const isDevelopment = process.env.NODE_ENV !== 'production';
const htmlFile = path.join(__dirname, 'build/index.html');

if (isDevelopment) {
  const compiler = webpack(config);
  app.use(history());

  app.use(webpackDevMiddleware(compiler, {
    hot: true,
    publicPath: '/',
    noInfo: true,
  }));

  app.use(webpackHotMiddleware(compiler));

  app.get('/*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
} else {
  app.use(express.static(path.join(__dirname, 'build')));

  app.get('/*', (req, res) => res.sendFile(htmlFile));
}

app.listen(process.env.PORT);
