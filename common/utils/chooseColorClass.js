import _ from 'lodash'
import { standardizeParty } from './standardize.js'
import {
	candidatesAreEqual,
	sortByElectoralCount,
	sortByVoteCount,
} from './Candidates.js'

export default ({ candidates, precinctsReportingPct }) => {

	const NO_DATA = 'fill-none'
	const TIE = 'fill-tie'
	const PCT_THRESHOLD = 1
	let result = NO_DATA

	// First of all: do we have candidates?
	if (candidates.length) {

		// Are we dealing with candidates with electWon properties?
		const isPresidential = _.has(candidates[0], 'electWon')
		const sortingDelegate = isPresidential ?
			sortByElectoralCount : sortByVoteCount

		// Sort candidates by given sorting delegate.
		const sortedCandidates = sortingDelegate(candidates)

		// Get the first two candidates.
		const first = sortedCandidates[0] || {}
		const second = sortedCandidates[1] || {}

		// Let's deal with presidential candidates first.
		if (isPresidential) {

			// Do we have a winner?
			const winner = _.find(sortedCandidates, { winner: 'X' })

			// We have a winner.
			if (winner) {

				result = `fill-winner-${standardizeParty(winner.party)}`

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

						result = `fill-leading-${standardizeParty(first.party)}`

					}

				// We don't have enough precincts reporting.
				}

			// We don't have data.
			}

		// Next we'll deal with non-presidential candidates.
		// Do we have data? (voteCount)
		} else if (first.voteCount) {

			// We do have data.
			// Do we have enough precincts reporting?
			if (+precinctsReportingPct >= PCT_THRESHOLD) {

				// We do have enough precincts reporting.
				// Do we have a tie?
				if (candidatesAreEqual(first, second)) {

					// We have a tie.
					result = TIE

				// We do not have a tie.
				// Are the precincts at a 100%?
				} else if (+precinctsReportingPct === 100) {

					// Yes - so color it complete.
					result = `fill-complete-${standardizeParty(first.party)}`

				// No - color it leading.
				} else {

					result = `fill-leading-${standardizeParty(first.party)}`

				}

			// We don't have enough precincts reporting.
			}

		// We don't have data.
		}

	// We don't have any candidates!
	}

	return result

}
