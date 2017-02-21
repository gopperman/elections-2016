// This module houses the Redux action creators.

import logger from './../utils/logger.js'
import {

	START_TIMER,
	STOP_TIMER,
	CANCEL_TIMER,

	FETCH_RESULTS_REQUEST,
	FETCH_RESULTS_SUCCESS,
	FETCH_RESULTS_FAILURE,

} from './actionTypes.js'
import config from './../../data/config.json'

const { fetch } = require('fetch-ponyfill')()

// The timer actions deal with the "next update in" clock.
const startTimer = (now = Date.now()) => ({
	type: START_TIMER,
	now,
})

const stopTimer = () => ({
	type: STOP_TIMER,
})

const cancelTimer = () => ({
	type: CANCEL_TIMER,
})

// The fetch results actions deal with requesting new election results.
const fetchResultsRequest = ({ url }) => ({
	type: FETCH_RESULTS_REQUEST,
	url,
})

const fetchResultsSuccess = ({ data, breakingNews }) => ({
	type: FETCH_RESULTS_SUCCESS,
	data,
	breakingNews,
})

const fetchResultsFailure = ({ error }) => ({
	type: FETCH_RESULTS_FAILURE,
	error,
})

// This is the fetch results thunk.
const fetchResults = ({ url }) =>

	(dispatch) => {

		// Fire the `request` action.
		dispatch(fetchResultsRequest({ url }))

		let fullUrl
		const location = typeof window !== 'undefined' && window.location

		// If we're on prod,
		if (process.env.NODE_ENV === 'production') {

			// and we're building a homepage component,
			if (process.env.HP_CONTAINER) {

				// use an env variable to construct the full url.
				fullUrl = `${process.env.API_URL}/electionapi/elections/${url}`

			// Else, if we're on the client,
			} else if (location) {

				// use the window location to construct the full url.
				fullUrl = `${location.origin}/electionapi/elections/${url}`

			} else {

				// But if we're on the server,
				// use an env variable to construct the full url.
				fullUrl = `${process.env.API_URL}/electionapi/elections/${url}`

			}

		} else if (process.env.NODE_ENV === 'staging') {

			fullUrl = `${process.env.API_URL}/electionapi/elections/${url}`

		} else {
			// Finally, if we're on dev, use localhost:3001/api.
			fullUrl = `http://localhost:3001/api/${url}`

		}

		// Convenience function to parse JSON.
		const parseJson = (response) => response.json()

		// This function tries to fetch JSON,
		// and throws an error if the response is invalid.
		const getJsonSafely = (urlToFetch) =>
			fetch(urlToFetch)
				.then(response => {
					// if error, bail out
					if (response.status !== 200) {
						const error = new Error(response.statusText)
						logger(error)
						throw error
					}
					return response
				})
				.then(parseJson)

		// This function tries to fetch JSON,
		// and returns a blank object if the response is invalid.
		const getJson = (urlToFetch) =>
			fetch(urlToFetch)
				.then(response => {
					// if error, continue.
					if (response.status !== 200) return {}
					return response
				})
				.then(parseJson)
				.catch(error => {
					// if we get an error, swallow it.
					logger(error)
					return {}
				})

		const { breakingNewsUrl } = config

		// Get both election results and breaking news.
		return Promise.all([getJsonSafely(fullUrl), getJson(breakingNewsUrl)])
			.then(([data, breakingNews]) => {

				// Did we not get any races?
				if (!data || !data.races || !data.races.length) {

					// Indeed we got no races. Prepare an error message.
					const message = `API didn't return any races for ${url}`

					// Are we on the server?
					if (!location) {

						// Then throw an error so we won't render any pages.
						const error = new Error(message)
						throw error

					// If we're on the client,
					} else {

						// log the error,
						logger(new Error(message))

						// and fire the failure redux action so the user is notified.
						return dispatch(fetchResultsFailure({ error: message }))

					}

				} else {

					// We did get at least 1 race! Proceed.
					return dispatch(fetchResultsSuccess({ data, breakingNews }))

				}

			})
			.catch(error => {

				// We got an error.
				// If we're on the client,
				if (location) {

					// log the error,
					logger(error)

					// and fire the failure redux action so the user is notified.
					dispatch(fetchResultsFailure({ error }))

				} else {

					// We're on the server.
					// Throw an error so we won't render any pages.
					logger(error)
					throw new Error(error)

				}

			})
	}

export {

	startTimer,
	stopTimer,
	cancelTimer,
	fetchResults,
}
