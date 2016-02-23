var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


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
        loader: ExtractTextPlugin.extract('style', 'css?modules'),
        include: PATHS.src
      },
      {
        test: /\.js$/,
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
    new webpack.BannerPlugin("Daniel Stanzani"),
    // Uglify + Extract CSS + Order
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("style.css"),
    //new ExtractTextPlugin("[name]-[hash].css")
  ]
};
