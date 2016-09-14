import _ from 'lodash'

const sort = (candidates) =>
_.orderBy(candidates, ['voteCount'], ['desc'])

export {
	// eslint-disable-next-line import/prefer-default-export
	sort,
}
