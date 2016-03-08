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
    loaders:[
      {
        test: /\.css$/,
        loaders: ['style', 'css?modules'],
        include: PATHS.src
      },
      {
        test: /\.(js|tag)$/,
        loader: 'babel-loader',
        include: PATHS.src,
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'stage-0']
        }
      },
      {
        test: /\.tag$/,
        loader: 'tag',
        include: PATHS.src,
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    // Html Index
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(PATHS.src, 'index.html'),
      files: {
         "css": [ "assets/css/main.css",
                  "assets/css/material.teal-light_green.min.css",
                  "assets/css/material-design-iconic-font.min.css" ],
          "js": [ "assets/js/material.min.js" ]

      }
    }),
    // Banner
    new webpack.BannerPlugin("HP - Stanzani"),
    // Copy files like assets to pub
    new CopyWebpackPlugin([
      { from: path.join(PATHS.src, 'assets/'), to: 'assets/' },
      { from: path.join(PATHS.src, 'favicon.ico') },
      { from: 'node_modules/material-design-iconic-font/dist/css/material-design-iconic-font.min.css', to: 'assets/css' },
      { from: 'node_modules/material-design-iconic-font/dist/fonts', to: 'assets/fonts' },
      { from: 'node_modules/material-design-lite/dist/material.min.css', to: 'assets/css' },
      { from: 'node_modules/material-design-lite/dist/material.min.js', to: 'assets/js' },
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
