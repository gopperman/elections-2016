import { candidatesAreEqual } from './Candidates.js'

const normalizeParty = (party) =>
	_.includes(['dem', 'gop'], party.toLowerCase()) ?
		party.toLowerCase() :
		'ind'

export default ({ candidates, precinctsReportingPct, sortingDelegate }) => {

	const NO_DATA = 'fill-none'
	const WINNER = 'fill-is-winner'
	const TIE = 'fill-tie'
	const PCT_THRESHOLD = 1

	let result = NO_DATA

	// First of all: do we have candidates?
	if (candidates.length) {

		// Sort candidates by given sorting delegate.
		const sortedCandidates = sortingDelegate(candidates)

		// Try to find a winner.
		const first = sortedCandidates[0] || {}
		const second = sortedCandidates[1] || {}

		// Do we have a winner?
		if (first.winner === 'X') {

			// We have a winner.
			result = `${WINNER} fill-${normalizeParty(first.party)}`

		// We don't have a winner.
		// Do we have data? (electWon OR voteCount)
		} else if (first.electWon || first.voteCount) {

			// We do have data.
			// Do we have enough precincts reporting?
			if (+precinctsReportingPct >= PCT_THRESHOLD) {

				// We do have enough precincts reporting.
				// Do we have a tie?
				if (candidatesAreEqual(first, second)) {

					// We have a tie.
					result = TIE

				// We do not have a tie.
				} else {

					result = `fill-${normalizeParty(first.party)}`

				}

			// We don't have enough precincts reporting.
			}

		// We don't have data.
		}














		// // We do have candidates, and they are presidential.
		// if (isPresidential) {

		// 	// Sort candidates by electoral count then vote count.
		// 	const sortedCandidates = sortingDelegate(candidates)

		// 	// Try to find a winner.
		// 	const first = sortedCandidates[0] || {}
		// 	const second = sortedCandidates[1] || {}

		// 	// Do we have a winner?
		// 	if (first.winner === 'X') {

		// 		// We have a winner.
		// 		result = `${WINNER} fill-party party-${first.party}`

		// 	// We don't have a winner.
		// 	// Do we have data? (electWon OR voteCount)
		// 	} else if (first.electWon || first.voteCount) {

		// 		// We do have data.
		// 		// Do we have enough precincts reporting?
		// 		if (+precinctsReportingPct >= PCT_THRESHOLD) {

		// 			// We do have enough precincts reporting.
		// 			// Do we have a tie?
		// 			if ((first.electWon === second.electWon) &&
		// 				(first.voteCount === second.voteCount)) {

		// 				// We have a tie.
		// 				result = TIE

		// 			// We do not have a tie.
		// 			} else {

		// 				result = `fill-party party-${first.party}`

		// 			}

		// 		// We don't have enough precincts reporting.
		// 		}

		// 	// We don't have data.
		// 	}

		// // We do have candidates, and they are NOT presidential.
		// } else {

		// 	// Sort candidates by vote count.
		// 	const sortedCandidates = sortingDelegate(candidates)

		// 	// Try to find a winner.
		// 	const first = sortedCandidates[0] || {}
		// 	const second = sortedCandidates[1] || {}

		// 	// Do we have a winner?
		// 	if (first.winner === 'X') {

		// 		// We have a winner.
		// 		result = `${WINNER} fill-party party-${first.party}`

		// 	// We don't have a winner.
		// 	// Do we have data? (voteCount)
		// 	} else if (first.voteCount) {

		// 		// We do have data.
		// 		// Do we have enough precincts reporting?
		// 		if (+precinctsReportingPct >= PCT_THRESHOLD) {

		// 			// We do have enough precincts reporting.
		// 			// Do we have a tie?
		// 			if (first.voteCount === second.voteCount) {

		// 				// We have a tie.
		// 				result = TIE

		// 			// We do not have a tie.
		// 			} else {

		// 				result = `fill-party party-${first.party}`

		// 			}

		// 		// We don't have enough precincts reporting.
		// 		}

		// 	// We don't have data.
		// 	}

		// }

	// We don't have any candidates!
	}

	return result

}
