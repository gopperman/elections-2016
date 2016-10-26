import _ from 'lodash'
import { normalizeParty } from './standardize.js'

const getSenateReport = (reports) => {

	// Get the senate report
	const report = _(reports)
		.map('reports')
		.flatten()
		.find({ title: 'Trend / s / test / US' }) || {}

	// Get all the `party` keys.
	const parties = _.get(report, 'report.trendtable.party') || []

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
			party: normalizeParty(v.title),
			won: +v.Won,
			leading: +v.Leading,
			holdovers: +v.Holdovers,
		}))
		.value()

	return result

}

export {
	// eslint-disable-next-line import/prefer-default-export
	getSenateReport,
}
