'use strict'

const NODE_ENV = process.env.NODE_ENV || 'development';

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractCSS = new ExtractTextPlugin('css/[name].css');

var config = {
  context: __dirname,
  entry: [ 
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './src',
	],
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
        test: /\.pug$/,
        loader: 'pug-html-loader'
      },
      {
        test: /\.html$/,
        loader: 'html'
      }
    ]
  },
	stylelint: {
		configFile: path.join(__dirname, './.stylelint.config.js'),
		configOverrides: {
		}
	},
	devServer: {
		port: 4949,
		watchOptions: {
			aggregateTimeout: 100,
			poll: 1000,
		},
		contentBase: './dist',
		hot: true,
		inline: true  
	},
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
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

if ( NODE_ENV === 'production'  ) {
  config.module.loaders.push({
        test: /\.scss$/,
        loader: extractCSS.extract(['css','sass'])
  })
	config.push({
	})
} else {
	config.module.preLoaders.push({test: /\.(sass|scss)$/, loader: 'stylelint'})
  config.module.loaders.push({test: /\.scss$/, loaders: ['style', 'css', 'sass'] })
}
module.exports = config
