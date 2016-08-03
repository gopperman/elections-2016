const path = require('path')

module.exports = {
	devtool: 'inline-source-map',
	entry: [
		'./client/index.js',
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/static/',
	}
}
// 	plugins: [
// 		new webpack.DefinePlugin({
// 			'process.env': {
// 				JS_ENTRY: JSON.stringify('client'),
// 				LOCAL_CHART:
// 					JSON.stringify(process.env.npm_package_config_local_chart),
// 				BASE_URL:
// 					JSON.stringify(process.env.npm_package_config_base_url_dev),
// 			},
// 		}),
// 		new webpack.optimize.OccurenceOrderPlugin(),
// 		new webpack.HotModuleReplacementPlugin(),
// 		new webpack.NoErrorsPlugin(),
// 	],
// 	module: {
// 		preLoaders: [
// 			{
// 				test: /\.js$/,
// 				exclude: /node_modules/,
// 				loader: 'eslint-loader',
// 			},
// 		],
// 		loaders: [
// 			{
// 				test: /\.js$/,
// 				loader: 'babel',
// 				exclude: /node_modules/,
// 				include: __dirname,
// 				query: {
// 					presets: ['react-hmre'],
// 				},
// 			},
// 			{
// 				test: /\.css$/,
// 				loader: 'style-loader!css-loader',
// 			},
// 			{
// 				test: /\.json$/,
// 				loader: 'json-loader',
// 			},
// 			{
// 				test: /\.(jpg|svg)$/,
// 				loader: 'file-loader',
// 			},
// 		],
// 	},
// 	eslint: {
// 		configFile: '.eslintrc',
// 	},
// }
