import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from './../reducers/index.js'

export default (initialState) => {

	const isProd = process.env.NODE_ENV === 'production'
	const showDevTools = !isProd &&
		typeof window !== 'undefined' &&
		window.devToolsExtension

	const store = createStore(
		reducers,
		initialState,
		compose(
			applyMiddleware(
				thunk,
			),
			showDevTools ? window.devToolsExtension() : f => f,
		)
	)

	return store

}
