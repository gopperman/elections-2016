import * as d3 from 'd3'

// Builds an array of objects for a single row of the
// Senate balance of power visualization
const buildRow = (dem, gop, undecided ) => {

	const demArray = d3.range(0, dem) // [0, 1, 2, 3, 4]

	let row = [];
	let seatNum = 1;
	while (dem--) {
		row.push({
			seat: seatNum++,
			party: 'dem',
		})
	}
	while (undecided--) {
		row.push({
			seat: seatNum++,
			party: 'undecided',
		})
	}
	while (gop--) {
		row.push({
			seat: seatNum++,
			party: 'gop',
		})
	}
	return row
}

// Builds a seating chart for the Senate balance of power visualization
const buildSeats = (dem, gop, total, rows) => {

	let d, r, u, seats = []
	const seatsPerRow = Math.floor(total / rows)

	const demPerRow = Math.floor(dem / rows)
	let demRemainder = dem % rows

	const gopPerRow = Math.floor(gop / rows)
	let gopRemainder = gop % rows

	while(rows--) {
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

		seats.push(buildRow(d,r,u))
	}

	return seats
}

export {
	buildRow,
	buildSeats,
}
