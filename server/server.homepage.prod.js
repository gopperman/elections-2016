import express from 'express'
import compression from 'compression'
import logger from './../common/utils/logger.js'

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

app.get('/', (req, res) => {

	res.render('homepage', {
		pretty: true,
		isProduction: true,
	})

})

app.listen(port, (error) => {

	if (error) {

		logger(error)

	} else {

		console.info(`==> 🌎  Open http://localhost:${port}/.`)

	}

})

