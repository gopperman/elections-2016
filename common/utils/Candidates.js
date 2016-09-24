/** @module */

/* eslint-disable max-len */

import _ from 'lodash'

/**
 * Sort candidates by winner, electoral votes won and voteCount, in that order.
 * @memberof Candidates
 * @function
 * @param {Array} candidates an array of candidates
 * @returns {Array} a new array of candidates, sorted. Does not mutate original array.
 * @example
 * sortByElectoralCount(candidate) //=> sortedCandidates
 */
const sortByElectoralCount = (candidates) =>
	_.orderBy(candidates,
		['winner', 'electWon', 'voteCount'],
		['asc', 'desc', 'desc'])

/**
 * Sort candidates by winner and total vote count.
 * @memberof Candidates
 * @function
 * @param {Array} candidates an array of candidates
 * @returns {Array} a new array of candidates, sorted. Does not mutate original array.
 * @example
 * sortByVoteCount(candidates) //=> sortedCandidates
 */
const sortByVoteCount = (candidates) =>
	_.orderBy(candidates, ['winner', 'voteCount'], ['asc', 'desc'])

/**
 * Sort candidates by an external array of polIDs.
 * @memberof Candidates
 * @function
 * @param {Array} $0.candidates an array of candidates
 * @param {Array} $0.polIDs an array of candidate politician IDs, which are unique across all states and races (only for politicians who have run in a national race).
 * @returns {Array} a new array of candidates, sorted. Does not mutate original array.
 * @example
 * sortByPolIDs({ candidates, polIDs }) //=> sortedCandidates
 */
const sortByPolIDs = ({ candidates, polIDs }) => _(candidates)
	.map((v, i) => ({
		...v,
		index: i,
		polIDIndex: _.indexOf(polIDs, v.polID) > -1 ?
			_.indexOf(polIDs, v.polID) : candidates.length,
	}))
	.orderBy(['polIDIndex', 'index'])
	.map(v => _.omit(v, ['polIDIndex', 'index']))
	.value()

/**
 * Sort candidates by an external array of candidateIDs.
 * @memberof Candidates
 * @function
 * @param {Array} $0.candidates an array of candidates
 * @param {Array} $0.candidateIDs an array of candidate IDs, which are unique for this candidate in a state's race.
 * @returns {Array} a new array of candidates, sorted. Does not mutate original array.
 * @example
 * sortByCandidateIDs({ candidates, candidateIds }) //=> sortedCandidates
 */
const sortByCandidateIDs = ({ candidates, candidateIDs }) => _(candidates)
	.map((v, i) => ({
		...v,
		index: i,
		candidateIDIndex: _.indexOf(candidateIDs, v.candidateID) > -1 ?
			_.indexOf(candidateIDs, v.candidateID) : candidates.length,
	}))
	.orderBy(['candidateIDIndex', 'index'])
	.map(v => _.omit(v, ['candidateIDIndex', 'index']))
	.value()

/**
 * Get candidates' total vote count.
 * @memberof Candidates
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
	sortByPolIDs,
	sortByCandidateIDs,
	totalVotes,
}
