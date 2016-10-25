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

const getSenateReport = (reports) => {
	const r = (reports && reports[0]) || {} 
	const reps = r.reports

	const senateReport = _.find(reps, { title: 'Trend / s / test / US' })

	// The report can come in as undefined at first, need to be defensive
	const trendtable = (senateReport && senateReport.report && senateReport.report.trendtable) || {}
	const parties = (trendtable && trendtable.party) || []
	console.log(parties)
	const balance = (parties && parties.map(p => {
		//TO-DO: Do no use Object.assign
		const trends = Object.assign(...p.trend)
		return { 
			'party': p.title,
			'seats': parseInt(trends.Holdovers) + parseInt(trends.Won)
		}
	})) || []

	return balance
}

export {
	getRaceUnits,
	getPresidentStates,
	getPresidentSummaryState,
	getSenateReport,
}
