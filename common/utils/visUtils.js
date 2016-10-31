/** @module */

import _ from 'lodash'
import { transpose } from 'd3-array'

/* Builds a senate trend report from a list of races
 * Specifically, for displaying the balance of power on the Senate page, where
 * we don't have access to the AP API's senate trend report
 * @param {array} An array of race objects
 */
const senateTrendReport = (races) => {
	const trends = _.countBy(races.map((race) => {
		const candidates = _.get(race, 'reportingUnits[0].candidates')
		const winner = _.find(candidates, { winner: 'X' })

		/* 
		 * If there's no winner, figure out if you can at least call the race for a party
		 * If all the candidates who advanced to the runoff belong to the same party,
		 * count it for that party
		 */
		if (winner) {
			return winner.party.toLowerCase()
		} else {
			const runoffs = _.filter(candidates, { winner: 'R' })
			const winningParties = Object.keys(_.countBy(runoffs.map((candidate) => candidate.party)))

			if (1 === winningParties.length) {
				return winningParties[0].toLowerCase()
			} else {
				return null
			}
		}
	}))

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

const buildMatrixWithHoldovers = ({ total = 0, rows = 0,
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

const buildMatrix = ({ dem = 0, gop = 0, ind = 0, total = 0,
rows = 0, isRow }) => {

	const none = total - (dem + gop + ind)

	// Create an array of dem, ind, none, and gop, in that order.
	const seats = [].concat(
		_.range(dem).map(() => 'dem'),
		_.range(ind).map(() => 'ind'),
		_.range(none).map(() => 'none'),
		_.range(gop).map(() => 'gop'),
	)

	// Partition seats into chunks of size `rows`, thus creating a matrix.
	const matrix = _.chunk(seats, rows)

	// Transpose the matrix only if we want rows of seats.
	const finalMatrix = isRow ? transpose(matrix) : matrix

	// Add party and seat to every matrix element.
	const result = finalMatrix.map(row =>
		row.map((party, seat) => ({ party, seat }))
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
const buildSeatsWithHoldovers = ({ total = 0, rows = 0,
dem = { won: 0, holdovers: 0 },
ind = { won: 0, holdovers: 0 },
gop = { won: 0, holdovers: 0 } }) => {

	// Build the matrix (seats grouped by columns).
	const matrix = buildMatrixWithHoldovers({ dem, gop, ind, total, rows })

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
const buildSeats = ({ dem = 0, gop = 0, ind = 0,
total = 0, rows = 0 }) => {

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

/**
 * Builds a seating chart for balance of power charts. Returns the columns.
 * @memberof visUtils
 * @function
 * @param {number} $0.dem the number of democratic seats
 * @param {number} $0.ind the number of independent seats
 * @param {number} $0.gop the number of gop seats
 * @param {number} $0.total the total number of seats
 * @param {number} $0.rows the desired number of rows
 * @returns {Array} an array of columns of seats
 */
const buildSeatColumns = ({ dem = 0, gop = 0, ind = 0,
total = 0, rows = 0 }) =>
	buildMatrix({ dem, gop, ind, total, rows })

/**
 * Builds a seating chart for balance of power charts. Returns the rows.
 * @memberof visUtils
 * @function
 * @param {number} $0.dem the number of democratic seats
 * @param {number} $0.ind the number of independent seats
 * @param {number} $0.gop the number of gop seats
 * @param {number} $0.total the total number of seats
 * @param {number} $0.rows the desired number of rows
 * @returns {Array} an array of rows of seats
 */
const buildSeatRows = ({ dem = 0, gop = 0, ind = 0,
total = 0, rows = 0 }) =>
	buildMatrix({ dem, gop, ind, total, rows, isRow: true })

export {
	buildSeatRows,
	buildSeatColumns,
	buildSeats,
	buildSeatsWithHoldovers,
	senateTrendReport,
}
