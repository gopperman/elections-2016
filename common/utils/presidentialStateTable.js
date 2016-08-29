import _ from 'lodash'

const getTopCandidate = ({ Cand }) =>
	_(Cand)
	.map(v => ({
		...v,
		PopVote: +v.PopVote,
	}))
	.orderBy(['Winner', 'PopVote'], ['asc', 'desc'])
	.head()

// TODO: remove this ignore
export {
	// eslint-disable-next-line import/prefer-default-export
	getTopCandidate,
}
