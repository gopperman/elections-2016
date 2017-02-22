// This creates the Redux store.

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from './../reducers/index.js'

export default (initialState) => {

	const isProd = process.env.NODE_ENV === 'production'
	const showDevTools = !isProd &&
		typeof window !== 'undefined' &&
		window.devToolsExtension

	// Create the Redux store and
	const store = createStore(
		// add our app reducers,
		reducers,
		// the app's initial state,
		initialState,
		compose(
			applyMiddleware(
				// redux-thunk (for async fetching),
				thunk,
			),
			// and the redux dev tools extension.
			showDevTools ? window.devToolsExtension() : f => f,
		)
	)

	return store

}
