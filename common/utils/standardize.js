import _ from 'lodash'

/**
 * Normalizes a party string.
 * @memberof standardize
 * @function
 * @param {String} a party string, e.g. 'DEM'
 * @returns {String} a normalized party string
 * @example
 * normalizeParty('DEM') //=> 'dem'
 * normalizeParty('gop') //=> 'gop'
 * normalizeParty('green') //=> 'ind'
 */
const normalizeParty = (s) => {
	let party
	if (s) {
		party = (_.includes(['dem', 'gop', 'yes', 'no'], s.toLowerCase()) ?
			s.toLowerCase() : 'ind')
	} else {
		party = s
	}
	return party

}

const toTitleCase = (str) =>
	str.replace(/\w\S*/g, txt =>
		txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())

const standardizeParty = (s) =>
	toTitleCase(s).replace('Gop', 'GOP')

const toSentenceCase = (s) =>
	[s[0].toUpperCase(), s.slice(1)].join('')

const percentForDisplay = (x, shorten) => {

	const decimalPlaces = shorten ? 0 : 1
	let result

	if (x === 1) {
		result = '100'
	} else if (x === 0) {
		result = '0'
	} else {
		result = (100 * x).toFixed(decimalPlaces).toString()
	}

	return result

}

export {
	percentForDisplay,
	toSentenceCase,
	toTitleCase,
	normalizeParty,
	standardizeParty,
}
