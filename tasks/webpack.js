const path = require('path');
const webpack = require('webpack');
const HardSource = require('hard-source-webpack-plugin');

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
    new HardSource(),
    new Dotenv()
  ],
  node: {
    fs: 'empty',
    net: 'mock',
    tls: 'empty'
  },
  mode: (process.env.NODE_ENV === 'development' ? 'development' : 'production')
};

module.exports = {
  config
};
