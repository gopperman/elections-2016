import express from 'express'
import webpack from 'webpack'
import handleRender from './handleRender.js'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackConfig from './../webpack.config.dev.js'

const app = express()
const port = process.env.npm_package_config_port

// Get webpack config
const compiler = webpack(webpackConfig)

// Tell express to use webpack dev middleware to compile js on the fly
app.use(webpackDevMiddleware(compiler, {
	noInfo: true,
	publicPath: webpackConfig.output.publicPath
}))

// Tell express to use pug as our view engine
// We'll only use this to render the top-level html wrapper
app.set('views', './common')
app.set('view engine', 'pug')

// This is fired every time the server side receives a request
app.get('*', handleRender)

app.listen(port, (error) => {

	if (error) {

		console.error(error)

	} else {

		console.info(`==> 🌎  Open http://localhost:${port}/.`)

	}

})
