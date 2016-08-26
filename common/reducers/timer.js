import {
	START_TIMER,
	STOP_TIMER,
	CANCEL_TIMER,
} from './../actions/actionTypes.js'

import Timer from './../components/Timer.js'

const { CANCELED, RUNNING, STOPPED } = Timer.status

const initialState = {
	status: STOPPED,
}

export default(state = initialState, action) => {

	const { type, now } = action
	const { status } = state

	switch (type) {

		case START_TIMER:

			return {
				...state,
				startedAt: now,
				status: status === CANCELED || status === STOPPED ?
					RUNNING :
					status,
			}

		case STOP_TIMER:

			return {
				...state,
				status: status === RUNNING ?
					STOPPED :
					status,
			}

		case CANCEL_TIMER:

			return {
				...state,
				status: status === STOPPED ?
					CANCELED :
					status,
			}

		default:

			return state
	}
}

