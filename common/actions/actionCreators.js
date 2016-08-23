import {

	START_TIMER,
	STOP_TIMER,

	FETCH_RESULTS_REQUEST,
	FETCH_RESULTS_SUCCESS,
	// FETCH_RESULTS_FAILURE,

} from './actionTypes.js'

const fetch = require('fetch-ponyfill')()

const startTimer = (now = Date.now()) => ({
	type: START_TIMER,
	now,
})

const stopTimer = () => ({
	type: STOP_TIMER,
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

// const fetchResultsFailure = () => ({
// 	type: FETCH_RESULTS_FAILURE,
// })

const fetchResults = ({ url }) =>

	(dispatch) => {

		dispatch(fetchResultsRequest({ url }))

		const apiUrl = process.env.npm_package_config_api_url

		return fetch(`${apiUrl}/api/${url}`)
			.then(response => {

				// if error, bail out
				if (response.status !== 200) throw new Error(response.statusText)

				return response

			})
			.then(response => response.json())
			.then(data => dispatch(fetchResultsSuccess({ url, data })))
			// TODO: add error handling
			.catch(e => console.log(e))

	}

export {
	startTimer,
	stopTimer,
	fetchResults,
}
