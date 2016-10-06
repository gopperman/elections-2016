import express from 'express'
import compression from 'compression'
import handleRender from './handleRender.js'
import config from './../config.json'

const app = express()
const { port } = config.prod

// enable compression
app.use(compression())

app.disable('x-powered-by')

// tell express to serve static files from the static directory
app.use('/static', express.static('static'))

// Tell express to use pug as our view engine
// We'll only use this to render the top-level html wrapper
app.set('views', './common')
app.set('view engine', 'pug')

app.get('/homepage', (req, res) => {
	res.status(404).send("The /homepage doesn't exist here.")
})

// This is fired every time the server side receives a request
app.get('*', handleRender)

app.listen(port, (error) => {

	if (error) {

		console.error(error)

	} else {

		console.info(`==> 🌎  Open http://localhost:${port}/.`)

	}

})
