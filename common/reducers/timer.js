import {
	START_TIMER,
	STOP_TIMER,
} from './../actions/actionTypes.js'

export default(state = {}, action) => {

	const { type, now } = action

	switch (type) {

		case START_TIMER:

			return {
				...state,
				startedAt: now,
			}

		case STOP_TIMER:

			return {
				...state,
				startedAt: null,
			}

		default:

			return state
	}
}

