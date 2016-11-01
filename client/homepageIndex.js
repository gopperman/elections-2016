// This is the app's client-side entry point. Webpack starts here when
// bundling the entire codebase.

/* eslint-disable global-require, no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from './../common/store/configureStore.js'
import css from './../common/styles/config.styl'

// Hydrate the Redux store with `initialState`.
const store = configureStore({})

const containerName = process.env.HP_CONTAINER

const node = document.getElementById(`elections-${containerName}`)

// Setup a `render` function that we will overwrite for hot module
// reloading - see https://github.com/reactjs/redux/pull/1455.
let render = () => {

	const Root = require('./../common/components/HomepageRoot.js').default

	// Render Root to `electoralCollege`.
	if (node) {
		ReactDOM.render(<Root store={store} />, node)
	}

}

// If HMR is enabled,
if (module.hot) {

	const renderRoot = render

	// and we have an error,
	const renderError = (error) => {

		const RedBox = require('redbox-react').default

		// render error with `RedBox` styling.
		if (node) {
			ReactDOM.render(<RedBox error={error} />, node)
		}

	}

	// Otherwise try to render app normally.
	render = () => {

		try {
			renderRoot()
		} catch (error) {
			renderError(error)
		}

	}

	module.hot.accept('./../common/components/HomepageRoot.js', () => {
		setTimeout(render)
	})

}

render()
