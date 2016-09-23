'use strict'

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractCSS = new ExtractTextPlugin('css/[name].css');
const autoprefixer = require('autoprefixer')

var config = {
  context: __dirname,
  entry: './src',
  output: {
    path: __dirname + '/dist',
    publicPath: '',
    filename: 'build.js'
  },

  module: {
		preLoaders: [{test: /\.(sass|scss)$/, loader: 'stylelint'}],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel']
      },
			{
				test: /\.(jpe?g|png|gif)$/i,
				loaders: [
					'file?hash=sha512&digest=hex&name=[hash].[ext]',
					'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
				],
			},
			{
				test: /\.json/,
				loader: 'json'
			},
			{
				test: /\.css$/,
				loader: extractCSS.extract(['css']) 
			},
			{
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', ['css?sourceMap', 'postcss', 'resolve-url', 'sass?sourceMap'])
			},
      {
        test: /\.pug$/,
        loader: 'pug-html-loader'
      },
      {
        test: /\.html$/,
        loader: 'html'
      }
    ]
  },
	postcss: [autoprefixer({ browsers: ['> 5%', 'ie > 8']  })],
	stylelint: {
		configFile: path.join(__dirname, './.stylelint.config.js'),
		configOverrides: {
		}
	},
  plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
		  	screw_ie8: true
			}
		}),
    extractCSS
  ],
  resolve: {
      modulesDirectories: [
        'node_modules'
      ]
  },
  resolveLoader: {
    modulesDirectories: ['node_modules'],
    moduleTemplates: ['*-loader', '*'],
    extensions: ['', '.js']
  }
}

module.exports = config
