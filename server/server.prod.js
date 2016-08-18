import express from 'express'
// import favicon from 'serve-favicon'
import compression from 'compression'
import handleRender from './handleRender.js'
import api from './api.js'

const app = express()
const port = process.env.npm_package_config_port

// enable compression
app.use(compression())

app.disable('x-powered-by')

// tell express to serve static files from the static directory
app.use('/static', express.static('static'))

// Tell express to use pug as our view engine
// We'll only use this to render the top-level html wrapper
app.set('views', './common')
app.set('view engine', 'pug')

// // serve favicon
// app.use(favicon(`${__dirname}/../assets/favicon.ico`))

app.get('/api/:results', api)

// This is fired every time the server side receives a request
app.get('*', handleRender)

app.listen(port, (error) => {

	if (error) {

		console.error(error)

	} else {

		console.info(`==> 🌎  Open http://localhost:${port}/.`)

	}

})
