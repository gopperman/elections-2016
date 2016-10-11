/** @module */

import * as d3 from 'd3'

/**
 * Build a row of `balance of power` seats.
 * @memberof visUtils
 * @function
 * @param {Array} $0.dem the number of democratic seats
 * @param {Array} $0.gop the number of gop seats
 * @param {Array} $0.undecided the number of undecided seats
 * @returns {Array} a row of seats
 * @example
 * buildRow({ dem: 1, gop: 1, undecided: 0 }) //=> [{ party: 'dem'...
 */
const buildRow = ({ dem, gop, undecided }) =>
	d3.merge([
		d3.range(dem).map(() => ({ party: 'dem' })),
		d3.range(undecided).map(() => ({ party: 'undecided' })),
		d3.range(gop).map(() => ({ party: 'gop' })),
	]).map((v, i) => ({
		...v,
		seat: i + 1,
	}))

// Builds a seating chart for the Senate balance of power visualization
const buildSeats = ({ dem, gop, total, rows }) => {

	let d
	let r
	let u
	const seats = []
	const seatsPerRow = Math.floor(total / rows)
	let rowsLength = rows

	const demPerRow = Math.floor(dem / rows)
	let demRemainder = dem % rows

	const gopPerRow = Math.floor(gop / rows)
	let gopRemainder = gop % rows

	while (rowsLength--) {
		let seatsTaken = demPerRow + gopPerRow
		d = demPerRow
		r = gopPerRow

		if (demRemainder > 0 && seatsTaken < seatsPerRow) {
			d++
			demRemainder--
			seatsTaken++
		}
		if (gopRemainder > 0 && seatsTaken < seatsPerRow) {
			r++
			gopRemainder--
			seatsTaken++
		}

		u = (seatsTaken >= seatsPerRow) ? 0 : seatsPerRow - d - r

		seats.push(buildRow({ dem: d, gop: r, undecided: u }))
	}

	return seats
}

export {
	buildRow,
	buildSeats,
}
