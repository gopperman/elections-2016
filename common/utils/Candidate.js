import _ from 'lodash'
import { totalVotes } from './Candidates.js'

const fullName = (candidate) =>
	[candidate.first, candidate.last].join(' ').trim()

const percent = ({ candidates, candidateID }) => {

	const total = _.sumBy(candidates, 'voteCount')

	const { voteCount } = _.find(candidates, { candidateID })

	return total ? voteCount / total : 0

}

export {
	fullName,
	percent,
}
