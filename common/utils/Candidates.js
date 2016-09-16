/** @module */

import _ from 'lodash'

/**
 * Sort candidates by electoral votes won and leading, in that order.
 * @memberof Candidates
 * @function
 * @param {Array} candidates an array of candidates
 * @returns {Array} a new array of candidates, sorted. Does not mutate original array.
 * @example
 * sortByElectoralCount(candidate) //=> sortedCandidates
 */
const sortByElectoralCount = (candidates) =>
	_.orderBy(candidates, ['electWon', 'electLead'], ['desc', 'desc'])

/**
 * Sort candidates by total vote count.
 * @memberof Candidates
 * @function
 * @param {Array} candidates an array of candidates
 * @returns {Array} a new array of candidates, sorted. Does not mutate original array.
 * @example
 * sortByVoteCount(candidates) //=> sortedCandidates
 */
const sortByVoteCount = (candidates) =>
	_.orderBy(candidates, ['voteCount'], ['desc'])

/**
 * Sort candidates by an external array of candidateIDs.
 * @memberof Candidates
 * @function
 * @param {Array} $0.candidates an array of candidates
 * @param {Array} $0.candidateIDs an array of candidate IDs
 * @returns {Array} a new array of candidates, sorted. Does not mutate original array.
 * @example
 * sortByIDs({ candidates, candidateIDs }) //=> sortedCandidates
 */
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
	.map(v => _.omit(v, 'externalCandidateID'))
	.value()

/**
 * Get candidates' total vote count.
 * @memberof candidates
 * @function
 * @param {Array} candidates an array of candidates
 * @returns {number} the candidates' total vote count.
 * @example
 * totalVotes(candidates) //=> 123
 */
const totalVotes = (candidates) =>
	_.sumBy(candidates, 'voteCount')

export {
	sortByElectoralCount,
	sortByVoteCount,
	sortByIDs,
	totalVotes,
}
