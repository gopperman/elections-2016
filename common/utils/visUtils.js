// Builds an array of objects for a single row of the
// Senate balance of power visualization
const buildRow = (dem, gop, undecided ) => {
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
		d = demPerRow + (( --demRemainder >= 0 ) ? 1 : 0)
		r = gopPerRow + (( --gopRemainder >= 0) ? 1 : 0)
		u = seatsPerRow - d - r 
		if ( u < 0 ) {
			u = 0
		}
		seats.push(buildRow(d,r,u))
	}

	return seats
}

export {
	buildRow,
	buildSeats,
}