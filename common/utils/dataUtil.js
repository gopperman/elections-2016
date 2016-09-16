const getRaceUnits = (data) => {

	// Grab the `data.races` property.
	const { races } = data

	// If possible, grab the first race. Otherwise set it to an
	// empty object.
	const race = (races && races[0]) || {}
	const subunits = race.reportingUnits || []

	console.log('race:')
	console.log(race)

	return subunits

}

export {
	// eslint-disable-next-line import/prefer-default-export
	getRaceUnits,
}
