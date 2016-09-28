import _ from 'lodash'
import { geoAlbersUsa } from 'd3-geo'
import STATES from './../../data/output/STATES.json'
import {
	sortByElectoralCount,
	sortByPolIDs,
} from './Candidates.js'

const getRaceUnits = (data) => {

	// Grab the `data.races` property.
	const { races } = data

	// If possible, grab the first race. Otherwise set it to an
	// empty object.
	const race = (races && races[0]) || {}
	const subunits = race.reportingUnits || []

	return subunits
}

const getPresidentStates = (data) =>
	data.races.map(v => ({
		...v.reportingUnits[0],
	}))

const getPresidentSummaryState = (data) =>
	_.find(getPresidentStates(data), { statePostal: 'US' })

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
	getRaceUnits,
	getPresidentStates,
	getPresidentSummaryState,
	getUSMapArguments,
}
