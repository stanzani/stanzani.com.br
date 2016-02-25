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
    filename: 'bundle.js'
  },
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
          presets: ['es2015']
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
      template: path.join(PATHS.src, 'index.html')
    }),
    // Banner
    new webpack.BannerPlugin("Learning Riot - Stanzani"),
    // Copy files like assets to pub
    new CopyWebpackPlugin([
      { from: path.join(PATHS.src, 'people.json') }
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