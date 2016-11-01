// This is the app's client-side entry point. Webpack starts here when
// bundling the entire codebase.

/* eslint-disable global-require, no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from './../common/store/configureStore.js'
import css from './../common/styles/config.styl'
import critical from './../common/appUtils/critical.js'

// Hydrate the Redux store with `initialState`.
const store = configureStore({})

// TODO: change this.
const electoralCollege =
	document.getElementById('elections-electoralCollege')

// Setup a `render` function that we will overwrite for hot module
// reloading - see https://github.com/reactjs/redux/pull/1455.
let render = () => {

	const ElectoralCollegeRoot =
		require('./../common/components/ElectoralCollegeRoot.js').default

	// Render ElectoralCollegeRoot to `electoralCollege`.
	if (electoralCollege) {
		ReactDOM.render(<ElectoralCollegeRoot store={store} />,
			electoralCollege)
	}

}

// If HMR is enabled,
if (module.hot) {

	const renderRoot = render

	// and we have an error,
	const renderError = (error) => {

		const RedBox = require('redbox-react').default

		// render error with `RedBox` styling.
		if (electoralCollege) {
			ReactDOM.render(<RedBox error={error} />, electoralCollege)
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

	module.hot.accept('./../common/components/ElectoralCollegeRoot.js', () => {
		setTimeout(render)
	})

}

render()
