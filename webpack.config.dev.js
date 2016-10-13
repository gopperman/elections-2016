const path = require('path')
const webpack = require('webpack')

module.exports = {
	devtool: 'inline-source-map',
	entry: [
		'webpack-hot-middleware/client',
		'./client/index.js',
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/static/',
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.ProvidePlugin({
			Promise: 'imports?this=>global!exports?global.Promise!es6-promise',
		}),
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules/,
				include: __dirname,
			},
			{
				test: /\.styl$/,
				loader: 'style-loader!css-loader!stylus-loader',
			},
			{
				test: /\.json$/,
				loader: 'json-loader',
			},
			{
				test: /\.png$/,
				loader: 'url-loader?limit=100000',
			},
			{
				test: /\.(jpg|svg)$/,
				loader: 'file-loader',
			},
		],
	},
}
