const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')

module.exports = {
	devtool: 'source-map',
	entry: [
		'./client/entry.js',
	],
	output: {
		path: path.join(__dirname, 'static'),
		filename: 'bundle.js',
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
			'process.env.SSR_ENV': JSON.stringify('client'),
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false,
			},
		}),
		new ExtractTextPlugin('compiled.css', {
			allChunks: true,
		}),
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules/,
			},
			{
				test: /\.styl$/,
				loader: ExtractTextPlugin.extract('style-loader',
					'css-loader!postcss-loader!stylus-loader'),
			},
			{
				test: /\.json$/,
				loader: 'json-loader',
			},
		],
	},
	postcss() {
		return [
			autoprefixer,
		]
	},
}
