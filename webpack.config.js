var path = require('path')
var webpack = require('webpack')
//var UglifyJSPlugin = require('uglifyjs-webpack-plugin')
//var ExtractTextPlugin = require('extract-text-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");

const ROOT = path.resolve(__dirname, 'src/main');
const SRC = path.resolve(ROOT, 'fuentes');
const PUBLIC = path.resolve(ROOT, 'webapp');

module.exports = {
  //entry: ['./src/main.js', './src/app.css'],
  entry: SRC + '/main.js',
  output: {
    path: path.join(ROOT, 'dist/'),
    publicPath: '/pvz2/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {}
          // other vue-loader options go here
        }
      },
/*      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },*/
      {
        test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
        loader: 'file-loader',
        options: {
          name: 'font/[name].[ext]',
          useRelativePath: true
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'img/[name].[ext]',
          useRelativePath: true
        }
      }/*,
      { // regular css files
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }*/
    ]
  },/*
  plugins: [
    // new ExtractTextPlugin({ // define where to save the file
    //   filename: 'dist/app.css',
    //   allChunks: true,
    // }),
    new ExtractTextPlugin("style.css"),
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },*/
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
   mode: 'production'
  //devtool: '$symbol_poundeval-source-map'
}

if (process.env.NODE_ENV === 'production') {
 // module.exports.devtool = '$symbol_poundsource-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    /*new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),*/
    new MinifyPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}