import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import DashboardPlugin from 'webpack-dashboard/plugin'
import handleRender from './handleRender.js'
import api from './api.js'
import webpackConfig from './../webpack.config.dev.js'
import logger from './../common/utils/logger.js'

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

// This is fired every time the server side receives a request
app.get('*', handleRender)

app.listen(port, (error) => {

	if (error) {

		logger(error)

	} else {

		console.info(`==> 🌎  Open http://localhost:${port}/.`)

	}

})
