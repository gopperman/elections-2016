import { sortByVoteCount } from './Candidates.js'

// TODO: add 'winner' class
export default ({ candidates = [], sortingDelegate = sortByVoteCount }) => {

	let klass

	const cands = sortingDelegate(candidates)

	// are there candidates, and does the first one have votes?
	if (cands.length && cands[0].voteCount > 0) {

		// do we have more than one candidate?
		if (cands.length > 1) {

			// do we have a tie?
			if (cands[0].voteCount === cands[1].voteCount) {

				// we have a tie
				klass = 'tie'

			} else {

				// we don't have a tie, we have a leading candidate
				// return candidate party color
				klass = cands[0].party.toLowerCase()

			}

		} else {

			// we only have one candidate
			// return candidate party color
			klass = cands[0].party.toLowerCase()

		}

	} else {

		// there are no votes
		klass = 'none'

	}

	return klass

}
