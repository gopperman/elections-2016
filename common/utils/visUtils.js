/** @module */

import _ from 'lodash'
import { transpose } from 'd3-array'

/**
 * Build a row of `balance of power` seats.
 * @memberof visUtils
 * @function
 * @param {number} $0.dem the number of democratic seats
 * @param {number} $0.ind the number of independent seats
 * @param {number} $0.undecided the number of undecided seats
 * @param {number} $0.gop the number of gop seats
 * @returns {Array} a row of seats
 * @example
 * buildRow({ dem: 1, gop: 1, ind: 1, undecided: 0 }) //=> [{ party: 'dem'
 */
const buildRow = ({ dem, ind, undecided, gop }) => {

	// Create a new array, and then concatenate onto it
	const result = [].concat(
		// an array of { party: 'dem' } objects, of length `dem`,
		_.range(dem).map(() => ({ party: 'dem' })),
		// and repeat for ind,
		_.range(ind).map(() => ({ party: 'ind' })),
		// undecided,
		_.range(undecided).map(() => ({ party: 'undecided' })),
		// and gop.
		_.range(gop).map(() => ({ party: 'gop' })),
	// Next, iterate over the entire array,
	).map((v, i) => ({
		// return each item's contents,
		...v,
		// and a new one, `seat`, set to the array's index + 1.
		seat: i + 1,
	}))

	return result

}

// Builds a seating chart for the Senate balance of power visualization
const buildSeatRows = ({ dem = 0, gop = 0, ind = 0, total = 0,
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

	// Transpose matrix.
	const transposedMatrix = transpose(matrix)

	// Add party and seat to every matrix element.
	const result = transposedMatrix.map(row =>
		row.map((party, i) => ({ party, seat: i + 1 }))
	)

	return result

}

export {
	buildRow,
	buildSeatRows,
}
