import {
	SELECT_TOWN,
} from './../actions/actionTypes.js'

const initialState = {
	town: {
		name: null,
		position: null,
	},
}

export default(state = initialState, action) => {

	const { type, town, position } = action

	// TODO: consider switching to something like updeep
	switch (type) {

		case SELECT_TOWN:

			return {
				...state,
				town: {
					name: town || null,
					position: position || null,
				},
			}

		default:

			return state

	}
}