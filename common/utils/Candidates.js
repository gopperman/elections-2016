/** @module */

/* eslint-disable max-len */

import _ from 'lodash'

/**
 * Determine candidate equality by winner, electWon, and voteCount.
 * @memberof Candidates
 * @function
 * @param {Object} left a candidate
 * @param {Object} right a candidate
 * @returns {Boolean} whether candidates are equal
 * @example
 * candidatesAreEqual(left, right) //=> false
 */
const candidatesAreEqual = (left, right) =>
	((left.winner === right.winner) &&
		(left.voteCount === right.voteCount) &&
		(left.electWon === right.electWon))

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
	_.orderBy(candidates, ['electWon', 'voteCount'], ['desc', 'desc'])

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
	.map(v => _.omit(v, ['index']))
	.value()

/**
 * Sort candidates in the order dictated by product
 * @memberof Candidates
 * @function
 * @param {Array} candidates an array of candidates
 * @returns {Array} a new array of candidates, sorted. Does not mutate original array.
 * @example
 * sortByProductRequirements(candidate) //=> sortedCandidates
 */
const sortByProductRequirements = (candidates) => {
	const polIDs = [
		'1746', // Clinton
		'8639', // Trump
		'31708', // Johnson
		'65775', // McMullin
		'895', // Stein
	]
	const sortedCandidates = sortByPolIDs({
		candidates,
		polIDs,
	})

	return _.filter(sortedCandidates, (o) => (_.indexOf(polIDs, o.polID) !== -1))
}

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
	sortByProductRequirements,
	totalVotes,
	candidatesAreEqual,
}
