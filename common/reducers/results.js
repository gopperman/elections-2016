import {
	FETCH_RESULTS_REQUEST,
	FETCH_RESULTS_SUCCESS,
	FETCH_RESULTS_FAILURE,
} from './../actions/actionTypes.js'

export default(state = {}, action) => {

	const { type } = action

	switch (type) {

		case FETCH_RESULTS_REQUEST:

			return {
				...state,
				isFetching: true,
			}

		case FETCH_RESULTS_SUCCESS:

			return {
				...state,
				isFetching: false,
			}

		case FETCH_RESULTS_FAILURE:

			return {
				...state,
				isFetching: false,
			}

		default:

			return state
	}
}