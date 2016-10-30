import _ from 'lodash'
import compareStrings from './compareStrings.js'

const e = (s) => encodeURIComponent(encodeURIComponent(s))

const urlManager = {

	stringifyParams(params) {
		return _(_.map(params, (value, key) => ({ value, key })))
			.filter(v => v.value)
			.map(v => `${v.key}=${v.value}`)
			.value()
			.join('&')

	},

	base() {
		return '/elections/2016'
	},

	town(townName) {
		return `${this.base()}/MA/town/${e(townName)}`
	},

	office({ officeName, statePostal = '' }) {

		let result

		if (compareStrings(officeName, 'president')) {
			result = this.race({ officeName: 'president' })
		} else if (_.includes(['ma', 'nh'], statePostal.toLowerCase())) {
			result = `${this.base()}/${statePostal}/${e(officeName)}`
		} else {
			result = `${this.base()}/${e(officeName)}`
		}

		return result

	},

	race({ officeName, seatName, statePostal }) {

		let result

		// This function will only return urls for either president page,
		if (compareStrings(officeName, 'president')) {

			if (compareStrings(statePostal, 'ma')) {
				result = `${this.base()}/${statePostal}/${officeName}`
			} else {
				result = `${this.base()}/${officeName}`
			}

		// or a MA race.
		} else if (compareStrings(statePostal, 'ma') &&
		officeName && seatName) {

			result =
				`${this.base()}/${statePostal}/${e(officeName)}/${e(seatName)}`

		} else {

			result = null

		}

		return result

	},

}

export default urlManager
