import _ from 'lodash'

const Candidates = {

	sort: (candidates) =>
		_.orderBy(candidates, ['voteCount'], ['desc']),

}

export default Candidates
