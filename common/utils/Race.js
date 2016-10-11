/** @module */

/**
 * Get race name.
 * @memberof Race
 * @function
 * @param {Object} race a race
 * @returns {String} a race's name
 * @example
 * getName(race) //=> 'NH Governor'
 */
const getName = (race) =>
	[race.statePostal, race.officeName].join(' ')

export {
	getName,
}
