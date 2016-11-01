import express from 'express'
import serializeError from 'serialize-error'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import DashboardPlugin from 'webpack-dashboard/plugin'
import api from './api.js'
import webpackConfig from './../webpack.config.homepage.dev.js'

const app = express()
const port = process.env.PORT || 3001

// Get webpack config
const compiler = webpack(webpackConfig)

compiler.apply(new DashboardPlugin())

// Tell express to use webpack dev middleware to compile js on the fly
app.use(webpackDevMiddleware(compiler, {
	quiet: true,
	noInfo: true,
	publicPath: webpackConfig.output.publicPath,
}))

// Use this middleware to set up hot module reloading via webpack
app.use(webpackHotMiddleware(compiler, {
	log: () => {},
}))

// Tell express to use pug as our view engine
// We'll only use this to render the top-level html wrapper
app.set('views', './common')
app.set('view engine', 'pug')

app.get('/api/*', api)

app.get('/', (req, res) => {

	res.render('homepage', {
		pretty: true,
		appHtml: 'apphtml',
		isProduction: process.env.NODE_ENV === 'production',
	})

})

app.listen(port, (error) => {

	if (error) {

		console.error('server.dev.js: error trying to start app')
		console.error(serializeError(error))

	} else {

		console.info(`==> 🌎  Open http://localhost:${port}/.`)

	}

})
