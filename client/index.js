import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'

// eslint-disable-next-line no-unused-vars
import css from './../common/styles/config.styl'

const rootElement = document.getElementById('root')

// the following code (render, module.hot if, etc) comes from
// https://github.com/reactjs/redux/pull/1455 (cleaner than react-hmre)
let render = () => {

// eslint-disable-next-line global-require
	const Root = require('./../common/components/Root.js').default

	ReactDOM.render(<Root history={browserHistory} />, rootElement)

}

if (module.hot) {

	const renderRoot = render
	const renderError = (error) => {

		// eslint-disable-next-line global-require
		const RedBox = require('redbox-react')

		ReactDOM.render(<RedBox error={error} />, rootElement)

	}

	render = () => {

		try {
			renderRoot()
		} catch (error) {
			renderError(error)
		}

	}

	module.hot.accept('./../common/components/Root.js', () => {
		setTimeout(render)
	})

}

render()
