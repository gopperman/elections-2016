import {
	START_TIMER,
} from './../actions/actionTypes.js'

export default(state = {}, action) => {

	const { type, now } = action

	switch (type) {

		case START_TIMER:

			return {
				...state,
				startedAt: now,
			}

		default:

			return state
	}
}

