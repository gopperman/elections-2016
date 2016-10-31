import express from 'express'
import serializeError from 'serialize-error'
import compression from 'compression'
import handleRender from './handleRender.js'

const app = express()
const port = process.env.PORT || 3001

// enable compression
app.use(compression())

app.disable('x-powered-by')

// tell express to serve static files from the static directory
app.use('/static', express.static('static'))

// Tell express to use pug as our view engine
// We'll only use this to render the top-level html wrapper
app.set('views', './common')
app.set('view engine', 'pug')

// This is fired every time the server side receives a request
app.get('*', handleRender)

app.listen(port, (error) => {

	if (error) {

		console.error('server.prod.js: error trying to start app')
		console.error(serializeError(error))

	} else {

		console.info(`==> 🌎  Open http://localhost:${port}/.`)

	}

})
