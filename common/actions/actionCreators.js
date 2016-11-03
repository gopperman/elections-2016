import serializeError from 'serialize-error'
import {

	START_TIMER,
	STOP_TIMER,
	CANCEL_TIMER,

	FETCH_RESULTS_REQUEST,
	FETCH_RESULTS_SUCCESS,
	FETCH_RESULTS_FAILURE,

} from './actionTypes.js'

const { fetch } = require('fetch-ponyfill')()

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

const fetchResultsRequest = ({ url }) => ({
	type: FETCH_RESULTS_REQUEST,
	url,
})

const fetchResultsSuccess = ({ data }) => ({
	type: FETCH_RESULTS_SUCCESS,
	data,
})

const fetchResultsFailure = ({ error }) => ({
	type: FETCH_RESULTS_FAILURE,
	error,
})

const fetchResults = ({ url }) =>

	(dispatch) => {

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

		return fetch(fullUrl)
			.then(response => {

				// if error, bail out
				if (response.status !== 200) throw new Error(response.statusText)

				return response

			})
			.then(response => response.json())
			.then(data => {

				// Did we not get any races?
				if (!data || !data.races || !data.races.length) {

					// Indeed we got no races. Prepare an error message.
					const message = `API didn't return any races for ${url}`

					// Are we on the server?
					if (!location) {

						// Then throw an error so we won't render any pages.
						throw new Error(message)

					// If we're on the client,
					} else {

						// log the error,
						console.error('actionCreator.js: we did not get any races')
						console.error(message)

						// and fire the failure redux action so the user is notified.
						return dispatch(fetchResultsFailure({ error: message }))

					}

				} else {

					// We did get at least 1 race! Proceed.
					return dispatch(fetchResultsSuccess({ data }))

				}

			})
			.catch(error => {

				// We got an error.
				// If we're on the client,
				if (location) {

					// log the error,
					console.error('actionCreator.js: error in fetch catch')
					console.error(serializeError(error))

					// and fire the failure redux action so the user is notified.
					dispatch(fetchResultsFailure({ error: serializeError(error) }))

				} else {

					// We're on the server.
					// Throw an error so we won't render any pages.
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
