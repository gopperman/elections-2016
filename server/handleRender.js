import React from 'react'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'

import configureStore from './../common/store/configureStore.js'
import initialState from './../common/store/initialState.js'
import routes from './../common/routes.js'

export default (req, res) => {

	match({ routes, location: req.url }, (err, redirect, props) => {

		// in here we can make some decisions all at once
		if (err) {

			// there was an error somewhere during route matching
			res.status(500).send(err.message)

		} else if (redirect) {

			// we haven't talked about `onEnter` hooks on routes, but before a
			// route is entered, it can redirect. Here we handle on the server.
			res.redirect(redirect.pathname + redirect.search)

		} else if (props) {

			// Create a new Redux store instance
			const store = configureStore(initialState)

			// Render the component to a string
			const appHtml = renderToString(
				<Provider store={store}>
					<RouterContext {...props} />
				</Provider>
			)

			// Grab the initial state from our Redux store
			const finalState = store.getState()

			// Make express render 'html' view with an object as parameter
			res.render('html', {
				pretty: true,
				appHtml,
				initialState: finalState,
				isProduction: process.env.NODE_ENV === 'production',
			})

		} else {

			// no errors, no redirect, we just didn't match anything
			res.status(404).send('Not Found')

		}

	})

}
