import _ from 'lodash'
import { sortByVoteCount } from './Candidates.js'

// TODO: add 'winner' class
// TODO: handle places like Maine, where voteCount isn't the final decider
export default ({ candidates = [], sortingDelegate = sortByVoteCount }) => {

	let klass
	let party
	let partyIsMain
	let partyToReturn

	const cands = sortingDelegate(candidates)

	// are there candidates, and does the first one have votes?
	if (cands.length && cands[0].voteCount > 0) {

		// do we have more than one candidate?
		if (cands.length > 1) {

			// do we have a tie?
			if (cands[0].voteCount === cands[1].voteCount) {

				// we have a tie
				klass = 'fill-tie'

			} else {

				// we don't have a tie, we have a leading candidate
				// return candidate party color if dem or gop, otherwise return ind
				party = cands[0].party.toLowerCase()
				partyIsMain = _.includes(['dem', 'gop'], party)
				partyToReturn = partyIsMain ? party : 'ind'
				klass = `fill-${partyToReturn}`

			}

		} else {

			// we only have one candidate
			// return candidate party color if dem or gop, otherwise return ind
			party = cands[0].party.toLowerCase()
			partyIsMain = _.includes(['dem', 'gop'], party)
			partyToReturn = partyIsMain ? party : 'ind'
			klass = `fill-${partyToReturn}`

		}

	} else {

		// there are no votes
		klass = 'none'

	}

	return klass

}
