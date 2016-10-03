import {
	FETCH_RESULTS_REQUEST,
	FETCH_RESULTS_SUCCESS,
	FETCH_RESULTS_FAILURE,
} from './../actions/actionTypes.js'

const initialState = {
	isFetching: false,
}

export default(state = initialState, action) => {

	const { type, data, url, error } = action

	switch (type) {

		case FETCH_RESULTS_REQUEST:

			return {
				...state,
				url,
				isFetching: true,
			}

		case FETCH_RESULTS_SUCCESS:

			return {
				...state,
				url,
				data,
				isFetching: false,
			}

		case FETCH_RESULTS_FAILURE:

			return {
				...state,
				isFetching: false,
				error,
			}

		default:

			return state
	}
}
