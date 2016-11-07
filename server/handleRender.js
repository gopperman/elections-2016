import React from 'react'
import { Provider } from 'react-redux'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { match, RouterContext, createMemoryHistory } from 'react-router'
import { trigger } from 'redial'
import logger from './../common/utils/logger.js'

import configureStore from './../common/store/configureStore.js'
import initialState from './../common/store/initialState.js'
import routes from './../common/routes.js'
import meta from './../data/meta.json'
import pakage from './../package.json'

export default (req, res) => {

	res.header('Surrogate-Key', 'electionsapp')

	// Create a new Redux store instance
	const store = configureStore(initialState)
	const { dispatch, getState } = store

	// Set up history for router
	const { url } = req
	const history = createMemoryHistory(url)

	match({ routes, history }, (error, redirect, props) => {

		console.log('inside match')

		if (error) {

			// there was an error somewhere during route matching
			console.log('error during route matching')
			logger(error)
			res.status(500).send(error.message)

		} else if (redirect) {

			console.log('redirecting')
			res.redirect(redirect.pathname + redirect.search)

		} else if (props) {

			console.log('matched props')

			const isLite = url.match('/hp/')

			// Get array of route handler components
			const { components, params } = props

			// Get page title
			const pageTitle = components
				.map(v => v.getTitle && v.getTitle(params))
				.filter(v => v)[0]

			// Get page section
			const pageSection = components
				.map(v => v.getSection && v.getSection())
				.filter(v => v)[0]

			// Get page title
			const title = [
				pageTitle,
				'Election results 2016',
				'The Boston Globe',
			].filter(v => v).join(' - ')

			// Get omniture title
			const omnitureTitle = components
				.map(v => v.getOmnitureTitle && v.getOmnitureTitle(params))
				.filter(v => v)[0]

			const omniturePageName = [
				'Election 2016',
				pageSection,
				omnitureTitle,
			].filter(v => v).join(' | ')

			// Define locals to be provided to all lifecycle hooks
			const locals = {
				path: props.location.pathname,
				query: props.location.query,
				params,

				// Allow lifecycle hooks to dispatch Redux actions
				dispatch,
			}

			// Wait for async data fetching to complete, then render
			console.log('about to fetch')
			trigger('fetch', components, locals)
				.then(() => {

					console.log('fetched')
					const state = getState()

					if (isLite) {

						console.log('about to render isLite')

						// Render the component to a string
						const appHtml = renderToStaticMarkup(
							<Provider store={store}>
								<RouterContext {...props} />
							</Provider>
						)

						console.log('rendered isLite')

						res.render('homepageLite', {
							pretty: true,
							appHtml,
						})

					} else {

						console.log('about to render')

						// Render the component to a string
						const appHtml = renderToString(
							<Provider store={store}>
								<RouterContext {...props} />
							</Provider>
						)

						console.log('rendered')

						res.render('html', {
							pretty: true,
							appHtml,
							initialState: state,
							isProduction: process.env.NODE_ENV === 'production',
							meta: {
								...meta,
								pageName: omniturePageName,
							},
							version: pakage.version,
							title,
						})

					}

				})
				.catch(e => {

					console.log('error during fetch')

					logger(e)
					res.status(404).send(e.message)

				})

		} else {

			const message = `Not Found: Could not match any routes for ${url}`
			console.log('error - could not match any routes')

			// no errors, no redirect, we just didn't match anything
			logger(new Error(message))
			res.status(404).send(message)

		}

	})

}
