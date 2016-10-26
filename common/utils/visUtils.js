/** @module */

import _ from 'lodash'
import { transpose } from 'd3-array'

const buildMatrix = ({ dem = 0, gop = 0, ind = 0, total = 0,
rows = 0 }) => {

	const undecided = total - (dem + gop + ind)

	// Create an array of dem, ind, undecided, and gop, in that order.
	const seats = [].concat(
		_.range(dem).map(() => 'dem'),
		_.range(ind).map(() => 'ind'),
		_.range(undecided).map(() => 'undecided'),
		_.range(gop).map(() => 'gop'),
	)

	// Partition seats into chunks of size `rows`, thus creating a matrix.
	const matrix = _.chunk(seats, rows)

	return matrix

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
const buildSeatColumns = ({ dem = 0, gop = 0, ind = 0, total = 0,
rows = 0 }) => {

	// Create the matrix.
	const matrix = buildMatrix({ dem, gop, ind, total, rows })

	// Add party and seat to every matrix element.
	const result = matrix.map(row =>
		row.map((party, i) => ({ party, seat: i + 1 }))
	)

	return result

}

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
const buildSeatRows = ({ dem = 0, gop = 0, ind = 0, total = 0,
rows = 0 }) => {

	// Create the matrix.
	const matrix = buildMatrix({ dem, gop, ind, total, rows })

	// Transpose the matrix.
	const transposedMatrix = transpose(matrix)

	// Add party and seat to every matrix element.
	const result = transposedMatrix.map(row =>
		row.map((party, i) => ({ party, seat: i + 1 }))
	)

	return result

}

export {
	buildSeatRows,
	buildSeatColumns,
}
