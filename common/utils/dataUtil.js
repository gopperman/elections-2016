import _ from 'lodash'

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

export {
	getRaceUnits,
	getPresidentStates,
	getPresidentSummaryState,
}
