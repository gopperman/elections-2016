import _ from 'lodash'

const fullName = (candidate) =>
	[candidate.first, candidate.last].join(' ').trim()

const percent = ({ candidates, candidateID }) => {

	const total = _.sumBy(candidates, 'voteCount')

	const { voteCount } = _.find(candidates, { candidateID })

	return voteCount / total

}

export {
	fullName,
	percent,
}
