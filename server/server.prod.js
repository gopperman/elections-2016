// This module starts the express server on prod

import express from 'express'
import compression from 'compression'
import handleRender from './handleRender.js'
import logger from './../common/utils/logger.js'

const app = express()
const port = process.env.PORT || 3001

// Enable compression
app.use(compression())

app.disable('x-powered-by')

// Tell express to serve static files from the static directory
app.use('/static', express.static('static'))

// Tell express to use pug as our view engine
// We'll only use this to render the top-level html wrapper
app.set('views', './common')
app.set('view engine', 'pug')

// This is fired every time the server side receives a request
app.get('*', handleRender)

app.listen(port, (error) => {

	if (error) {

		logger(error)

	} else {

		console.info(`==> 🌎  Open http://localhost:${port}/.`)

	}

})
