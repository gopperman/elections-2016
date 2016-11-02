import express from 'express'
import path from 'path'
import serializeError from 'serialize-error'
import url from 'url'
import proxy from 'express-http-proxy'
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

app.use('/css', proxy('www.bostonglobe.com', {
	forwardPath: (req) => `/css${url.parse(req.url).path}`,
}))

app.use('/js', proxy('www.bostonglobe.com', {
	forwardPath: (req) => `/js${url.parse(req.url).path}`,
}))

app.use('/rw', proxy('www.bostonglobe.com', {
	forwardPath: (req) => `/rw${url.parse(req.url).path}`,
}))

app.use('/rf', proxy('www.bostonglobe.com', {
	forwardPath: (req) => `/rf${url.parse(req.url).path}`,
}))

app.get('/api/*', api)

app.get('/', (req, res) => {

	res.sendFile(path.join(__dirname, '../common', 'homepage.html'))

})

app.listen(port, (error) => {

	if (error) {

		console.error('server.dev.js: error trying to start app')
		console.error(serializeError(error))

	} else {

		console.info(`==> 🌎  Open http://localhost:${port}/.`)

	}

})
