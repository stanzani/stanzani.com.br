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
    /* filename= */  "assets/js/vendor.bundle.js"
  ),
  // Html Index
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'src/index.html'
  }),
  new ExtractTextPlugin("assets/css/[name]-[hash].css",
  {
			disable: false,
			allChunks: true
	})
]

if (production) {
  plugins = plugins.concat([
    new CleanPlugin( PATHS.pub ),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.MinChunkSizePlugin({
              minChunkSize: 51200, // ~50kb
    }),
    new webpack.optimize.UglifyJsPlugin({ mangle: true, compress: { warnings: false } }),
    new webpack.DefinePlugin({
      __SERVER__:      !production,
      __DEVELOPMENT__: !production,
      __DEVTOOLS__:    !production,
      'process.env':   {
          BABEL_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new CopyWebpackPlugin([
      { from: 'src/assets/json', to: 'assets/json' },
      { from: 'src/assets/img/app-icons', to: 'assets/img/app-icons' },
      { from: 'src/favicon.ico' },
      { from: 'src/robots.txt' },
      { from: 'src/errors/' },
      { from: 'node_modules/material-design-iconic-font/dist/fonts', to: 'assets/fonts' }
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
    vendor: ['riot','redux','redux-thunk', 'whatwg-fetch', 'es6-promise', 'material-design-lite/material']
  },
  resolve: { extensions: ['', '.js', '.tag', '.scss', '.css', '.html'] },
  output: {
    path: PATHS.pub,
    filename: production ? 'assets/js/[name]-[hash].js' : 'assets/js/bundle.js',
    chunkFilename: 'assets/js/[name]-[chunkhash].js',
    publicPath: ""
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
        test: /\.(scss|sass|css)$/,
        loader: ExtractTextPlugin.extract('style', 'css', 'sass'),
        include: PATHS.src
      },
      {
        test: /\.(css)$/,
        loader: 'file?name=assets/css/[name].[ext]'
      },
      {
        test: /\.(js|tag)$/,
        include: PATHS.src,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test:   /\.html/,
        loader: 'html',
        include: PATHS.src
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
    contentBase: PATHS.pub,
    colors: true,
    historyApiFallback: true,
    inline: true,
    hot: true
  },
  plugins: plugins
};
