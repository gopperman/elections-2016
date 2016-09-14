import _ from 'lodash'

const sort = (candidates) =>
	_.orderBy(candidates, ['voteCount'], ['desc'])

const sortByIDs = ({ candidates, candidateIDs }) =>
	_.sortBy(candidates, v => _.indexOf(candidateIDs, v.candidateID))

export {
	// eslint-disable-next-line import/prefer-default-export
	sort,
	sortByIDs,
}
