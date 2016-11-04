import _ from 'lodash'
import {
	FETCH_RESULTS_REQUEST,
	FETCH_RESULTS_SUCCESS,
	FETCH_RESULTS_FAILURE,
} from './../actions/actionTypes.js'

const initialState = {
	isFetching: false,
}

export default(state = initialState, action) => {

	const { type, data, breakingNews, url, error } = action

	console.log(`${process.env.HP_CONTAINER} fired action ${type}`)

	switch (type) {

		case FETCH_RESULTS_REQUEST:

			return _.omit({
				...state,
				url,
				isFetching: true,
			}, 'error')

		case FETCH_RESULTS_SUCCESS:

			return _.omit({
				...state,
				data,
				breakingNews,
				isFetching: false,
			}, 'error')

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
