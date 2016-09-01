import {
	SELECT_TOWN,
} from './../actions/actionTypes.js'

const initialState = {
}

export default(state = initialState, action) => {

	const { type, town } = action

	// TODO: consider switching to something like updeep
	switch (type) {

		case SELECT_TOWN:

			return {
				...state,
				town,
			}

		default:

			return state

	}
}
