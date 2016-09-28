import _ from 'lodash'
import { geoAlbersUsa } from 'd3-geo'
import STATES from './../../data/output/STATES.json'
import {
	getPresidentStates,
	getPresidentSummaryState,
} from './dataUtil.js'
import {
	sortByElectoralCount,
	sortByPolIDs,
} from './Candidates.js'

const getUSMapArguments = (data) => {
	// Get summary US race.
	const summaryState = getPresidentSummaryState(data)

	// Get summary US candidates, so we can sort by them.
	const summaryStateCandidates = sortByElectoralCount(
		summaryState.candidates)

	const states = _(getPresidentStates(data))
		// don't include summary state,
		.reject({ statePostal: 'US' })
		// sort states by their full name,
		.sortBy('stateName')
		.map(v => ({
			...v,
			// and sort candidates by overall candidates.
			candidates: sortByPolIDs({
				candidates: v.candidates,
				polIDs: _.map(summaryStateCandidates, 'polID'),
			}),
		}))
		.value()

	return {
		topoObject: STATES,
		data: states,
		sortingDelegate: sortByElectoralCount,
		projection: geoAlbersUsa(),
		unitName: 'statePostal',
	}
}

export {
	getUSMapArguments,
}

