/** @module */

import _ from 'lodash'
import { transpose } from 'd3-array'
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

const buildMatrix = ({ total = 0, rows = 0,
dem = { won: 0, holdovers: 0 },
ind = { won: 0, holdovers: 0 },
gop = { won: 0, holdovers: 0 } }) => {

	const none = total - (dem.won + dem.holdovers +
		gop.won + gop.holdovers +
		ind.won + ind.holdovers)

	// Create an array of dem, ind, none, and gop, in that order.
	const seats = [].concat(

		_.range(dem.holdovers).map(() => ({ party: 'dem', isHoldover: true })),
		_.range(dem.won).map(() => ({ party: 'dem', isHoldover: false })),

		_.range(ind.holdovers).map(() => ({ party: 'ind', isHoldover: true })),
		_.range(ind.won).map(() => ({ party: 'ind', isHoldover: false })),

		_.range(none).map(() => ({ party: 'none', isHoldover: false })),

		_.range(gop.won).map(() => ({ party: 'gop', isHoldover: false })),
		_.range(gop.holdovers).map(() => ({ party: 'gop', isHoldover: true })),

	)

	// Partition seats into chunks of size `rows`, thus creating a matrix.
	const matrix = _.chunk(seats, rows)

	// Add party and seat to every matrix element.
	const result = matrix.map(row =>
		row.map((v, seat) => ({ ...v, seat }))
	)

	return result

}

/**
 * Builds a seating chart for balance of power charts. Returns the seats.
 * @memberof visUtils
 * @function
 * @param {number} $0.dem the number of democratic seats
 * @param {number} $0.ind the number of independent seats
 * @param {number} $0.gop the number of gop seats
 * @param {number} $0.total the total number of seats
 * @param {number} $0.rows the desired number of rows
 * @returns {Array} an array of seats
 */
const buildSeats = ({ total = 0, rows = 0,
dem = { won: 0, holdovers: 0 },
ind = { won: 0, holdovers: 0 },
gop = { won: 0, holdovers: 0 } }) => {

	// Build the matrix (seats grouped by columns).
	const matrix = buildMatrix({ dem, gop, ind, total, rows })

	// Add column numbers to each seat and flatten matrix.
	const seats = _(matrix)
		.map((column, columnIndex) =>
			column.map(seat => ({
				...seat,
				column: columnIndex,
			}))
		)
		.flatten()
		.map((seat, index) => ({
			...seat,
			index,
		}))
		.value()

	return seats

}

const buildSeatsLite = ({ total = 0, rows = 0,
dem = { won: 0, holdovers: 0 },
ind = { won: 0, holdovers: 0 },
gop = { won: 0, holdovers: 0 } }) => {

	const none = total - (dem.won + dem.holdovers +
		gop.won + gop.holdovers +
		ind.won + ind.holdovers)

	// Create an array of dem, ind, none, and gop, in that order.
	const seats = [].concat(

		_.range(dem.holdovers).map(() => ({ party: 'dem', isHoldover: true })),
		_.range(dem.won).map(() => ({ party: 'dem', isHoldover: false })),

		_.range(ind.holdovers).map(() => ({ party: 'ind', isHoldover: true })),
		_.range(ind.won).map(() => ({ party: 'ind', isHoldover: false })),

		_.range(none).map(() => ({ party: 'none', isHoldover: false })),

		_.range(gop.won).map(() => ({ party: 'gop', isHoldover: false })),
		_.range(gop.holdovers).map(() => ({ party: 'gop', isHoldover: true })),

	)

	return _.flatten(transpose(_.chunk(seats, rows)))

}

export {
	buildSeatsLite,
	buildSeats,
	senateTrendReport,
}
