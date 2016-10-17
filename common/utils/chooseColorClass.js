import _ from 'lodash'
import {
	sortByVoteCount,
	sortByElectoralCount,
} from './Candidates.js'

// TODO: make sure that non-presidential candidates only look at vote
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

		}

	} else {

		// We don't have any candidates!
		return NO_DATA

	}


	// let klass
	// let party
	// let partyIsMain
	// let partyToReturn

	// const cands = sortingDelegate(candidates)

	// // are there candidates, and does the first one have votes?
	// if (cands.length && cands[0].voteCount > 0) {

	// 	// do we have more than one candidate?
	// 	if (cands.length > 1) {

	// 		// do we have a tie?
	// 		if (cands[0].voteCount === cands[1].voteCount) {

	// 			// we have a tie
	// 			klass = 'fill-tie'

	// 		} else {

	// 			// we don't have a tie, we have a leading candidate
	// 			// return candidate party color if dem or gop, otherwise return ind
	// 			party = cands[0].party.toLowerCase()
	// 			partyIsMain = _.includes(['dem', 'gop'], party)
	// 			partyToReturn = partyIsMain ? party : 'ind'
	// 			klass = `fill-${partyToReturn}`

	// 		}

	// 	} else {

	// 		// we only have one candidate
	// 		// return candidate party color if dem or gop, otherwise return ind
	// 		party = cands[0].party.toLowerCase()
	// 		partyIsMain = _.includes(['dem', 'gop'], party)
	// 		partyToReturn = partyIsMain ? party : 'ind'
	// 		klass = `fill-${partyToReturn}`

	// 	}

	// } else {

	// 	// there are no votes
	// 	klass = 'none'

	// }

	return result

}
