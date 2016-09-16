import _ from 'lodash'

const sortByElectoralCount = (candidates) =>
	_.orderBy(candidates, ['electWon', 'electLead'], ['desc', 'desc'])

const sortByVoteCount = (candidates) =>
	_.orderBy(candidates, ['voteCount'], ['desc'])

const sortByIDs = ({ candidates, candidateIDs }) => _(candidates)
	.map(v => ({
		...v,
		externalCandidateID:
			_.indexOf(candidateIDs, v.candidateID) > -1 ?
				_.indexOf(candidateIDs, v.candidateID) : candidates.length - 1,
	}))
	.orderBy(
		['externalCandidateID', 'electWon', 'voteCount'],
		['asc', 'desc', 'desc'])
	.value()

const totalVotes = (candidates) =>
	_.sumBy(candidates, 'voteCount')

export {
	// eslint-disable-next-line import/prefer-default-export
	sortByElectoralCount,
	sortByVoteCount,
	sortByIDs,
	totalVotes,
}
