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
const buildRow = ({ dem, gop, ind, undecided }) => {

	// Declare new variables so we don't mutate the incoming object.
	let demCount = dem
	let gopCount = gop
	let undecidedCount = undecided
	let indCount = ind

	const row = []
	let seatNum = 1

	while (demCount--) {
		row.push({
			seat: seatNum++,
			party: 'dem',
		})
	}
	while (indCount--) {
		row.push({
			seat: seatNum++,
			party: 'ind',
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
const buildSeats = ({ dem, gop, ind, total, rows }) => {

	let d
	let r
	let i = ind
	let u

	const seats = []
	const seatsPerRow = Math.floor(total / rows)
	let rowsCount = rows

	const demPerRow = Math.floor(dem / rows)
	let demRemainder = dem % rows

	const gopPerRow = Math.floor(gop / rows)
	let gopRemainder = gop % rows

	// We know there's going to be less than 10, and we want them all on the same row

	while (rowsCount--) {
		d = demPerRow - Math.floor( i / 2 )
		r = gopPerRow - Math.ceil( i / 2 )
		let seatsTaken = d + r + i
		console.log([d, r, i, seatsTaken])
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

		u = (seatsTaken >= seatsPerRow) ? 0 : seatsPerRow - d - r - i

		// We know there's going to be less than 10 independents, 
		// and we want them all on the same row, contrary to how we handle
		// the other two parties
		d = 9
		r = 9
		u = 0
		i = 2
		seats.push(buildRow({ dem: d, gop: r, ind: i, undecided: u }))
		i = 0
	}

	return seats
}

export {
	buildRow,
	buildSeats,
}
