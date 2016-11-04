/** @module */

import _ from 'lodash'
import { transpose, range } from 'd3-array'
import { normalizeParty } from './standardize.js'

/* Builds a senate trend report from a list of races
 * Specifically, for displaying the balance of power on the Senate page,
 * where we don't have access to the AP API's senate trend report.
 * @param {array} An array of race objects
 */
const senateTrendReport = (races) => {
	const trends = _.countBy(races.map((race) => {
		const candidates = _.get(race, 'reportingUnits[0].candidates')
		const winner = _.find(candidates, { winner: 'X' })

		if (winner) {
			return normalizeParty(winner.party)
		}

		// If there's no winner, figure out if you can at least call
		// the runoff race for a party.
		const runoffs = _.filter(candidates, { winner: 'R' })
		const winningParties =
			Object.keys(_.countBy(runoffs.map((candidate) => candidate.party)))

		// If there's one and only one party that advanced to the runoff,
		// return that party.
		if (winningParties.length === 1) {
			return normalizeParty(winningParties[0])
		}

		return null
	}))

	// We know the number of holdovers this year
	return 	{
		dem: {
			holdovers: 34,
			won: _.get(trends, 'dem', 0),
		},
		gop: {
			holdovers: 30,
			won: _.get(trends, 'gop', 0),
		},
		ind: {
			holdovers: 2,
			won: _.get(trends, 'ind', 0),
		},
	}
}

const buildSeats = ({ total = 0, rows = 0,
dem = { won: 0, holdovers: 0 },
ind = { won: 0, holdovers: 0 },
gop = { won: 0, holdovers: 0 } }) => {

	const columns = Math.ceil(total / rows)

	const realTotal = columns * rows

	const none = total - (dem.won + dem.holdovers +
		gop.won + gop.holdovers +
		ind.won + ind.holdovers)

	// Create an array of dem, ind, none, and gop, in that order.
	const seats = [].concat(

		range(dem.holdovers).map(() => ({ party: 'dem', isHoldover: true })),
		range(dem.won).map(() => ({ party: 'dem', isHoldover: false })),

		range(ind.holdovers).map(() => ({ party: 'ind', isHoldover: true })),
		range(ind.won).map(() => ({ party: 'ind', isHoldover: false })),

		range(none).map(() => ({ party: 'none', isHoldover: false })),

		range(gop.won).map(() => ({ party: 'gop', isHoldover: false })),
		range(gop.holdovers).map(() => ({ party: 'gop', isHoldover: true })),

		range(realTotal - total).map(() => ({ })),

	)

	const result = _.flatten(transpose(_.chunk(seats, rows)))

	return result

}

export {
	buildSeats,
	senateTrendReport,
}
