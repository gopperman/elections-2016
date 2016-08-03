import express from 'express'
import handleRender from './handleRender.js'

const app = express()
const port = process.env.npm_package_config_port

// tell express to use pug as our view engine
// we'll only use this to render the top-level html wrapper
// TODO: consider replacing this with react components
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
