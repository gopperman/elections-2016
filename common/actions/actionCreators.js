import {
	FETCH_RESULTS_REQUEST,
	FETCH_RESULTS_SUCCESS,
	FETCH_RESULTS_FAILURE,
} from './actionTypes.js'

const fetchResultsRequest = () => ({
	type: FETCH_RESULTS_REQUEST,
})

const fetchResultsSuccess = () => ({
	type: FETCH_RESULTS_SUCCESS,
})

const fetchResultsFailure = () => ({
	type: FETCH_RESULTS_FAILURE,
})

export {
	fetchResultsRequest,
	fetchResultsSuccess,
	fetchResultsFailure,
}
