const gulp = require('gulp');
const Browser = require('browser-sync');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const webpackConfig = require('./webpack').config;

const browser = Browser.create();
const bundler = webpack(webpackConfig);

function server() {
  const config = {
    server: 'site',
    middleware: [
      webpackDevMiddleware(bundler, { /* options */ }),
      webpackHotMiddleware(bundler)
    ]
  };

  browser.init(config);

  gulp.watch('site/*.js').on('change', () => browser.reload());
}

module.exports = {server};
