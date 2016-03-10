var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'src/'),
  pub: path.join(__dirname, 'pub/')
};

module.exports = {
  target:  'web',
  cache:   true,
  entry:   { app: PATHS.src },
  resolve: { extensions: ['', '.js', '.tag'] },
  output: {
    path: PATHS.pub,
    filename: 'assets/js/bundle.js'
  },
  context: path.join(__dirname),
  module:{
    preLoaders: [
      {
        test: /\.tag$/,
        exclude: /node_modules/,
        include: PATHS.src,
        loader: 'riotjs-loader',
        query: { type: 'none' }
      }
    ],
    loaders:[
      {
        test: /\.css$/,
        loaders: ['style', 'css?modules'],
        include: PATHS.src
      },
      {
        test: /\.(js|tag)$/,
        include: PATHS.src,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    // Riot JS
    new webpack.ProvidePlugin({
      riot: 'riot'
    }),
    // Html Index
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    }),
    // Copy files like assets to pub
    new CopyWebpackPlugin([
      { from: 'src/assets/', to: 'assets/' },
      { from: 'src/favicon.ico' },
      { from: 'node_modules/material-design-iconic-font/dist/css/material-design-iconic-font.min.css', to: 'assets/css' },
      { from: 'node_modules/material-design-iconic-font/dist/fonts', to: 'assets/fonts' },
      { from: 'node_modules/material-design-lite/dist/material.min.css', to: 'assets/css' },
      { from: 'node_modules/material-design-lite/dist/material.min.js', to: 'assets/js' },
      { from: 'node_modules/material-design-lite/dist/material.min.css.map', to: 'assets/css' },
      { from: 'node_modules/material-design-lite/dist/material.min.js.map', to: 'assets/js' },
      { from: 'node_modules/respond.js/dest/respond.min.js', to: 'assets/js' },
      { from: 'node_modules/html5shiv/html5shiv.min.js', to: 'assets/js' },
      { from: 'node_modules/html5shiv/html5shiv-printshiv.min.js', to: 'assets/js' },
      { from: 'node_modules/json3/lib/json3.min.js', to: 'assets/js' }
    ]),
    // Hot Module Replacement
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'eval-source-map',
  devServer: {
    contentBase: PATHS.pub,
    colors: true,
    historyApiFallback: true,
    inline: true,
    hot: true
  }
};
