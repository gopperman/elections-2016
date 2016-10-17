import _ from 'lodash'
import { candidatesAreEqual } from './Candidates.js'

const normalizeParty = (party = '') =>
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

		// Get the first two candidates.
		const first = sortedCandidates[0] || {}
		const second = sortedCandidates[1] || {}

		// Try to find a winner, only if we are dealing with candidates with
		// electWon properties.
		const winner = _(sortedCandidates)
			.filter(v => _.has(v, 'electWon'))
			.find({ winner: 'X' })

		// Do we have a winner?
		if (winner) {

			// We have a winner.
			result = `${WINNER} fill-${normalizeParty(winner.party)}`

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

	// We don't have any candidates!
	}

	return result

}
