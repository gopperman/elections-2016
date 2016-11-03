import _ from 'lodash'
import { normalizeParty } from './standardize.js'

const prepareReport = (report) => {

	// Get all the `party` keys.
	const parties = _.get(report, 'party', [])

	// Iterate over the parties,
	const result = _(parties)
		.map(v => ({
			// return everything in the party,
			...v,
			// and also turn `trend` into an object,
			..._.assign.apply(null, v.trend),
		}))
		// and lowercase + toInt when appropriate.
		.map(v => ({
			[normalizeParty(v.title)]: {
				won: +v.Won,
				leading: +v.Leading,
				holdovers: +v.Holdovers,
			},
		}))
		.value()

	// Finally, turn everything into an object.
	return _.assign.apply(null, result)

}

const getReports = (reports) => {

	// Get all the reports.
	const allReports = _(reports)
		.map('reports')
		.flatten()
		.map('report.trendtable')
		.map(v => ({
			officeType: v.OfficeTypeCode,
			...prepareReport(v),
		}))
		.value()

	return allReports

}

export default getReports
