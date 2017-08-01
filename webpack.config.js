const path = require('path');
const webpack = require('webpack');

const createBabelConfig = require('./babelrc');
const nodeExternals = require('webpack-node-externals');
const MinifierPlugin = require('babili-webpack-plugin');

const PRODUCTION = process.env.NODE_ENV === 'production';

const clientConfig = {
  entry: path.resolve('./src/index.browser.js'),
  output: {
    path: path.resolve('./dist'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve('./src'),
        loader: 'babel-loader',
        query: createBabelConfig()
      }
    ]
  },

  plugins: [
    PRODUCTION && new MinifierPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ].filter(e => e),

  devtool: PRODUCTION ? 'source-map' : 'cheap-module-eval-source-map'
}

const serverConfig = {
  target: 'node',
  externals: [ nodeExternals({
    whitelist: PRODUCTION ? [ 'react', 'react-dom/server' ] : []
  }) ],
  node: {
    __dirname: true
  },

  entry: path.resolve('./src/index.server.js'),
  output: {
    path: path.resolve('./dist'),
    filename: 'server.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve('./src'),
        loader: 'babel-loader',
        query: createBabelConfig({ server: true })
      }
    ]
  },

  plugins: [
    PRODUCTION && new MinifierPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    })
  ].filter(e => e),

  devtool: 'source-map'
}

module.exports = [clientConfig, serverConfig];
