const path = require('path');
const webpack = require('webpack');
const HardSource = require('hard-source-webpack-plugin');

const env = process.env.NODE_ENV;

const config = {
  entry: {
    main: [
      './main.js',
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client'
    ]
  },
  output: {
    filename: './bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  context: path.resolve(__dirname, '../site'),
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HardSource()
  ],
  node: {
    fs: 'empty',
    net: 'mock',
    tls: 'empty'
  },
  mode: env || 'development'
};

module.exports = {
  config
};
