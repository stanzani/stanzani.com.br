var path = require('path');
var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var production = process.env.NODE_ENV === 'production';

const PATHS = {
  src:  path.join(__dirname, 'src/'),
  pub:  path.join(__dirname, 'pub/'),
  node: path.join(__dirname, 'node_modules/')
};

var plugins = [
  new webpack.ProvidePlugin({
    riot: 'riot'
  }),
  new webpack.optimize.CommonsChunkPlugin(
    /* chunkName= */ "vendor",
    /* filename= */  "assets/js/vendor.js"
  ),
  new webpack.optimize.CommonsChunkPlugin({
    name:   'app',
    children:  true,
    minChunks: 2,
  }),
  // Html Index
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'src/index.html',
    excludeChunks: ['ie9']
  }),
  new ExtractTextPlugin("assets/css/[name].css",
  {
    allChunks: true
  }),
  new CopyWebpackPlugin([
    { from: 'src/assets/json', to: 'assets/json' },
    { from: 'src/blog', to: 'blog' }
  ])
];

if (production) {
  plugins = plugins.concat([
    new CleanPlugin( PATHS.pub ),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    //new webpack.optimize.MinChunkSizePlugin({
    //          minChunkSize: 51200, // ~50kb
    //}), Commented - Error using require.ensure
    new webpack.optimize.UglifyJsPlugin({ mangle: true, compress: { warnings: false } }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV':  JSON.stringify('production'),
      'process.env.BABEL_ENV': JSON.stringify('production'),
      __SERVER__:      false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__:    false
    }),
    new CopyWebpackPlugin([
      { from: 'src/assets/json', to: 'assets/json' },
      { from: 'src/assets/img/app_icons', to: 'assets/img/app_icons' },
      { from: 'src/favicon.ico' },
      { from: 'src/robots.txt' },
      { from: 'src/errors/' },
      { from: 'src/blog', to: 'blog' }
    ]),
    new webpack.BannerPlugin("stanzani.com.br")
  ]);
}

module.exports = {
  target:  'web',
  debug:   !production,
  cache:   true,
  entry:   {
    app:    PATHS.src,
    vendor: [
      'riot', 'redux', 'redux-thunk', 'whatwg-fetch', 'es6-promise', 'material-design-lite/material',
      'material-design-lite/material.min.css',
      'material-design-iconic-font/dist/css/material-design-iconic-font.min.css',
      'animate.css/animate.min.css'
    ],
    ie9: path.join(PATHS.src, 'assets/css/ie9.scss')  /*ie9 hack css -_- */
  },
  resolve: { extensions: ['', '.js', '.tag', '.scss', '.css', '.html'] },
  output: {
    path: PATHS.pub,
    filename: 'assets/js/[name].js',
    chunkFilename: 'assets/js/[name].js',
  },
  context: path.join(__dirname, '/'),
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
        test: /.*\.(png|gif|jpe?g|svg)$/i,
        loaders: [
          'file?name=/assets/img/[name].[ext]',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
        ],
        include: PATHS.src
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url?limit=10000&minetype=application/font-woff&name=/assets/fonts/[name].[ext]"
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file?name=/assets/fonts/[name].[ext]"
      },
      {
        test: /\.(scss|sass)$/,
        loader: ExtractTextPlugin.extract('style', 'css', 'sass'),
        include: PATHS.src
      },
      {
        test: /\.(css)$/,
        loader: ExtractTextPlugin.extract('style', 'css'),
      },
      {
        test: /\.(js|tag)$/,
        include: PATHS.src,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  sassLoader: {
    includePaths: [
      PATHS.node,
      PATHS.src
    ]
  },
  devtool: production ? false : 'eval-source-map',
  devServer: {
    outputPath: PATHS.pub,
    colors: true,
    historyApiFallback: true,
    inline: true,
    hot: true
  },
  plugins: plugins
};
