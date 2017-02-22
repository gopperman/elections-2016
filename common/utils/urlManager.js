// This module contains various utilities dealing with urls. Use this to
// avoid dropping magic strings like `/elections/2016` everywhere.

import _ from 'lodash'
import compareStringsNoAlpha from './compareStringsNoAlpha.js'

// Specify `domain` if you don't want relative urls (for example when
// building components for the homepage).
const urlManager = (domain = '') => ({

	// Add analytics tag if `source` is not empty.
	tag(url, source, page) {
		return `${url}${source ? `?p1=BG_election_${source}_${page}` : ''}`
	},

	// Encode ampersands to deal with names that have them (e.g.
	// '1st & Barnstable'.
	encode(s) {
		return s.replace(/&/g, '%2526')
	},

	// Decode ampersands.
	decode(s) {
		return s.replace(/%2526/g, '&')
	},

	// Convert an object of key/values into a query string.
	stringifyParams(params) {
		return _(_.map(params, (value, key) => ({ value, key })))
			.filter(v => v.value)
			.map(v => `${v.key}=${v.value}`)
			.value()
			.join('&')

	},

	// Return the app's base url.
	base(source) {
		return this.tag(`${domain}/elections/2016`, source, 'central')
	},

	// Return the town's url.
	town({ townName, source }) {
		return this.tag(
			`${this.base()}/MA/town/${this.encode(townName)}`, source, 'town')
	},

	// Return the office's url.
	office({ officeName, statePostal = '', source }) {

		let result

		// If this is the president's office,
		if (compareStringsNoAlpha(officeName, 'president')) {

			// return the president's race url.
			result = this.race({ officeName: 'President', source })

		// If we're on a MA/NH office,
		} else if (_.includes(['ma', 'nh'], statePostal.toLowerCase())) {

			// create this state's office url,
			result = `${this.base()}/${statePostal}/${this.encode(officeName)}`

			// and add analytics.
			result = this.tag(result, source, 'race')

		// Otherwise,
		} else {

			// Create an office url with no state,
			result = `${this.base()}/${this.encode(officeName)}`

			// and add analytics.
			result = this.tag(result, source, 'race')

		}

		return result

	},

	// Return the race's url.
	race({ officeName, seatName, statePostal, source }) {

		let result

		// This function will only return urls for either president page,
		if (compareStringsNoAlpha(officeName, 'president')) {

			if (compareStringsNoAlpha(statePostal, 'ma')) {
				result = `${this.base()}/${statePostal}/${officeName}`
			} else {
				result = `${this.base()}/${officeName}`
			}

			result = this.tag(result, source, 'president')

		// or a MA race.
		} else if (compareStringsNoAlpha(statePostal, 'ma') &&
		officeName && seatName) {

			result = [
				this.base(),
				statePostal,
				this.encode(officeName),
				this.encode(seatName),
			].join('/')

			result = this.tag(result, 'full', 'results')

		} else {

			result = null

		}

		return result

	},

})

export default urlManager
