import {
	SELECT_FEATURE,
} from './../actions/actionTypes.js'

const initialState = {
	feature: {
		name: null,
		position: null,
		map: null,
	},
}

export default(state = initialState, action) => {

	const { type, feature, position, map } = action

	// TODO: consider switching to something like updeep
	switch (type) {

		case SELECT_FEATURE:

			return {
				...state,
				feature: {
					name: feature || null,
					position: position || null,
					map: map || null,
				},
			}

		default:

			return state

	}
}
