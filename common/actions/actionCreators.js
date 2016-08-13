import {

	START_TIMER,
	STOP_TIMER,

	FETCH_RESULTS_REQUEST,
	FETCH_RESULTS_SUCCESS,
	// FETCH_RESULTS_FAILURE,

} from './actionTypes.js'

const startTimer = (now) => ({
	type: START_TIMER,
	now,
})

const stopTimer = () => ({
	type: STOP_TIMER,
})

const fetchResultsRequest = () => ({
	type: FETCH_RESULTS_REQUEST,
})

const fetchResultsSuccess = () => ({
	type: FETCH_RESULTS_SUCCESS,
})

// const fetchResultsFailure = () => ({
// 	type: FETCH_RESULTS_FAILURE,
// })

const fetchResults = () =>

	(dispatch) => {

		dispatch(fetchResultsRequest())

		setTimeout(() => {
			dispatch(fetchResultsSuccess())
		}, 2000)

	}

export {
	startTimer,
	stopTimer,

	// fetchResultsRequest,
	// fetchResultsSuccess,
	// fetchResultsFailure,

	fetchResults,
}
