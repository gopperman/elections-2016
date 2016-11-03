import _ from 'lodash'
import getReports from './getReports.js'

const reportsAreComplete = (reports) =>

	// For each report,
	_(getReports(reports))
		// get all the leading seats,
		.map(v =>
			_.get(v, 'dem.leading', 0) +
			_.get(v, 'gop.leading', 0) +
			_.get(v, 'ind.leading', 0)
		)
		// and check that they all are 0.
		.every(v => v === 0)

const racesAreComplete = (races) =>

	// For each race,
	_(races)
		// grab its reportingUnits,
		.map('reportingUnits')
		// flatten,
		.flatten()
		// grab its precinctsReportingPct,
		.map(v => +v.precinctsReportingPct)
		// and check that all are 100.
		.every(v => v === 100)

export {
	reportsAreComplete,
	racesAreComplete,
}
