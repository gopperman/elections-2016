/** @module */

import _ from 'lodash'

/**
 * Get candidate's full name (first and last).
 * @memberof Candidate
 * @function
 * @param {Object} candidate a candidate
 * @returns {String} a candidate's full name
 * @example
 * fullName(candidate) //=> 'First Last'
 */
const fullName = (candidate) =>
	[candidate.first, candidate.last].join(' ').trim()

/**
 * Get candidate's vote percent.
 * @memberof Candidate
 * @function
 * @param {Array} $0.candidateID id of the candidate we're interested in
 * @param {Array} $0.candidates an array of candidates to which our candidate belongs
 * @returns {number} a candidate's vote percent
 * @example
 * percent({ candidateID, candidates }) //=> 0.5
 */
const percent = ({ candidateID, candidates }) => {

	const total = _.sumBy(candidates, 'voteCount')

	const { voteCount } = _.find(candidates, { candidateID }) || {}

	return total ? voteCount / total : 0

}

export {
	fullName,
	percent,
}
