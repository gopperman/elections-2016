import {

	START_TIMER,
	STOP_TIMER,

	FETCH_RESULTS_REQUEST,
	FETCH_RESULTS_SUCCESS,
	// FETCH_RESULTS_FAILURE,

	COMPLETE_RACE,

} from './actionTypes.js'

const fetch = require('fetch-ponyfill')()

const completeRace = () => ({
	type: COMPLETE_RACE,
})

const startTimer = (now = Date.now()) => ({
	type: START_TIMER,
	now,
})

const stopTimer = () => ({
	type: STOP_TIMER,
})

const fetchResultsRequest = () => ({
	type: FETCH_RESULTS_REQUEST,
})

const fetchResultsSuccess = ({ data }) => ({
	type: FETCH_RESULTS_SUCCESS,
	data,
})

// const fetchResultsFailure = () => ({
// 	type: FETCH_RESULTS_FAILURE,
// })

const fetchResults = () =>

	(dispatch) => {

		dispatch(fetchResultsRequest())

		const apiUrl = process.env.npm_package_config_api_url

		// TODO: don't hardcode url
		fetch(`${apiUrl}/api/electoral-us`)
			.then(response => {

				// if error, bail out
				if (response.status !== 200) throw new Error(response.statusText)

				return response

			})
			.then(response => response.json())
			.then(data => dispatch(fetchResultsSuccess({ data })))
			.catch(e => console.log(e))
			// TODO: add error handling

	}

export {
	startTimer,
	stopTimer,

	// fetchResultsRequest,
	// fetchResultsSuccess,
	// fetchResultsFailure,

	fetchResults,

	completeRace,
}
