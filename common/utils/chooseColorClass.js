import {
	sortByVoteCount,
	sortByElectoralCount,
} from './Candidates.js'

export default ({ candidates, isPresidential, precinctsReportingPct }) => {

	const NO_DATA = 'fill-none'
	const WINNER = 'winner'
	const TIE = 'fill-tie'
	const PCT_THRESHOLD = 1

	let result

	// First of all: do we have candidates?
	if (candidates.length) {

		// We do have candidates, and they are presidential.
		if (isPresidential) {

			// Sort candidates by electoral count then vote count.
			const sortedCandidates = sortByElectoralCount(candidates)

			// Try to find a winner.
			const first = sortedCandidates[0] || {}
			const second = sortedCandidates[1] || {}

			// Do we have a winner?
			if (first.winner === 'X') {

				// We have a winner.
				result = `${WINNER} fill-party party-${first.party}`

			} else {

				// We don't have a winner.
				// Do we have data? (electWon OR voteCount)
				if (first.electWon || first.voteCount) {

					// We do have data.
					// Do we have enough precincts reporting?
					if (+precinctsReportingPct >= PCT_THRESHOLD) {

						// We do have enough precincts reporting.
						// Do we have a tie?
						if ((first.electWon === second.electWon) &&
							(first.voteCount === second.voteCount)) {

							// We have a tie.
							result = TIE

						} else {

							// We do not have a tie.
							result = `fill-party party-${first.party}`

						}

					} else {

						// We don't have enough precincts reporting.
						result = NO_DATA

					}

				} else {

					// We don't have data.
					result = NO_DATA

				}

			}

		} else {

			// We do have candidates, and they are NOT presidential.
			// Sort candidates by vote count.
			const sortedCandidates = sortByVoteCount(candidates)

			// Try to find a winner.
			const first = sortedCandidates[0] || {}
			const second = sortedCandidates[1] || {}

			// Do we have a winner?
			if (first.winner === 'X') {

				// We have a winner.
				result = `${WINNER} fill-party party-${first.party}`

			} else {

				// We don't have a winner.
				// Do we have data? (voteCount)
				if (first.voteCount) {

					// We do have data.
					// Do we have enough precincts reporting?
					if (+precinctsReportingPct >= PCT_THRESHOLD) {

						// We do have enough precincts reporting.
						// Do we have a tie?
						if (first.voteCount === second.voteCount) {

							// We have a tie.
							result = TIE

						} else {

							// We do not have a tie.
							result = `fill-party party-${first.party}`

						}

					} else {

						// We don't have enough precincts reporting.
						result = NO_DATA

					}

				} else {

					// We don't have data.
					result = NO_DATA

				}

			}

		}

	} else {

		// We don't have any candidates!
		result = NO_DATA

	}

	return result

}
