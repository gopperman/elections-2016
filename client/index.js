import React from 'react'
import ReactDOM from 'react-dom'

// eslint-disable-next-line no-unused-vars
import css from './../common/styles/config.styl'

const rootElement = document.getElementById('root')

let render = () => {

	// eslint-disable-next-line global-require
	const App = require('./../common/components/App.js').default

	ReactDOM.render(<App />, rootElement)

}

if (module.hot) {

	const renderApp = render
	const renderError = (error) => {

		// eslint-disable-next-line global-require
		const RedBox = require('redbox-react')

		ReactDOM.render(<RedBox error={error} />, rootElement)

	}

	render = () => {

		try {
			renderApp()
		} catch (error) {
			renderError(error)
		}

	}

	module.hot.accept('./../common/components/App.js', () => {
		setTimeout(render)
	})

}

render()
