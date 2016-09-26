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

const getPresidentSummary = (data) => {
	const usRace = data.races.map(v => ({
		...v.reportingUnits[0],
	}))

	// Get summary US race.
	return _.find(usRace, { statePostal: 'US' })
}

export {
	// eslint-disable-next-line import/prefer-default-export
	getRaceUnits, getPresidentSummary,
}
