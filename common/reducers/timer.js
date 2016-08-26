import {
	START_TIMER,
	STOP_TIMER,
	CANCEL_TIMER,
} from './../actions/actionTypes.js'

export default(state = {}, action) => {

	const { type } = action

	const { status } = state

	switch (type) {

		case START_TIMER:

			return {
				...state,
				status: status === 'canceled' || status === 'stopped' ?
					'running' :
					status,
			}

		case STOP_TIMER:

			return {
				...state,
				status: status === 'running' ?
					'stopped' :
					status,
			}

		case CANCEL_TIMER:

			return {
				...state,
				status: status === 'stopped' ?
					'canceled' :
					status,
			}

		default:

			return state
	}
}

