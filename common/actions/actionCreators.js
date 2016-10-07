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

const fetchResultsSuccess = ({ url, data }) => ({
	type: FETCH_RESULTS_SUCCESS,
	url,
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

			// and we're on the client,
			if (location) {

				// use the window location to construct the full url.
				fullUrl = `${window.location.origin}/electionapi/elections/${url}`

			} else {

				// But if we're on the server,
				// use an env variable to construct the full url.
				fullUrl = `${process.env.API_URL}/electionapi/elections/${url}`

			}

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
			.then(data => dispatch(fetchResultsSuccess({ url, data })))
			.catch(({ message }) => {
				console.log('caught error and going to rethrow it')
				dispatch(fetchResultsFailure({ error: message }))
			})
	}

export {

	startTimer,
	stopTimer,
	cancelTimer,

	fetchResults,

}
