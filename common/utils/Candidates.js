/** @module */

/* eslint-disable max-len */

import _ from 'lodash'

/**
 * Sort candidates by electoral votes won and voteCount, in that order.
 * @memberof Candidates
 * @function
 * @param {Array} candidates an array of candidates
 * @returns {Array} a new array of candidates, sorted. Does not mutate original array.
 * @example
 * sortByElectoralCount(candidate) //=> sortedCandidates
 */
const sortByElectoralCount = (candidates) =>
	_.orderBy(candidates,
		['electWon', 'voteCount'],
		['desc', 'desc'])

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
 * Sort candidates by an external array of ordered polIDs. If a candidate doesn't have a polID, sorting defaults to vote count.
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
	totalVotes,
}
