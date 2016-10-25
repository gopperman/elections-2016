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
	let u

	const seats = []
	const seatsPerRow = Math.floor(total / rows)
	let rowsCount = rows

	// Our first row is unique in that we want all of the independents centered in the same row,
	// contrary to how we handle the other two parties
	// The rest of the slots will be filled with Democrats and Republicans
	// We'll handle this special case first
	if ( rowsCount--) {
		d = Math.floor(seatsPerRow / 2) - Math.floor( ind / 2)
		r = Math.ceil(seatsPerRow / 2) - Math.ceil( ind / 2)
		seats.push(buildRow({ dem: d, gop: r, ind: ind, undecided: 0}))
	}

	// Calculate how many democrats and republicans per row based on what's left over
	const demPerRow = Math.floor((dem - d)/ rowsCount)
	let demRemainder = (dem - d) % rows

	const gopPerRow = Math.floor((gop - r) / rowsCount)
	let gopRemainder = (gop - r) % rows

	while (rowsCount--) {
		d = demPerRow
		r = gopPerRow
		let seatsTaken = d + r
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

		seats.push(buildRow({ dem: d, gop: r, ind: 0, undecided: u }))
	}

	return seats
}

export {
	buildRow,
	buildSeats,
}
