/* eslint-disable global-require, no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import configureStore from './../common/store/configureStore.js'
import css from './../common/styles/config.styl'

// Grab the initial Redux state (a json string created by the server).
const initialState = window.REDUX__INITIALSTATE

// Hydrate the Redux store with `initialState`.
const store = configureStore(initialState)

const rootElement = document.getElementById('root')

// Setup a `render` function that we will overwrite for hot module
// reloading - see https://github.com/reactjs/redux/pull/1455.
let render = () => {

	const Root = require('./../common/components/Root.js').default

	// Render React app to `rootElement`.
	ReactDOM.render(
		<Root history={browserHistory} store={store} />, rootElement)

}

// If HMR is enabled,
if (module.hot) {

	const renderRoot = render

	// and we have an error,
	const renderError = (error) => {

		const RedBox = require('redbox-react')

		// render error with `RedBox` styling.
		ReactDOM.render(<RedBox error={error} />, rootElement)

	}

	// Otherwise try to render app normally.
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
