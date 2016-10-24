/** @module */

/**
 * Build a row of `balance of power` seats.
 * @memberof visUtils
 * @function
 * @param {number} $0.dem the number of democratic seats
 * @param {number} $0.gop the number of gop seats
 * @param {number} $0.undecided the number of undecided seats
 * @returns {Array} a row of seats
 * @example
 * buildRow({ dem: 1, gop: 1, undecided: 0 }) //=> [{ party: 'dem'...
 */
const buildRow = ({ dem, gop, undecided }) => {

	// Declare new variables so we don't mutate the incoming object.
	let demCount = dem
	let gopCount = gop
	let undecidedCount = undecided

	const row = []
	let seatNum = 1

	while (demCount--) {
		row.push({
			seat: seatNum++,
			party: 'dem',
		})
	}
	while (undecidedCount--) {
		row.push({
			seat: seatNum++,
			party: 'none',
		})
	}
	while (gopCount--) {
		row.push({
			seat: seatNum++,
			party: 'gop',
		})
	}

	return row
}

// Builds a seating chart for the Senate balance of power visualization
const buildSeats = ({ dem, gop, total, rows }) => {

	let d
	let r
	let u
	const seats = []
	const seatsPerRow = Math.floor(total / rows)
	let rowsCount = rows

	const demPerRow = Math.floor(dem / rows)
	let demRemainder = dem % rows

	const gopPerRow = Math.floor(gop / rows)
	let gopRemainder = gop % rows

	while (rowsCount--) {
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
