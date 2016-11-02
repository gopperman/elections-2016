import _ from 'lodash'
import { getSenateReport } from './dataUtil.js'

const senateIsComplete = (reports) => {

	// Get the Senate report.
	const senateData = getSenateReport(reports)

	// Get the total number of leading seats.
	const leadingSenateSeats =
		_.get(senateData, 'dem.leading', 0) +
		_.get(senateData, 'gop.leading', 0) +
		_.get(senateData, 'ind.leading', 0)

	// Senate report is complete when there are no leading seats.
	return leadingSenateSeats === 0

}

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
	senateIsComplete,
	racesAreComplete,
}
