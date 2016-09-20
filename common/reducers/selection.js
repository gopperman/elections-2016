import {
	SELECT_FEATURE,
} from './../actions/actionTypes.js'

const initialState = {
	feature: {
		name: null,
		position: null,
	},
}

export default(state = initialState, action) => {

	const { type, feature, position } = action

	// TODO: consider switching to something like updeep
	switch (type) {

		case SELECT_FEATURE:

			return {
				...state,
				feature: {
					name: feature || null,
					position: position || null,
				},
			}

		default:

			return state

	}
}
