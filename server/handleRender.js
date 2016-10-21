import React from 'react'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { match, RouterContext, createMemoryHistory } from 'react-router'
import { trigger } from 'redial'

import configureStore from './../common/store/configureStore.js'
import initialState from './../common/store/initialState.js'
import routes from './../common/routes.js'

export default (req, res) => {

	// Create a new Redux store instance
	const store = configureStore(initialState)
	const { dispatch, getState } = store

	// Set up history for router
	const history = createMemoryHistory(req.url)

	match({ routes, history }, (error, redirect, props) => {

		if (error) {

			// there was an error somewhere during route matching
			console.error(error.message)
			res.status(500).send(error.message)

		} else if (redirect) {

			// TODO: better understanding of this line
			console.error('error during redirect')
			res.redirect(redirect.pathname + redirect.search)

		} else if (props) {

			// Get array of route handler components
			const { components } = props

			// Define locals to be provided to all lifecycle hooks
			const locals = {
				path: props.location.pathname,
				query: props.location.query,
				params: props.params,

				// Allow lifecycle hooks to dispatch Redux actions
				dispatch,
			}

			// Wait for async data fetching to complete, then render
			trigger('fetch', components, locals)
				.then(() => {

					const state = getState()

					// Render the component to a string
					const appHtml = renderToString(
						<Provider store={store}>
							<RouterContext {...props} />
						</Provider>
					)

					res.header('Surrogate-Key', 'electionsapp')

					// Make express render 'html' view with an object as parameter
					res.render('html', {
						pretty: true,
						appHtml,
						initialState: state,
						isProduction: process.env.NODE_ENV === 'production',
					})

				})
				.catch(e => {

					console.error(e)
					res.status(404).send(e.message)

				})

		} else {

			// no errors, no redirect, we just didn't match anything
			console.error('Not Found: Could not match url to any routes')
			res.status(404).send('Not Found')

		}

	})

}
