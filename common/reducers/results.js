import {
	FETCH_RESULTS_REQUEST,
	FETCH_RESULTS_SUCCESS,
} from './../actions/actionTypes.js'

const initialState = {
	isFetching: false,
}

export default(state = initialState, action) => {

	const { type, data, url } = action

	// TODO: consider switching to something like updeep
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

		default:

			return state
	}
}
